import type { UserProfile } from '@/types/entities';
import type { VerifiedActionInput, ActionResult, BadgeCheckStats } from '@/types/domain';
import { getActionDef } from './points';
import { computeLevel } from './levels';
import { computeStreak } from './streaks';
import { getNextBuildSlot, getCityStage } from './city';
import { checkBadgeUnlocks } from './badges';

export function applyVerifiedAction(
  user: UserProfile,
  input: VerifiedActionInput,
  currentDate: string,
  builtTileCount: number,
  badgeStats: BadgeCheckStats,
  unlockedBadgeIds: string[],
): ActionResult {
  const def = getActionDef(input.type);
  const actionId = generateId();

  const newEcoPoints = user.ecoPoints + def.points;
  const { level: newLevel, xp: newXp } = computeLevel(user.level, user.xp, def.xp);

  const streakResult = computeStreak(user.streak, user.lastActionDate, currentDate, user.streakFreezes);

  const newBuilding = getNextBuildSlot(builtTileCount);
  const previousStage = getCityStage(user.ecoPoints);
  const nextStage = getCityStage(newEcoPoints);
  const newCityStage = nextStage !== previousStage ? nextStage : null;

  const updatedStats: BadgeCheckStats = {
    ...badgeStats,
    totalActions: badgeStats.totalActions + 1,
    totalByType: {
      ...badgeStats.totalByType,
      [input.type]: (badgeStats.totalByType[input.type] ?? 0) + 1,
    },
    streak: streakResult.newStreak,
    maxStreak: Math.max(badgeStats.maxStreak ?? 0, streakResult.newStreak),
    level: newLevel,
    cityTilesBuilt: builtTileCount + (newBuilding ? 1 : 0),
    totalCo2SavedKg: badgeStats.totalCo2SavedKg + def.co2SavedKg,
  };
  const unlockedBadges = checkBadgeUnlocks(updatedStats, unlockedBadgeIds);

  return {
    actionId,
    pointsAwarded: def.points,
    xpAwarded: def.xp,
    co2SavedKg: def.co2SavedKg,
    newLevel,
    newXp,
    newEcoPoints,
    newStreak: streakResult.newStreak,
    streakContinued: streakResult.continued,
    streakFreezeUsed: streakResult.freezeUsed,
    remainingFreezes: streakResult.remainingFreezes,
    newBuilding,
    newCityStage,
    unlockedBadges,
  };
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
