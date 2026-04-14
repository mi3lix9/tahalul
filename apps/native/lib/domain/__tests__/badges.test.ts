import { describe, expect, it } from 'vitest';
import type { BadgeCheckStats } from '@/types/domain';
import { checkBadgeUnlocks } from '@/lib/domain/badges';

const baseStats: BadgeCheckStats = {
  totalActions: 0,
  totalByType: {
    recycle_plastic: 0,
    recycle_metal: 0,
    recycle_paper: 0,
    plastic_free_day: 0,
    walk: 0,
    checkin: 0,
  },
  streak: 0,
  maxStreak: 0,
  level: 1,
  cityTilesBuilt: 0,
  challengesCompleted: 0,
  totalCo2SavedKg: 0,
  locationsVisited: 0,
  storyChaptersRead: 0,
};

describe('badges', () => {
  it('unlocks first step for first action', () => {
    expect(checkBadgeUnlocks({ ...baseStats, totalActions: 1 }, [])).toContain('first_step');
  });

  it('unlocks multiple qualifying badges', () => {
    const unlocked = checkBadgeUnlocks(
      {
        ...baseStats,
        totalActions: 50,
        totalByType: { ...baseStats.totalByType, recycle_plastic: 20, recycle_metal: 20, recycle_paper: 10 },
        streak: 30,
        cityTilesBuilt: 15,
        challengesCompleted: 10,
        totalCo2SavedKg: 10,
        locationsVisited: 3,
        storyChaptersRead: 5,
      },
      [],
    );

    expect(unlocked).toEqual(expect.arrayContaining(['eco_hero', 'plastic_warrior', 'city_builder', 'story_reader']));
  });

  it('does not unlock already unlocked badges again', () => {
    expect(checkBadgeUnlocks({ ...baseStats, totalActions: 1 }, ['first_step'])).not.toContain('first_step');
  });

  it('returns empty array when no badge conditions match', () => {
    expect(checkBadgeUnlocks(baseStats, [])).toEqual([]);
  });
});
