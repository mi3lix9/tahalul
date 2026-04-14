import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { ChallengeList } from '@/features/challenges/components/challenge-list';
import { GroupProgressCard } from '@/features/challenges/components/group-progress-card';
import { DAILY_CHALLENGES, GROUP_CHALLENGES } from '@/features/challenges/data/challenge-definitions';
import { getDailyPeriodKey, pickDailyChallenges, shouldRefreshChallenges } from '@/lib/domain/challenges';
import { getLastDailyRefresh, setLastDailyRefresh } from '@/lib/storage/preferences';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';
import type { ChallengeProgress, ChallengeScope } from '@/types/entities';

const TABS: ChallengeScope[] = ['daily', 'weekly', 'group'];

export default function ChallengesScreen() {
  const [activeTab, setActiveTab] = useState<ChallengeScope>('daily');
  const { challenges, resetDailyChallenges } = useAppStore();
  const { t } = useI18n();

  useEffect(() => {
    const run = async () => {
      const now = new Date().toISOString();
      const currentKey = getDailyPeriodKey(now);
      const lastKey = await getLastDailyRefresh();
      if (!shouldRefreshChallenges(lastKey, currentKey)) return;

      const picked = pickDailyChallenges(DAILY_CHALLENGES.map((challenge) => challenge.id), now).map<ChallengeProgress>((id) => ({
        id: `${currentKey}:${id}`,
        challengeDefId: id,
        scope: 'daily',
        progress: 0,
        status: 'active',
        startedAt: now,
        periodKey: currentKey,
      }));

      resetDailyChallenges(picked);
      await setLastDailyRefresh(currentKey);
    };

    void run();
  }, [resetDailyChallenges]);

  const groupChallenge = useMemo(
    () =>
      challenges.find((item) => item.scope === 'group') ?? {
        id: 'group-g1',
        challengeDefId: GROUP_CHALLENGES[0]?.id ?? 'g1',
        scope: 'group' as const,
        progress: 0,
        status: 'active' as const,
        startedAt: new Date().toISOString(),
        periodKey: 'group',
      },
    [challenges],
  );

  return (
    <AppScreen>
      <SectionHeader title={t('challenges.title')} subtitle={t('challenges.placeholder')} />
      <View className="mb-4 flex-row rounded-2xl bg-card p-1">
        {TABS.map((tab) => (
          <Pressable key={tab} onPress={() => setActiveTab(tab)} className="flex-1 rounded-2xl px-3 py-3" style={{ backgroundColor: activeTab === tab ? 'rgba(16,185,129,0.16)' : 'transparent' }}>
            <Text className="text-center font-semibold text-foreground">{t(`challenges.${tab}`)}</Text>
          </Pressable>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        {activeTab === 'group' ? <GroupProgressCard challenge={groupChallenge} /> : <ChallengeList challenges={challenges} scope={activeTab} />}
      </ScrollView>
    </AppScreen>
  );
}
