import { describe, expect, it } from 'vitest';
import { computeLevel, xpForLevel } from '@/lib/domain/levels';

describe('levels', () => {
  it('computes xp requirement for level', () => {
    expect(xpForLevel(1)).toBe(100);
    expect(xpForLevel(3)).toBe(900);
  });

  it('keeps same level when xp is insufficient', () => {
    expect(computeLevel(1, 10, 50)).toEqual({ level: 1, xp: 60 });
  });

  it('levels up when threshold is crossed', () => {
    expect(computeLevel(1, 190, 20)).toEqual({ level: 1, xp: 210 });
  });

  it('handles multiple level gains', () => {
    expect(computeLevel(1, 150, 850)).toEqual({ level: 2, xp: 600 });
  });

  it('caps at max level 50', () => {
    const result = computeLevel(49, 0, 1_000_000);
    expect(result.level).toBe(50);
  });
});
