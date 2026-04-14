import type { ChallengeDef } from '@/types/domain';

export const DAILY_CHALLENGES: ChallengeDef[] = [
  { id: 'd1', scope: 'daily', titleAr: 'أعد تدوير 3 علب', titleEn: 'Recycle 3 cans', descAr: 'أعد تدوير 3 علب معدنية اليوم', descEn: 'Recycle 3 metal cans today', goal: 3, reward: 20, actionType: 'recycle_metal' },
  { id: 'd2', scope: 'daily', titleAr: 'يوم بدون بلاستيك', titleEn: 'Plastic-free day', descAr: 'اقضِ يومك بدون استخدام البلاستيك', descEn: 'Spend your day without using plastic', goal: 1, reward: 25, actionType: 'plastic_free_day' },
  { id: 'd3', scope: 'daily', titleAr: 'امشِ بدل السيارة', titleEn: 'Walk instead of drive', descAr: 'امشِ بدلاً من استخدام السيارة مرة واحدة', descEn: 'Walk instead of driving once', goal: 1, reward: 15, actionType: 'walk' },
  { id: 'd4', scope: 'daily', titleAr: 'أعد تدوير 5 زجاجات', titleEn: 'Recycle 5 bottles', descAr: 'أعد تدوير 5 زجاجات بلاستيكية', descEn: 'Recycle 5 plastic bottles', goal: 5, reward: 30, actionType: 'recycle_plastic' },
  { id: 'd5', scope: 'daily', titleAr: 'أعد تدوير ورق', titleEn: 'Recycle paper', descAr: 'أعد تدوير 3 قطع ورقية', descEn: 'Recycle 3 paper items', goal: 3, reward: 15, actionType: 'recycle_paper' },
  { id: 'd6', scope: 'daily', titleAr: 'سجّل عملين بيئيين', titleEn: 'Log 2 eco actions', descAr: 'سجّل عملين بيئيين مختلفين', descEn: 'Log 2 different eco actions', goal: 2, reward: 20 },
];

export const WEEKLY_CHALLENGES: ChallengeDef[] = [
  { id: 'w1', scope: 'weekly', titleAr: 'أعد تدوير 20 قطعة', titleEn: 'Recycle 20 items', descAr: 'أعد تدوير 20 قطعة هذا الأسبوع', descEn: 'Recycle 20 items this week', goal: 20, reward: 100 },
  { id: 'w2', scope: 'weekly', titleAr: 'سلسلة 7 أيام', titleEn: '7-day streak', descAr: 'حافظ على سلسلة 7 أيام متتالية', descEn: 'Maintain a 7-day streak', goal: 7, reward: 150 },
];

export const GROUP_CHALLENGES: ChallengeDef[] = [
  { id: 'g1', scope: 'group', titleAr: 'تحدي الفريق', titleEn: 'Team Challenge', descAr: 'أعد تدوير 50 قطعة مع فريقك', descEn: 'Recycle 50 items with your team', goal: 50, reward: 200 },
];

export const FAKE_FRIENDS = [
  { id: 'f1', name: 'سارة', nameEn: 'Sara' },
  { id: 'f2', name: 'خالد', nameEn: 'Khalid' },
  { id: 'f3', name: 'نورة', nameEn: 'Nora' },
];
