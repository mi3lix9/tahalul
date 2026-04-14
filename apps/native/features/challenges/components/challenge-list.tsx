import { ScrollView, Text } from 'react-native';

import { DAILY_CHALLENGES, GROUP_CHALLENGES, WEEKLY_CHALLENGES } from '@/features/challenges/data/challenge-definitions';
import { useI18n } from '@/providers/i18n-provider';
import type { ChallengeDef } from '@/types/domain';
import type { ChallengeProgress, ChallengeScope } from '@/types/entities';

import { ChallengeCard } from './challenge-card';

type Props = {
  challenges: ChallengeProgress[];
  scope: ChallengeScope;
};

const DEFS_BY_SCOPE: Record<ChallengeScope, ChallengeDef[]> = {
  daily: DAILY_CHALLENGES,
  weekly: WEEKLY_CHALLENGES,
  group: GROUP_CHALLENGES,
};

export function ChallengeList({ challenges, scope }: Props) {
  const { locale, t } = useI18n();
  const defs = DEFS_BY_SCOPE[scope];
  const progressByDefId = new Map(challenges.filter((item) => item.scope === scope).map((item) => [item.challengeDefId, item]));
  const items = defs
    .map((def) => ({
      def,
      challenge: progressByDefId.get(def.id) ?? {
        id: `${scope}-${def.id}`,
        challengeDefId: def.id,
        scope,
        progress: 0,
        status: 'active' as const,
        startedAt: new Date().toISOString(),
        periodKey: scope,
      },
    }));

  if (items.length === 0) {
    return <Text className="text-sm text-foreground/60">{t('challenges.placeholder')}</Text>;
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
      {items.map(({ def, challenge }) => (
        <ChallengeCard key={def.id} challenge={challenge} def={def} locale={locale} />
      ))}
    </ScrollView>
  );
}
