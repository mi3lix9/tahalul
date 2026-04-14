import { describe, expect, it } from 'vitest';
import type { ActionLog } from '@/types/entities';
import { computeImpact } from '@/lib/domain/impact';

const baseAction = (overrides: Partial<ActionLog>): ActionLog => ({
  id: 'a1',
  type: 'recycle_plastic',
  verificationMethod: 'manual',
  pointsAwarded: 10,
  co2SavedKg: 0.08,
  createdAt: '2026-04-14T10:00:00.000Z',
  ...overrides,
});

describe('impact', () => {
  it('returns zero summary for empty actions', () => {
    expect(computeImpact([])).toEqual({
      totalCo2SavedKg: 0,
      totalWasteDivertedKg: 0,
      treesEquivalent: 0,
      waterSavedL: 0,
    });
  });

  it('computes impact for a single action', () => {
    expect(computeImpact([baseAction({})])).toEqual({
      totalCo2SavedKg: 0.08,
      totalWasteDivertedKg: 0.03,
      treesEquivalent: 0,
      waterSavedL: 1.5,
    });
  });

  it('computes impact for multiple actions', () => {
    const result = computeImpact([
      baseAction({ type: 'recycle_plastic' }),
      baseAction({ id: 'a2', type: 'walk', co2SavedKg: 0.21 }),
      baseAction({ id: 'a3', type: 'plastic_free_day', co2SavedKg: 0.5 }),
    ]);

    expect(result).toEqual({
      totalCo2SavedKg: 0.79,
      totalWasteDivertedKg: 0.13,
      treesEquivalent: 0.04,
      waterSavedL: 6.5,
    });
  });
});
