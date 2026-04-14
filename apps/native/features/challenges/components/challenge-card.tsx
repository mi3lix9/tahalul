import { Text, View } from 'react-native';

import { t } from '@/lib/i18n';
import type { ChallengeDef } from '@/types/domain';
import type { ChallengeProgress } from '@/types/entities';

type Props = {
  challenge: ChallengeProgress;
  def: ChallengeDef;
  locale: string;
};

export function ChallengeCard({ challenge, def, locale }: Props) {
  const progress = Math.min(challenge.progress, def.goal);
  const ratio = def.goal > 0 ? progress / def.goal : 0;
  const progressWidth = `${Math.max(ratio * 100, 6)}%` as const;
  const title = locale === 'ar' ? def.titleAr : def.titleEn;
  const description = locale === 'ar' ? def.descAr : def.descEn;
  const timeLabel = challenge.scope === 'daily' ? t('challenges.today') : challenge.scope === 'weekly' ? t('challenges.thisWeek') : t('challenges.live');

  return (
    <View className="mb-3 rounded-3xl border border-white/10 bg-card p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">{title}</Text>
          <Text className="mt-1 text-sm text-foreground/70">{description}</Text>
        </View>
        <View className="rounded-full bg-emerald-500/15 px-3 py-1">
          <Text className="text-xs font-semibold text-emerald-400">+{def.reward}</Text>
        </View>
      </View>

      <View className="mt-4 h-3 overflow-hidden rounded-full bg-muted">
        <View className="h-full rounded-full bg-emerald-500" style={{ width: progressWidth }} />
      </View>

      <View className="mt-3 flex-row items-center justify-between">
        <Text className="text-sm font-medium text-foreground/80">{progress}/{def.goal}</Text>
        <Text className="text-xs text-foreground/60">{timeLabel}</Text>
      </View>
    </View>
  );
}
