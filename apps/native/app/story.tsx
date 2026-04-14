import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { StoryChapterList } from '@/features/story/components/story-chapter-list';
import { STORY_CHAPTERS } from '@/features/story/data/story-chapters';
import { getCityStage } from '@/lib/domain/city';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';

export default function StoryScreen() {
  const { t } = useI18n();
  const { user } = useAppStore();
  const currentStage = getCityStage(user.ecoPoints);

  return (
    <AppScreen>
      <View className="flex-1">
        <View className="mb-4 flex-row items-center justify-between">
          <SectionHeader title={t('story.title')} subtitle={t(`city.${currentStage}`)} />
          <Pressable onPress={() => router.back()} className="self-start rounded-full bg-white/10 px-4 py-2">
            <Text className="font-medium text-foreground">{t('common.back')}</Text>
          </Pressable>
        </View>

        <StoryChapterList chapters={STORY_CHAPTERS} currentStage={currentStage} />
      </View>
    </AppScreen>
  );
}
