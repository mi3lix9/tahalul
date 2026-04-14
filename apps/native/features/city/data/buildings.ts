import type { BuildingType } from '@/types/entities';

export interface BuildingDef {
  type: BuildingType;
  nameAr: string;
  nameEn: string;
  icon: string;
  color: string;
}

export const BUILDING_DEFS: Record<BuildingType, BuildingDef> = {
  empty: { type: 'empty', nameAr: 'فارغ', nameEn: 'Empty', icon: '⬜', color: '#6b7280' },
  tree: { type: 'tree', nameAr: 'شجرة', nameEn: 'Tree', icon: '🌳', color: '#22c55e' },
  house: { type: 'house', nameAr: 'منزل', nameEn: 'House', icon: '🏠', color: '#f59e0b' },
  school: { type: 'school', nameAr: 'مدرسة', nameEn: 'School', icon: '🏫', color: '#3b82f6' },
  park: { type: 'park', nameAr: 'حديقة', nameEn: 'Park', icon: '🏞️', color: '#10b981' },
  solar: { type: 'solar', nameAr: 'ألواح شمسية', nameEn: 'Solar Panels', icon: '☀️', color: '#eab308' },
  wind: { type: 'wind', nameAr: 'توربينة رياح', nameEn: 'Wind Turbine', icon: '🌬️', color: '#06b6d4' },
  garden: { type: 'garden', nameAr: 'حديقة منزلية', nameEn: 'Garden', icon: '🌻', color: '#a3e635' },
};
