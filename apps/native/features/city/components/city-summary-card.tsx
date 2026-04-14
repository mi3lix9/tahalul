import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import * as Haptics from 'expo-haptics';

import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

const QUICK_LINKS = [
  { key: 'map', icon: '🗺️', href: '/map' },
  { key: 'shop', icon: '🛍️', href: '/shop' },
  { key: 'story', icon: '📖', href: '/story' },
  { key: 'assistant', icon: '🤖', href: '/assistant' },
] as const;

export function CitySummaryCard() {
  const { user, actions } = useAppStore();
  const { t } = useI18n();
  const today = new Date().toISOString().slice(0, 10);
  const todaysActions = actions.filter((action) => action.createdAt.slice(0, 10) === today);
  const todaysPoints = todaysActions.reduce((sum, action) => sum + action.pointsAwarded, 0);

  const openRoute = async (href: '/map' | '/shop' | '/story' | '/assistant') => {
    await Haptics.selectionAsync();
    router.push(href);
  };

  return (
    <View className="mt-4 rounded-3xl bg-slate-900/80 p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <Text className="text-2xl">🔥</Text>
          <View>
            <Text className="text-sm text-white/70">{t('home.streak')}</Text>
            <Text className="text-xl font-bold text-white">{user.streak}</Text>
          </View>
        </View>

        <View className="items-end">
          <Text className="text-sm text-white/70">{t('home.todayQuickStats')}</Text>
          <Text className="text-sm font-semibold text-emerald-300">{todaysActions.length} · +{todaysPoints}</Text>
        </View>
      </View>

      <View className="mt-4">
        <Text className="mb-3 text-sm font-semibold text-white/70">{t('home.quickActions')}</Text>
        <View className="flex-row flex-wrap justify-between gap-y-3">
          {QUICK_LINKS.map((link) => (
            <Pressable key={link.key} onPress={() => openRoute(link.href)} className="w-[48%] rounded-2xl bg-white/10 p-3 active:opacity-80">
              <Text className="text-xl">{link.icon}</Text>
              <Text className="mt-2 font-semibold text-white">{t(`home.${link.key}`)}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
}
