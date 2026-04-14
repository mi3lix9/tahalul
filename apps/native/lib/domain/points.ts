import type { ActionType } from '@/types/entities';
import type { ActionDefinition } from '@/types/domain';

const ACTION_DEFS: Record<ActionType, ActionDefinition> = {
  recycle_plastic: { type: 'recycle_plastic', points: 10, xp: 15, co2SavedKg: 0.08, wasteKg: 0.03, waterSavedL: 1.5 },
  recycle_metal: { type: 'recycle_metal', points: 15, xp: 20, co2SavedKg: 0.17, wasteKg: 0.05, waterSavedL: 2.0 },
  recycle_paper: { type: 'recycle_paper', points: 8, xp: 12, co2SavedKg: 0.06, wasteKg: 0.04, waterSavedL: 1.0 },
  plastic_free_day: { type: 'plastic_free_day', points: 25, xp: 30, co2SavedKg: 0.5, wasteKg: 0.1, waterSavedL: 5.0 },
  walk: { type: 'walk', points: 12, xp: 18, co2SavedKg: 0.21, wasteKg: 0, waterSavedL: 0 },
  checkin: { type: 'checkin', points: 5, xp: 8, co2SavedKg: 0.02, wasteKg: 0, waterSavedL: 0 },
};

export function getActionDef(type: ActionType): ActionDefinition {
  return ACTION_DEFS[type];
}

export function calculatePoints(type: ActionType): number {
  return ACTION_DEFS[type].points;
}

export function calculateXp(type: ActionType): number {
  return ACTION_DEFS[type].xp;
}

export function calculateCo2(type: ActionType): number {
  return ACTION_DEFS[type].co2SavedKg;
}
