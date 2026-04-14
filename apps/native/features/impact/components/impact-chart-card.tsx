import { Text, View } from 'react-native';

import { computeImpact } from '@/lib/domain/impact';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

function getDayKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function ImpactChartCard() {
  const { actions } = useAppStore();
  const { locale, t } = useI18n();
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (29 - index));
    const key = getDayKey(date);
    const dailyActions = actions.filter((action) => action.createdAt.slice(0, 10) === key);
    return {
      key,
      label: index === 0 || index === 14 || index === 29 ? date.toLocaleDateString(locale, { month: 'numeric', day: 'numeric' }) : '',
      co2: computeImpact(dailyActions).totalCo2SavedKg,
    };
  });

  const max = Math.max(...days.map((day) => day.co2), 1);

  return (
    <View className="rounded-3xl border border-white/10 bg-card p-4">
      <Text className="text-lg font-bold text-foreground">{t('impact.last30Days')}</Text>
      <View className="mt-4 h-44 flex-row items-end justify-between gap-1">
        {days.map((day) => (
          <View key={day.key} className="flex-1 items-center justify-end">
            <View className="w-full rounded-t-full bg-emerald-500/90" style={{ height: `${Math.max((day.co2 / max) * 100, day.co2 > 0 ? 8 : 2)}%` as const }} />
            <Text className="mt-2 text-[10px] text-foreground/50">{day.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
