import { router } from 'expo-router';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { EmptyState } from '@/components/empty-state';
import { BADGE_DEFS } from '@/lib/domain/badges';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export function BadgeStrip() {
  const { badges } = useAppStore();
  const { locale, t } = useI18n();
  const unlocked = new Map(badges.map((badge) => [badge.badgeId, badge]));
  const unlockedBadges = BADGE_DEFS.filter((badge) => unlocked.has(badge.id));

  return (
    <View className="mt-4 mb-6">
      <Text className="mb-3 text-lg font-bold text-foreground">{t('profile.badges')}</Text>
      {unlockedBadges.length === 0 ? (
        <EmptyState icon="🏅" title={t('profile.emptyBadgesTitle')} subtitle={t('profile.emptyBadgesSubtitle')} />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-3 pr-4">
          {unlockedBadges.map((badge) => (
            <Pressable
              key={badge.id}
              accessibilityLabel={locale === 'ar' ? badge.nameAr : badge.nameEn}
              onPress={() => router.push({ pathname: '/badge/[id]', params: { id: badge.id } })}
              className="w-20 rounded-2xl border border-white/10 p-3"
              style={{ backgroundColor: 'rgba(16,185,129,0.18)' }}
            >
              <View className="items-center">
                <Text className="text-3xl">{badge.icon}</Text>
                <Text className="mt-2 text-center text-xs font-medium text-foreground">{locale === 'ar' ? badge.nameAr : badge.nameEn}</Text>
                <Text className="mt-1 text-xs">✓</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
