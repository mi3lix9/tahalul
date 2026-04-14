import { Text, View } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export function StreakCard() {
  const { user } = useAppStore();
  const { locale, t } = useI18n();
  const today = new Date();
  const activeKey = user.lastActionDate?.slice(0, 10);
  const freezeKey = user.lastActionDate
    ? new Date(new Date(user.lastActionDate).getTime() + 86400000).toISOString().slice(0, 10)
    : null;

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const state = key === activeKey ? 'active' : key === freezeKey && user.streakFreezes < 1 ? 'freeze' : 'missed';
    return { key, label: date.toLocaleDateString(locale, { weekday: 'narrow' }), state };
  });

  return (
    <View className="mb-5 rounded-3xl border border-white/10 bg-card p-4">
      <Text className="text-sm text-foreground/60">{t('profile.streak')}</Text>
      <Text className="mt-1 text-4xl font-bold text-foreground">{user.streak}</Text>
      <Text className="text-sm text-foreground/60">{t('profile.days')}</Text>

      <Text className="mt-4 text-sm text-foreground/70">{t('profile.streakFreezes')}: {user.streakFreezes}</Text>

      <View className="mt-4 flex-row justify-between">
        {days.map((day) => (
          <View key={day.key} className="items-center gap-2">
            <View
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: day.state === 'active' ? '#10b981' : day.state === 'freeze' ? '#3b82f6' : '#6b7280' }}
            />
            <Text className="text-[10px] text-foreground/50">{day.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
