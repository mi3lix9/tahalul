import type { ActionType, CityStage, BuildingType } from './entities';

export interface ActionDefinition {
  type: ActionType;
  points: number;
  xp: number;
  co2SavedKg: number;
  wasteKg: number;
  waterSavedL: number;
}

export interface VerifiedActionInput {
  type: ActionType;
  verificationMethod: 'photo' | 'qr' | 'manual';
  photoUri?: string;
  qrCode?: string;
  locationId?: string;
}

export interface ActionResult {
  actionId: string;
  pointsAwarded: number;
  xpAwarded: number;
  co2SavedKg: number;
  newLevel: number;
  newXp: number;
  newEcoPoints: number;
  newStreak: number;
  streakContinued: boolean;
  streakFreezeUsed: boolean;
  remainingFreezes: number;
  newBuilding: { x: number; y: number; type: BuildingType } | null;
  newCityStage: CityStage | null;
  unlockedBadges: string[];
}

export interface ImpactSummary {
  totalCo2SavedKg: number;
  totalWasteDivertedKg: number;
  treesEquivalent: number;
  waterSavedL: number;
}

export interface ChallengeDef {
  id: string;
  scope: 'daily' | 'weekly' | 'group';
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  goal: number;
  reward: number;
  actionType?: ActionType;
}

export interface BadgeDef {
  id: string;
  nameAr: string;
  nameEn: string;
  descAr: string;
  descEn: string;
  icon: string;
  condition: (stats: BadgeCheckStats) => boolean;
}

export interface BadgeCheckStats {
  totalActions: number;
  totalByType: Record<ActionType, number>;
  streak: number;
  maxStreak: number;
  level: number;
  cityTilesBuilt: number;
  challengesCompleted: number;
  totalCo2SavedKg: number;
  locationsVisited: number;
  storyChaptersRead: number;
}

export interface RewardDef {
  id: string;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  cost: number;
  icon: string;
  isDonation?: boolean;
}

export interface MapLocation {
  id: string;
  nameAr: string;
  nameEn: string;
  city: string;
  lat: number;
  lng: number;
  types: string[];
  hoursAr: string;
  hoursEn: string;
  rating: number;
  reviewCount: number;
}

export interface StoryChapter {
  id: string;
  number: number;
  titleAr: string;
  titleEn: string;
  requiredStage: CityStage;
  cards: StoryCard[];
}

export interface StoryCard {
  textAr: string;
  textEn: string;
}
