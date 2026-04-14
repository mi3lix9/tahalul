import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { getBadgeDef } from '@/lib/domain/badges';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export default function BadgeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { locale, t } = useI18n();
  const { badges } = useAppStore();

  const badge = id ? getBadgeDef(id) : undefined;
  const unlock = badges.find((entry) => entry.badgeId === id);

  if (!badge) {
    return (
      <AppScreen className="bg-background">
        <View className="flex-1 items-center justify-center gap-4">
          <Text className="text-lg font-semibold text-foreground">{t('badges.notFound')}</Text>
          <Pressable onPress={() => router.back()} className="rounded-2xl bg-emerald-500 px-4 py-3">
            <Text className="font-semibold text-white">{t('common.back')}</Text>
          </Pressable>
        </View>
      </AppScreen>
    );
  }

  return (
    <AppScreen className="bg-background">
      <View className="flex-1 justify-center">
        <Pressable onPress={() => router.back()} className="mb-6 self-start rounded-full bg-white/10 px-4 py-2">
          <Text className="font-medium text-foreground">{t('common.back')}</Text>
        </Pressable>

        <View className="rounded-3xl bg-slate-900/85 p-6">
          <Text className="text-center text-7xl" style={{ opacity: unlock ? 1 : 0.4 }}>{badge.icon}</Text>
          <Text className="mt-4 text-center text-2xl font-bold text-white">{locale === 'ar' ? badge.nameAr : badge.nameEn}</Text>
          <Text className="mt-3 text-center text-base text-white/75">{locale === 'ar' ? badge.descAr : badge.descEn}</Text>

          <View className="mt-6 rounded-2xl bg-white/10 p-4">
            <Text className="text-sm text-white/70">{unlock ? t('badges.unlockedOn') : t('story.locked')}</Text>
            <Text className="mt-1 text-base font-semibold text-white">{unlock ? new Date(unlock.unlockedAt).toLocaleDateString(locale) : t('badges.lockedStatus')}</Text>
          </View>
        </View>
      </View>
    </AppScreen>
  );
}
