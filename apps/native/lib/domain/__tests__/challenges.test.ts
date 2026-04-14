import { describe, expect, it } from 'vitest';
import { getDailyPeriodKey, pickDailyChallenges, shouldRefreshChallenges } from '@/lib/domain/challenges';

describe('challenges', () => {
  it('builds daily period key from date', () => {
    expect(getDailyPeriodKey('2026-04-14T10:00:00.000Z')).toBe('daily:2026-04-14');
  });

  it('detects when refresh is needed', () => {
    expect(shouldRefreshChallenges(null, 'daily:2026-04-14')).toBe(true);
    expect(shouldRefreshChallenges('daily:2026-04-13', 'daily:2026-04-14')).toBe(true);
  });

  it('does not refresh when key is unchanged', () => {
    expect(shouldRefreshChallenges('daily:2026-04-14', 'daily:2026-04-14')).toBe(false);
  });

  it('picks deterministic daily challenges', () => {
    const all = ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'];
    const first = pickDailyChallenges(all, '2026-04-14T10:00:00.000Z', 3);
    const second = pickDailyChallenges(all, '2026-04-14T15:00:00.000Z', 3);
    expect(first).toEqual(second);
    expect(first).toHaveLength(3);
  });
});
