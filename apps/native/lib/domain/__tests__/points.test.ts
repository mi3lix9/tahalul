import { describe, expect, it } from 'vitest';
import { calculateCo2, calculatePoints, calculateXp } from '@/lib/domain/points';

describe('points', () => {
  it('calculates points for recycle plastic', () => {
    expect(calculatePoints('recycle_plastic')).toBe(10);
  });

  it('calculates xp for walk', () => {
    expect(calculateXp('walk')).toBe(18);
  });

  it('calculates co2 for plastic free day', () => {
    expect(calculateCo2('plastic_free_day')).toBe(0.5);
  });

  it('returns correct values for checkin', () => {
    expect(calculatePoints('checkin')).toBe(5);
    expect(calculateXp('checkin')).toBe(8);
    expect(calculateCo2('checkin')).toBe(0.02);
  });
});
