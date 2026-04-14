import { FlatList, Text, View } from 'react-native';

import { RewardCard } from '@/features/shop/components/reward-card';
import { REWARDS } from '@/features/shop/data/rewards';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

type Props = {
  onRedeemed?: (code: string) => void;
};

export function RewardGrid({ onRedeemed }: Props) {
  const { t } = useI18n();
  const { user } = useAppStore();

  return (
    <FlatList
      data={REWARDS}
      keyExtractor={(item) => item.id}
      numColumns={1}
      contentContainerStyle={{ paddingBottom: 32 }}
      ListHeaderComponent={
        <View className="mb-4 rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4">
          <Text className="text-sm text-foreground/70">{t('profile.ecoPoints')}</Text>
          <Text className="mt-1 text-3xl font-bold text-emerald-400">{user.ecoPoints}</Text>
        </View>
      }
      renderItem={({ item }) => <RewardCard reward={item} onRedeemed={onRedeemed} />}
    />
  );
}
