import { create } from 'zustand';
import type { UserProfile, ActionLog, CityTile, ChallengeProgress, BadgeUnlock, RewardRedemption, ActionType } from '@/types/entities';
import type { VerifiedActionInput, ActionResult, BadgeCheckStats } from '@/types/domain';
import { DAILY_CHALLENGES, GROUP_CHALLENGES, WEEKLY_CHALLENGES } from '@/features/challenges/data/challenge-definitions';
import { insertAction } from '@/lib/db/repositories/actions-repository';
import { insertBadgeUnlock } from '@/lib/db/repositories/badges-repository';
import { updateCityTile } from '@/lib/db/repositories/city-repository';
import { upsertChallenge } from '@/lib/db/repositories/challenges-repository';
import { insertRedemption } from '@/lib/db/repositories/rewards-repository';
import { upsertUserProfile } from '@/lib/db/repositories/user-repository';
import { applyVerifiedAction } from '@/lib/domain/apply-verified-action';
import { getCityStage, initEmptyGrid } from '@/lib/domain/city';

interface AppState {
  user: UserProfile;
  actions: ActionLog[];
  cityTiles: CityTile[];
  challenges: ChallengeProgress[];
  badges: BadgeUnlock[];
  redemptions: RewardRedemption[];
  setUser: (user: UserProfile) => void;
  logAction: (input: VerifiedActionInput) => ActionResult;
  redeemReward: (rewardId: string, cost: number) => { code: string } | null;
  unlockBadge: (badgeId: string) => void;
  updateChallengeProgress: (challengeDefId: string, increment: number) => void;
  resetDailyChallenges: (newChallenges: ChallengeProgress[]) => void;
  hydrate: (data: Partial<AppState>) => void;
}

const ALL_CHALLENGE_DEFS = [...DAILY_CHALLENGES, ...WEEKLY_CHALLENGES, ...GROUP_CHALLENGES];

function getGoalForChallenge(defId: string): number {
  return ALL_CHALLENGE_DEFS.find((c) => c.id === defId)?.goal ?? Infinity;
}

function persistSafely(operation: Promise<void>) {
  void operation.catch((error) => {
    console.error('Persistence error', error);
  });
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
  const currentStage = getCityStage(state.user.ecoPoints);
  const stageOrder = ['wasteland', 'recovering', 'neutral', 'green', 'utopia'];
  const storyChaptersRead = stageOrder.indexOf(currentStage) + 1;

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
    storyChaptersRead,
  };
}

export const useAppStore = create<AppState>((set, get) => ({
  user: createDefaultUser(),
  actions: [],
  cityTiles: initEmptyGrid(),
  challenges: [],
  badges: [],
  redemptions: [],

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

    const updatedUser: UserProfile = {
        ...state.user,
        level: result.newLevel,
        xp: result.newXp,
        ecoPoints: result.newEcoPoints,
        streak: result.newStreak,
        lastActionDate: currentDate,
        streakFreezes: result.remainingFreezes,
      };

    set({
      user: updatedUser,
      actions: [...state.actions, newAction],
      cityTiles: newTiles,
      badges: newBadges,
    });

    persistSafely(insertAction(newAction));
    persistSafely(upsertUserProfile(updatedUser));
    if (result.newBuilding) {
      const tile = newTiles.find((t) => t.x === result.newBuilding!.x && t.y === result.newBuilding!.y);
      if (tile) {
        persistSafely(updateCityTile(tile));
      }
    }
    for (const badge of newBadges.filter((badge) => result.unlockedBadges.includes(badge.badgeId))) {
      persistSafely(insertBadgeUnlock(badge));
    }

    const updatedState = get();
    for (const challenge of updatedState.challenges) {
      if (challenge.status !== 'active') continue;
      const def = ALL_CHALLENGE_DEFS.find((d) => d.id === challenge.challengeDefId);
      if (def && (!def.actionType || def.actionType === input.type)) {
        get().updateChallengeProgress(challenge.challengeDefId, 1);
      }
    }

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

    const updatedUser = { ...state.user, ecoPoints: state.user.ecoPoints - cost };

    set({
      user: updatedUser,
      redemptions: [...state.redemptions, redemption],
    });

    persistSafely(insertRedemption(redemption));
    persistSafely(upsertUserProfile(updatedUser));

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
    let updatedChallenge: ChallengeProgress | null = null;
    set((state) => ({
      challenges: state.challenges.map((c) => {
        if (c.challengeDefId !== challengeDefId || c.status !== 'active') return c;
        const newProgress = c.progress + increment;
        updatedChallenge = {
          ...c,
          progress: newProgress,
          status: newProgress >= getGoalForChallenge(c.challengeDefId) ? 'completed' as const : 'active' as const,
        };
        return updatedChallenge;
      }),
    }));

    if (updatedChallenge) {
      persistSafely(upsertChallenge(updatedChallenge));
    }
  },

  resetDailyChallenges: (newChallenges) => {
    const nextChallenges = [
      ...get().challenges.filter((c) => c.scope !== 'daily' || c.status === 'completed'),
      ...newChallenges,
    ];
    set({ challenges: nextChallenges });
    for (const challenge of newChallenges) {
      persistSafely(upsertChallenge(challenge));
    }
  },

  hydrate: (data) => set(data),
}));
