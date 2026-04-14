import type { ActionLog } from '@/types/entities';
import type { ImpactSummary } from '@/types/domain';
import { getActionDef } from './points';

export function computeImpact(actions: ActionLog[]): ImpactSummary {
  let totalCo2SavedKg = 0;
  let totalWasteDivertedKg = 0;
  let waterSavedL = 0;

  for (const action of actions) {
    totalCo2SavedKg += action.co2SavedKg;
    const def = getActionDef(action.type);
    totalWasteDivertedKg += def.wasteKg;
    waterSavedL += def.waterSavedL;
  }

  const treesEquivalent = totalCo2SavedKg / 22;

  return {
    totalCo2SavedKg: Math.round(totalCo2SavedKg * 100) / 100,
    totalWasteDivertedKg: Math.round(totalWasteDivertedKg * 100) / 100,
    treesEquivalent: Math.round(treesEquivalent * 100) / 100,
    waterSavedL: Math.round(waterSavedL * 100) / 100,
  };
}

export function computeImpactForPeriod(actions: ActionLog[], startDate: string, endDate: string): ImpactSummary {
  const filtered = actions.filter((a) => a.createdAt >= startDate && a.createdAt <= endDate);
  return computeImpact(filtered);
}
