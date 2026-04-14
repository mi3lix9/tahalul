import { Pressable, Text, View } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';
import type { RewardDef } from '@/types/domain';

type Props = {
  reward: RewardDef;
  onRedeemed?: (code: string) => void;
};

export function RewardCard({ reward, onRedeemed }: Props) {
  const { locale, t } = useI18n();
  const { user, redemptions, redeemReward } = useAppStore();
  const isRedeemed = redemptions.some((entry) => entry.rewardId === reward.id);
  const canRedeem = user.ecoPoints >= reward.cost;

  const handleRedeem = () => {
    const result = redeemReward(reward.id, reward.cost);
    if (result) onRedeemed?.(result.code);
  };

  return (
    <View className="mb-3 rounded-3xl border p-4" style={{ backgroundColor: reward.isDonation ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.04)', borderColor: reward.isDonation ? 'rgba(16,185,129,0.35)' : 'rgba(255,255,255,0.08)' }}>
      <View className="flex-row items-start gap-3">
        <Text className="text-4xl">{reward.icon}</Text>
        <View className="flex-1">
          <Text className="text-base font-bold text-foreground">{locale === 'ar' ? reward.titleAr : reward.titleEn}</Text>
          <Text className="mt-1 text-sm text-foreground/70">{locale === 'ar' ? reward.descAr : reward.descEn}</Text>
          <Text className="mt-3 text-sm font-semibold text-emerald-400">{reward.cost} {t('shop.points')}</Text>
        </View>
      </View>

      <Pressable
        className="mt-4 rounded-2xl px-4 py-3"
        disabled={isRedeemed || !canRedeem}
        onPress={handleRedeem}
        style={{ backgroundColor: isRedeemed ? 'rgba(148,163,184,0.25)' : canRedeem ? '#10b981' : 'rgba(148,163,184,0.14)' }}
      >
        <Text className="text-center font-semibold" style={{ color: isRedeemed || !canRedeem ? '#cbd5e1' : '#fff' }}>
          {isRedeemed ? t('shop.redeemed') : canRedeem ? t('shop.redeem') : t('shop.notEnough')}
        </Text>
      </Pressable>
    </View>
  );
}
