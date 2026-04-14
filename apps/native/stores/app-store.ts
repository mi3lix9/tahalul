import { create } from 'zustand';
import type { UserProfile, ActionLog, CityTile, ChallengeProgress, BadgeUnlock, RewardRedemption, ActionType } from '@/types/entities';
import type { VerifiedActionInput, ActionResult, BadgeCheckStats } from '@/types/domain';
import { applyVerifiedAction } from '@/lib/domain/apply-verified-action';
import { initEmptyGrid } from '@/lib/domain/city';

interface AppState {
  user: UserProfile;
  actions: ActionLog[];
  cityTiles: CityTile[];
  challenges: ChallengeProgress[];
  badges: BadgeUnlock[];
  redemptions: RewardRedemption[];
  treesPlanted: number;
  setUser: (user: UserProfile) => void;
  logAction: (input: VerifiedActionInput) => ActionResult;
  redeemReward: (rewardId: string, cost: number) => { code: string } | null;
  unlockBadge: (badgeId: string) => void;
  updateChallengeProgress: (challengeDefId: string, increment: number) => void;
  resetDailyChallenges: (newChallenges: ChallengeProgress[]) => void;
  hydrate: (data: Partial<AppState>) => void;
}

function createDefaultUser(): UserProfile {
  return {
    id: Date.now().toString(36) + Math.random().toString(36).substring(2, 9),
    name: '',
    level: 1,
    xp: 0,
    ecoPoints: 0,
    streak: 0,
    lastActionDate: null,
    streakFreezes: 1,
    createdAt: new Date().toISOString(),
  };
}

function buildBadgeStats(state: AppState): BadgeCheckStats {
  const totalByType: Record<ActionType, number> = {
    recycle_plastic: 0,
    recycle_metal: 0,
    recycle_paper: 0,
    plastic_free_day: 0,
    walk: 0,
    checkin: 0,
  };

  for (const a of state.actions) {
    totalByType[a.type] = (totalByType[a.type] ?? 0) + 1;
  }

  const locationIds = new Set(state.actions.filter((a) => a.locationId).map((a) => a.locationId));

  return {
    totalActions: state.actions.length,
    totalByType,
    streak: state.user.streak,
    maxStreak: state.user.streak,
    level: state.user.level,
    cityTilesBuilt: state.cityTiles.filter((t) => t.buildingType !== 'empty').length,
    challengesCompleted: state.challenges.filter((c) => c.status === 'completed').length,
    totalCo2SavedKg: state.actions.reduce((sum, a) => sum + a.co2SavedKg, 0),
    locationsVisited: locationIds.size,
    storyChaptersRead: 0,
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  user: createDefaultUser(),
  actions: [],
  cityTiles: initEmptyGrid(),
  challenges: [],
  badges: [],
  redemptions: [],
  treesPlanted: 0,

  setUser: (user) => set({ user }),

  logAction: (input) => {
    const state = get();
    const currentDate = new Date().toISOString();
    const builtCount = state.cityTiles.filter((t) => t.buildingType !== 'empty').length;
    const stats = buildBadgeStats(state);
    const unlockedIds = state.badges.map((b) => b.badgeId);

    const result = applyVerifiedAction(state.user, input, currentDate, builtCount, stats, unlockedIds);

    const newAction: ActionLog = {
      id: result.actionId,
      type: input.type,
      verificationMethod: input.verificationMethod,
      photoUri: input.photoUri,
      qrCode: input.qrCode,
      locationId: input.locationId,
      pointsAwarded: result.pointsAwarded,
      co2SavedKg: result.co2SavedKg,
      createdAt: currentDate,
    };

    const newTiles = [...state.cityTiles];
    if (result.newBuilding) {
      const idx = newTiles.findIndex((t) => t.x === result.newBuilding!.x && t.y === result.newBuilding!.y);
      if (idx >= 0) {
        newTiles[idx] = {
          ...newTiles[idx]!,
          buildingType: result.newBuilding.type,
          unlockedByActionId: result.actionId,
          unlockedAt: currentDate,
        };
      }
    }

    const newBadges = [...state.badges];
    for (const badgeId of result.unlockedBadges) {
      newBadges.push({ id: Date.now().toString(36) + Math.random().toString(36).substring(2, 5), badgeId, unlockedAt: currentDate });
    }

    set({
      user: {
        ...state.user,
        level: result.newLevel,
        xp: result.newXp,
        ecoPoints: result.newEcoPoints,
        streak: result.newStreak,
        lastActionDate: currentDate,
      },
      actions: [...state.actions, newAction],
      cityTiles: newTiles,
      badges: newBadges,
    });

    return result;
  },

  redeemReward: (rewardId, cost) => {
    const state = get();
    if (state.user.ecoPoints < cost) return null;

    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    const redemption: RewardRedemption = {
      id: Date.now().toString(36),
      rewardId,
      code,
      pointsSpent: cost,
      redeemedAt: new Date().toISOString(),
    };

    set({
      user: { ...state.user, ecoPoints: state.user.ecoPoints - cost },
      redemptions: [...state.redemptions, redemption],
    });

    return { code };
  },

  unlockBadge: (badgeId) => {
    const state = get();
    if (state.badges.some((b) => b.badgeId === badgeId)) return;
    set({
      badges: [...state.badges, { id: Date.now().toString(36), badgeId, unlockedAt: new Date().toISOString() }],
    });
  },

  updateChallengeProgress: (challengeDefId, increment) => {
    set((state) => ({
      challenges: state.challenges.map((c) =>
        c.challengeDefId === challengeDefId && c.status === 'active'
          ? { ...c, progress: c.progress + increment, status: c.progress + increment >= c.progress ? c.status : c.status }
          : c,
      ),
    }));
  },

  resetDailyChallenges: (newChallenges) => {
    set((state) => ({
      challenges: [
        ...state.challenges.filter((c) => c.scope !== 'daily' || c.status === 'completed'),
        ...newChallenges,
      ],
    }));
  },

  hydrate: (data) => set(data),
}));
