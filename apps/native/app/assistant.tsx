import { Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { useI18n } from '@/providers/i18n-provider';

export default function AssistantScreen() {
  const { t } = useI18n();

  return (
    <AppScreen>
      <View className="flex-1 items-center justify-center">
        <Text className="text-2xl font-bold text-foreground">🤖 {t('assistant.title')}</Text>
      </View>
    </AppScreen>
  );
}
