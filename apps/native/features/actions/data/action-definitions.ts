import type { ActionType } from '@/types/entities';

export interface ActionOption {
  type: ActionType;
  labelAr: string;
  labelEn: string;
  icon: string;
  methods: ('photo' | 'qr' | 'manual')[];
}

export const ACTION_OPTIONS: ActionOption[] = [
  { type: 'recycle_plastic', labelAr: 'إعادة تدوير بلاستيك', labelEn: 'Recycle Plastic', icon: '♻️', methods: ['photo', 'qr', 'manual'] },
  { type: 'recycle_metal', labelAr: 'إعادة تدوير معدن', labelEn: 'Recycle Metal', icon: '🥫', methods: ['photo', 'qr', 'manual'] },
  { type: 'recycle_paper', labelAr: 'إعادة تدوير ورق', labelEn: 'Recycle Paper', icon: '📄', methods: ['photo', 'qr', 'manual'] },
  { type: 'plastic_free_day', labelAr: 'يوم بدون بلاستيك', labelEn: 'Plastic-Free Day', icon: '🚫', methods: ['manual'] },
  { type: 'walk', labelAr: 'مشي بدل السيارة', labelEn: 'Walk Instead of Drive', icon: '🚶', methods: ['manual'] },
  { type: 'checkin', labelAr: 'تسجيل حضور', labelEn: 'Check In', icon: '📍', methods: ['qr'] },
];
