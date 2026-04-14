import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

import { useI18n } from '@/providers/i18n-provider';
import type { ActionResult } from '@/types/domain';

type Props = {
  isVerifying: boolean;
  result: ActionResult | null;
  onDone: () => void;
};

export function VerificationStatusCard({ isVerifying, result, onDone }: Props) {
  const { t } = useI18n();
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (isVerifying) {
      setShowSuccess(false);
      const timer = setTimeout(() => setShowSuccess(true), 1500);
      return () => clearTimeout(timer);
    }

    setShowSuccess(Boolean(result));
  }, [isVerifying, result]);

  const shouldShowLoader = useMemo(() => isVerifying && !showSuccess, [isVerifying, showSuccess]);

  if (!shouldShowLoader && !result) return null;

  return (
    <View className="mt-6 overflow-hidden rounded-3xl border border-emerald-200 bg-card p-5">
      {shouldShowLoader ? (
        <View>
          <Text className="text-lg font-semibold text-foreground">{t('actions.analyzing')}</Text>
          <View className="mt-4 gap-3">
            <View className="h-4 w-2/3 rounded-full bg-emerald-100" />
            <View className="h-4 w-full rounded-full bg-emerald-100" />
            <View className="h-20 w-full rounded-2xl bg-emerald-50" />
          </View>
        </View>
      ) : result ? (
        <Animated.View entering={FadeIn.duration(250)}>
          <Text className="text-lg font-semibold text-foreground">{t('actions.verified')}</Text>
          <View className="mt-4 flex-row gap-3">
            <View className="flex-1 rounded-2xl bg-emerald-50 p-4">
              <Text className="text-sm text-foreground/60">{t('actions.pointsEarned')}</Text>
              <Text className="mt-1 text-2xl font-bold text-foreground">+{result.pointsAwarded}</Text>
            </View>
            <View className="flex-1 rounded-2xl bg-sky-50 p-4">
              <Text className="text-sm text-foreground/60">{t('actions.co2Saved')}</Text>
              <Text className="mt-1 text-2xl font-bold text-foreground">{result.co2SavedKg.toFixed(2)} kg</Text>
            </View>
          </View>
          <Pressable className="mt-5 items-center rounded-2xl bg-emerald-500 px-4 py-3" onPress={onDone}>
            <Text className="font-semibold text-white">{t('common.done')}</Text>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
}
