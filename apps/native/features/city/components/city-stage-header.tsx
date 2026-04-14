import { Text, View } from 'react-native';

import { STAGE_THEMES } from '@/constants/stage-theme';
import { getCityStage, getPollutionPercent } from '@/lib/domain/city';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export function CityStageHeader() {
  const { user } = useAppStore();
  const { t } = useI18n();
  const stage = getCityStage(user.ecoPoints);
  const pollution = getPollutionPercent(user.ecoPoints);
  const theme = STAGE_THEMES[stage];

  return (
    <View className="mb-4 rounded-3xl p-4" style={{ backgroundColor: theme.bgColor }}>
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium uppercase" style={{ color: theme.textColor }}>{t('home.city')}</Text>
          <Text className="mt-1 text-3xl font-bold" style={{ color: theme.textColor }}>{t(`city.${stage}`)}</Text>
        </View>
        <View className="items-end">
          <Text className="text-xs" style={{ color: theme.textColor }}>{t('profile.ecoPoints')}</Text>
          <Text className="text-2xl font-extrabold" style={{ color: theme.accentColor }}>{user.ecoPoints}</Text>
        </View>
      </View>

      <View className="mt-4">
        <View className="mb-2 flex-row items-center justify-between">
          <Text className="text-sm font-medium" style={{ color: theme.textColor }}>{t('city.pollution')}</Text>
          <Text className="text-sm font-semibold" style={{ color: theme.accentColor }}>{pollution}%</Text>
        </View>
        <View className="h-3 overflow-hidden rounded-full" style={{ backgroundColor: theme.gridBg }}>
          <View className="h-full rounded-full" style={{ width: `${pollution}%`, backgroundColor: theme.accentColor }} />
        </View>
      </View>
    </View>
  );
}
