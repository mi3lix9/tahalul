export type ActionType =
  | 'recycle_plastic'
  | 'recycle_metal'
  | 'recycle_paper'
  | 'plastic_free_day'
  | 'walk'
  | 'checkin';

export type VerificationMethod = 'photo' | 'qr' | 'manual';

export type CityStage = 'wasteland' | 'recovering' | 'neutral' | 'green' | 'utopia';

export type BuildingType =
  | 'empty'
  | 'tree'
  | 'house'
  | 'school'
  | 'park'
  | 'solar'
  | 'wind'
  | 'garden';

export type ChallengeScope = 'daily' | 'weekly' | 'group';
export type ChallengeStatus = 'active' | 'completed' | 'expired';

export interface UserProfile {
  id: string;
  name: string;
  level: number;
  xp: number;
  ecoPoints: number;
  streak: number;
  lastActionDate: string | null;
  streakFreezes: number;
  createdAt: string;
}

export interface ActionLog {
  id: string;
  type: ActionType;
  verificationMethod: VerificationMethod;
  photoUri?: string;
  qrCode?: string;
  locationId?: string;
  pointsAwarded: number;
  co2SavedKg: number;
  createdAt: string;
}

export interface CityTile {
  x: number;
  y: number;
  buildingType: BuildingType;
  unlockedByActionId?: string;
  unlockedAt?: string;
}

export interface ChallengeProgress {
  id: string;
  challengeDefId: string;
  scope: ChallengeScope;
  progress: number;
  status: ChallengeStatus;
  startedAt: string;
  periodKey: string;
}

export interface BadgeUnlock {
  id: string;
  badgeId: string;
  unlockedAt: string;
}

export interface RewardRedemption {
  id: string;
  rewardId: string;
  code: string;
  pointsSpent: number;
  redeemedAt: string;
}
