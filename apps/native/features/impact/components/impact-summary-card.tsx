import { Text, View } from 'react-native';

import { computeImpact } from '@/lib/domain/impact';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

const ICONS = ['🌿', '♻️', '🌳', '💧'] as const;

export function ImpactSummaryCard() {
  const { actions } = useAppStore();
  const { t } = useI18n();
  const impact = computeImpact(actions);

  const metrics = [
    { icon: ICONS[0], label: t('impact.co2Saved'), value: `${impact.totalCo2SavedKg} ${t('impact.kg')}` },
    { icon: ICONS[1], label: t('impact.wasteDiverted'), value: `${impact.totalWasteDivertedKg} ${t('impact.kg')}` },
    { icon: ICONS[2], label: t('impact.treesEquivalent'), value: `${impact.treesEquivalent}` },
    { icon: ICONS[3], label: t('impact.waterSaved'), value: `${impact.waterSavedL} ${t('impact.liters')}` },
  ];

  return (
    <View className="mb-5 flex-row flex-wrap justify-between gap-y-3">
      {metrics.map((metric) => (
        <View key={metric.label} className="w-[48%] rounded-3xl border border-white/10 bg-card p-4">
          <Text className="text-2xl">{metric.icon}</Text>
          <Text className="mt-3 text-lg font-bold text-foreground">{metric.value}</Text>
          <Text className="mt-1 text-sm text-foreground/60">{metric.label}</Text>
        </View>
      ))}
    </View>
  );
}
