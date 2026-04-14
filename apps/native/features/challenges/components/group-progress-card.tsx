import { Text, View } from 'react-native';

import { FAKE_FRIENDS, GROUP_CHALLENGES } from '@/features/challenges/data/challenge-definitions';
import { computeFakeGroupProgress } from '@/lib/domain/challenges';
import { useI18n } from '@/providers/i18n-provider';
import type { ChallengeProgress } from '@/types/entities';

type Props = {
  challenge: ChallengeProgress;
};

export function GroupProgressCard({ challenge }: Props) {
  const { locale } = useI18n();
  const def = GROUP_CHALLENGES.find((item) => item.id === challenge.challengeDefId) ?? GROUP_CHALLENGES[0];
  if (!def) return null;

  const rows = [
    {
      id: 'me',
      name: locale === 'ar' ? 'أنت' : 'You',
      progress: Math.min(challenge.progress, def.goal),
      color: '#10b981',
    },
    ...FAKE_FRIENDS.map((friend) => ({
      id: friend.id,
      name: locale === 'ar' ? friend.name : friend.nameEn,
      progress: computeFakeGroupProgress(friend.id, challenge.periodKey, def.goal),
      color: '#3b82f6',
    })),
  ];

  return (
    <View className="rounded-3xl border border-white/10 bg-card p-4">
      <Text className="text-lg font-bold text-foreground">{locale === 'ar' ? def.titleAr : def.titleEn}</Text>
      <Text className="mt-1 text-sm text-foreground/70">{locale === 'ar' ? def.descAr : def.descEn}</Text>

      <View className="mt-4 gap-3">
        {rows.map((row) => {
          const width = `${Math.max((row.progress / def.goal) * 100, 6)}%` as const;
          return (
            <View key={row.id}>
              <View className="mb-1 flex-row justify-between">
                <Text className="text-sm font-medium text-foreground">{row.name}</Text>
                <Text className="text-xs text-foreground/60">{row.progress}/{def.goal}</Text>
              </View>
              <View className="h-3 overflow-hidden rounded-full bg-muted">
                <View className="h-full rounded-full" style={{ width, backgroundColor: row.color }} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
