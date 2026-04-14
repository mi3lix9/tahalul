import { Alert, Pressable, ScrollView, Text } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { ImpactChartCard } from '@/features/impact/components/impact-chart-card';
import { ImpactSummaryCard } from '@/features/impact/components/impact-summary-card';
import { computeImpact } from '@/lib/domain/impact';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export default function ImpactScreen() {
  const { t } = useI18n();
  const { actions } = useAppStore();
  const impact = computeImpact(actions);

  return (
    <AppScreen>
      <SectionHeader title={t('impact.title')} subtitle={t('impact.subtitle')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <ImpactSummaryCard />
        <ImpactChartCard />

        <Pressable className="mt-5 rounded-2xl bg-emerald-500 px-4 py-4" onPress={() => Alert.alert(t('impact.share'), t('impact.shareText', { co2: impact.totalCo2SavedKg }))}>
          <Text className="text-center font-bold text-white">{t('impact.share')}</Text>
        </Pressable>
      </ScrollView>
    </AppScreen>
  );
}
