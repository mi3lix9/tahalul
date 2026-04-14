import { router } from 'expo-router';
import { Alert, Pressable, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { RewardGrid } from '@/features/shop/components/reward-grid';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export default function ShopScreen() {
  const { t } = useI18n();
  const { user } = useAppStore();

  return (
    <AppScreen>
      <View className="flex-1">
        <View className="mb-4 flex-row items-center justify-between">
          <SectionHeader title={t('shop.title')} subtitle={`${user.ecoPoints} ${t('shop.points')}`} />
          <Pressable onPress={() => router.back()} className="self-start rounded-full bg-white/10 px-4 py-2">
            <Text className="font-medium text-foreground">{t('common.back')}</Text>
          </Pressable>
        </View>

        <RewardGrid onRedeemed={(code) => Alert.alert(t('shop.couponCode'), code)} />
      </View>
    </AppScreen>
  );
}
