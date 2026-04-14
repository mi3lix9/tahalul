import { useMemo, useState } from 'react';
import { ScrollView } from 'react-native';

import { StoryChapterCard } from '@/features/story/components/story-chapter-card';
import { useI18n } from '@/providers/i18n-provider';
import type { StoryChapter } from '@/types/domain';
import type { CityStage } from '@/types/entities';

const STAGE_ORDER: CityStage[] = ['wasteland', 'recovering', 'neutral', 'green', 'utopia'];

type Props = {
  chapters: StoryChapter[];
  currentStage: CityStage;
};

export function StoryChapterList({ chapters, currentStage }: Props) {
  const { t } = useI18n();
  const [expandedId, setExpandedId] = useState<string | null>(chapters[0]?.id ?? null);
  const currentIndex = STAGE_ORDER.indexOf(currentStage);
  const stageLabels = useMemo(() => Object.fromEntries(STAGE_ORDER.map((stage) => [stage, t(`city.${stage}`)])), [t]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
      {chapters.map((chapter) => {
        const isUnlocked = STAGE_ORDER.indexOf(chapter.requiredStage) <= currentIndex;
        return (
          <StoryChapterCard
            key={chapter.id}
            chapter={chapter}
            isUnlocked={isUnlocked}
            isExpanded={expandedId === chapter.id && isUnlocked}
            requiredStageLabel={stageLabels[chapter.requiredStage] as string}
            onToggle={() => setExpandedId((prev) => (prev === chapter.id ? null : chapter.id))}
          />
        );
      })}
    </ScrollView>
  );
}
