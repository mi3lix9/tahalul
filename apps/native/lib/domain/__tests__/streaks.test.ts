import { describe, expect, it } from 'vitest';
import { computeStreak } from '@/lib/domain/streaks';

describe('streaks', () => {
  it('starts streak on first action', () => {
    expect(computeStreak(0, null, '2026-04-14T10:00:00.000Z', 1)).toEqual({
      newStreak: 1,
      continued: false,
      freezeUsed: false,
      remainingFreezes: 1,
    });
  });

  it('keeps streak on same day', () => {
    expect(computeStreak(4, '2026-04-14T08:00:00.000Z', '2026-04-14T10:00:00.000Z', 1)).toEqual({
      newStreak: 4,
      continued: true,
      freezeUsed: false,
      remainingFreezes: 1,
    });
  });

  it('increments streak on consecutive day', () => {
    expect(computeStreak(4, '2026-04-13T08:00:00.000Z', '2026-04-14T10:00:00.000Z', 1)).toEqual({
      newStreak: 5,
      continued: true,
      freezeUsed: false,
      remainingFreezes: 1,
    });
  });

  it('uses freeze for one missed day', () => {
    expect(computeStreak(4, '2026-04-12T08:00:00.000Z', '2026-04-14T10:00:00.000Z', 1)).toEqual({
      newStreak: 5,
      continued: true,
      freezeUsed: true,
      remainingFreezes: 0,
    });
  });

  it('resets streak when gap exceeds allowance', () => {
    expect(computeStreak(4, '2026-04-10T08:00:00.000Z', '2026-04-14T10:00:00.000Z', 1)).toEqual({
      newStreak: 1,
      continued: false,
      freezeUsed: false,
      remainingFreezes: 1,
    });
  });
});
