import type { BadgeDef, BadgeCheckStats } from '@/types/domain';

export const BADGE_DEFS: BadgeDef[] = [
  { id: 'first_step', nameAr: 'الخطوة الأولى', nameEn: 'First Step', descAr: 'سجّل أول عمل بيئي', descEn: 'Log your first eco action', icon: '🌱', condition: (s) => s.totalActions >= 1 },
  { id: 'eco_hero', nameAr: 'بطل البيئة', nameEn: 'Eco Hero', descAr: 'سجّل 50 عمل بيئي', descEn: 'Log 50 eco actions', icon: '🦸', condition: (s) => s.totalActions >= 50 },
  { id: 'plastic_warrior', nameAr: 'محارب البلاستيك', nameEn: 'Plastic Warrior', descAr: 'أعد تدوير 20 قطعة بلاستيك', descEn: 'Recycle 20 plastic items', icon: '♻️', condition: (s) => (s.totalByType.recycle_plastic ?? 0) >= 20 },
  { id: 'tree_planter', nameAr: 'زارع الأشجار', nameEn: 'Tree Planter', descAr: 'ازرع 5 أشجار في مدينتك', descEn: 'Plant 5 trees in your city', icon: '🌳', condition: (s) => s.cityTilesBuilt >= 5 },
  { id: 'streak_master', nameAr: 'سيد السلاسل', nameEn: 'Streak Master', descAr: 'حافظ على سلسلة 30 يوم', descEn: 'Maintain a 30-day streak', icon: '🔥', condition: (s) => s.streak >= 30 },
  { id: 'city_builder', nameAr: 'بانِ المدينة', nameEn: 'City Builder', descAr: 'ابنِ 15 مبنى في مدينتك', descEn: 'Build 15 buildings in your city', icon: '🏗️', condition: (s) => s.cityTilesBuilt >= 15 },
  { id: 'recycler_10', nameAr: 'معيد تدوير 10', nameEn: 'Recycler 10', descAr: 'أعد تدوير 10 قطع', descEn: 'Recycle 10 items', icon: '♻️', condition: (s) => (s.totalByType.recycle_plastic + s.totalByType.recycle_metal + s.totalByType.recycle_paper) >= 10 },
  { id: 'recycler_50', nameAr: 'معيد تدوير 50', nameEn: 'Recycler 50', descAr: 'أعد تدوير 50 قطعة', descEn: 'Recycle 50 items', icon: '♻️', condition: (s) => (s.totalByType.recycle_plastic + s.totalByType.recycle_metal + s.totalByType.recycle_paper) >= 50 },
  { id: 'recycler_100', nameAr: 'معيد تدوير 100', nameEn: 'Recycler 100', descAr: 'أعد تدوير 100 قطعة', descEn: 'Recycle 100 items', icon: '♻️', condition: (s) => (s.totalByType.recycle_plastic + s.totalByType.recycle_metal + s.totalByType.recycle_paper) >= 100 },
  { id: 'week_streak', nameAr: 'سلسلة أسبوع', nameEn: 'Week Streak', descAr: 'حافظ على سلسلة 7 أيام', descEn: '7-day streak', icon: '📅', condition: (s) => s.streak >= 7 },
  { id: 'month_streak', nameAr: 'سلسلة شهر', nameEn: 'Month Streak', descAr: 'حافظ على سلسلة 30 يوم', descEn: '30-day streak', icon: '📅', condition: (s) => s.streak >= 30 },
  { id: 'challenge_champ', nameAr: 'بطل التحديات', nameEn: 'Challenge Champ', descAr: 'أكمل 10 تحديات', descEn: 'Complete 10 challenges', icon: '🏆', condition: (s) => s.challengesCompleted >= 10 },
  { id: 'impact_maker', nameAr: 'صانع الأثر', nameEn: 'Impact Maker', descAr: 'وفّر 10 كجم CO₂', descEn: 'Save 10 kg CO₂', icon: '🌍', condition: (s) => s.totalCo2SavedKg >= 10 },
  { id: 'map_explorer', nameAr: 'مستكشف الخريطة', nameEn: 'Map Explorer', descAr: 'زر 3 مواقع إعادة تدوير', descEn: 'Visit 3 recycling locations', icon: '🗺️', condition: (s) => s.locationsVisited >= 3 },
  { id: 'story_reader', nameAr: 'قارئ القصة', nameEn: 'Story Reader', descAr: 'اقرأ جميع فصول القصة', descEn: 'Read all story chapters', icon: '📖', condition: (s) => s.storyChaptersRead >= 5 },
];

export function checkBadgeUnlocks(stats: BadgeCheckStats, alreadyUnlocked: string[]): string[] {
  const newUnlocks: string[] = [];
  for (const badge of BADGE_DEFS) {
    if (!alreadyUnlocked.includes(badge.id) && badge.condition(stats)) {
      newUnlocks.push(badge.id);
    }
  }
  return newUnlocks;
}

export function getBadgeDef(id: string): BadgeDef | undefined {
  return BADGE_DEFS.find((b) => b.id === id);
}
