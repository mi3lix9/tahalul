import type { RewardDef } from '@/types/domain';

export const REWARDS: RewardDef[] = [
  { id: 'r1', titleAr: '10% خصم من متجر X', titleEn: '10% off at Store X', descAr: 'كوبون خصم 10% على أي منتج', descEn: '10% discount coupon on any product', cost: 100, icon: '🏷️' },
  { id: 'r2', titleAr: 'كوب قابل لإعادة الاستخدام', titleEn: 'Reusable Cup', descAr: 'كوب صديق للبيئة', descEn: 'Eco-friendly reusable cup', cost: 200, icon: '☕' },
  { id: 'r3', titleAr: 'حقيبة تسوق صديقة للبيئة', titleEn: 'Eco Shopping Bag', descAr: 'حقيبة تسوق قابلة لإعادة الاستخدام', descEn: 'Reusable shopping bag', cost: 150, icon: '🛍️' },
  { id: 'r4', titleAr: 'زراعة شجرة باسمك', titleEn: 'Plant a Tree in Your Name', descAr: 'نزرع شجرة حقيقية باسمك', descEn: 'We plant a real tree in your name', cost: 300, icon: '🌳', isDonation: true },
  { id: 'r5', titleAr: 'قارورة مياه معدنية', titleEn: 'Metal Water Bottle', descAr: 'قارورة مياه من الستانلس ستيل', descEn: 'Stainless steel water bottle', cost: 250, icon: '🫗' },
  { id: 'r6', titleAr: 'شحن مجاني', titleEn: 'Free Shipping', descAr: 'شحن مجاني على طلبك القادم', descEn: 'Free shipping on your next order', cost: 80, icon: '📦' },
  { id: 'r7', titleAr: 'بذور نباتات', titleEn: 'Plant Seeds Pack', descAr: 'مجموعة بذور نباتات منزلية', descEn: 'Indoor plant seeds pack', cost: 120, icon: '🌱' },
  { id: 'r8', titleAr: 'تبرع بزراعة شجرة', titleEn: 'Donate to Plant a Tree', descAr: 'تبرع بنقاطك لزراعة شجرة حقيقية', descEn: 'Donate your points to plant a real tree', cost: 50, icon: '💚', isDonation: true },
];
