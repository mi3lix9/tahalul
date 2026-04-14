import { Text, View } from 'react-native';

import { xpForLevel } from '@/lib/domain/levels';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export function ProfileHeader() {
  const { user } = useAppStore();
  const { t } = useI18n();
  const initials = (user.name || 'T').trim().slice(0, 2).toUpperCase();
  const nextLevelXp = xpForLevel(user.level + 1);
  const ratio = Math.min(user.xp / nextLevelXp, 1);
  const progressWidth = `${Math.max(ratio * 100, 4)}%` as const;

  return (
    <View className="mb-5 rounded-3xl border border-white/10 bg-card p-4">
      <View className="flex-row items-center gap-4">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20">
          <Text className="text-xl font-bold text-emerald-400">{initials}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-xl font-bold text-foreground">{user.name || t('profile.defaultName')}</Text>
          <Text className="mt-1 text-sm text-foreground/60">{t('profile.level')} {user.level}</Text>
        </View>
      </View>

      <View className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
        <View className="h-full rounded-full bg-emerald-500" style={{ width: progressWidth }} />
      </View>

      <View className="mt-4 flex-row justify-between">
        <View>
          <Text className="text-xs text-foreground/60">{t('profile.xp')}</Text>
          <Text className="text-base font-semibold text-foreground">{user.xp}/{nextLevelXp}</Text>
        </View>
        <View>
          <Text className="text-xs text-foreground/60">{t('profile.ecoPoints')}</Text>
          <Text className="text-base font-semibold text-foreground">{user.ecoPoints}</Text>
        </View>
        <View>
          <Text className="text-xs text-foreground/60">🔥 {t('profile.streak')}</Text>
          <Text className="text-base font-semibold text-foreground">{user.streak}</Text>
        </View>
      </View>
    </View>
  );
}
