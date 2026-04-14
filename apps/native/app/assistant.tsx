import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { AssistantChat } from '@/features/assistant/components/assistant-chat';
import { useI18n } from '@/providers/i18n-provider';

export default function AssistantScreen() {
  const { t } = useI18n();

  return (
    <AppScreen>
      <View className="flex-1">
        <View className="mb-4 flex-row items-center justify-between">
          <View>
            <Text className="text-2xl font-bold text-foreground">🤖 {t('assistant.title')}</Text>
            <Text className="mt-1 text-base text-foreground/60">{t('assistant.subtitle')}</Text>
          </View>
          <Pressable onPress={() => router.back()} className="self-start rounded-full bg-white/10 px-4 py-2">
            <Text className="font-medium text-foreground">{t('common.back')}</Text>
          </Pressable>
        </View>

        <AssistantChat />
      </View>
    </AppScreen>
  );
}
