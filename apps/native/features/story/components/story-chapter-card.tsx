import { Pressable, Text, View } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';
import type { StoryChapter } from '@/types/domain';

type Props = {
  chapter: StoryChapter;
  isUnlocked: boolean;
  isExpanded: boolean;
  requiredStageLabel: string;
  onToggle: () => void;
};

export function StoryChapterCard({ chapter, isUnlocked, isExpanded, requiredStageLabel, onToggle }: Props) {
  const { locale, t } = useI18n();

  return (
    <View className="mb-3 overflow-hidden rounded-3xl border border-white/10 bg-card">
      <Pressable className="p-4" disabled={!isUnlocked} onPress={onToggle}>
        <View className="flex-row items-center justify-between gap-3">
          <View className="flex-1">
            <Text className="text-xs uppercase tracking-widest text-foreground/50">{t('story.chapter')} {chapter.number}</Text>
            <Text className="mt-1 text-lg font-bold text-foreground" style={{ opacity: isUnlocked ? 1 : 0.45 }}>{locale === 'ar' ? chapter.titleAr : chapter.titleEn}</Text>
          </View>
          <Text className="text-lg">{isUnlocked ? (isExpanded ? '−' : '+') : '🔒'}</Text>
        </View>
        <Text className="mt-2 text-sm text-foreground/65">{isUnlocked ? t('story.unlocked') : `${t('story.locked')} · ${requiredStageLabel}`}</Text>
      </Pressable>

      {isUnlocked && isExpanded ? (
        <View className="border-t border-white/10 px-4 pb-4 pt-3">
          {chapter.cards.map((card, index) => (
            <View key={`${chapter.id}-${index}`} className="mb-3 rounded-2xl bg-white/5 p-4">
              <Text className="text-base leading-6 text-foreground">{locale === 'ar' ? card.textAr : card.textEn}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}
