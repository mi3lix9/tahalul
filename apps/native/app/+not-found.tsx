import { Link } from 'expo-router';
import { View, Text } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';

export default function NotFoundScreen() {
  const { t } = useI18n();

  return (
    <View className="flex-1 items-center justify-center bg-background gap-4">
      <Text className="text-xl font-bold text-foreground">{t('notFound.title')}</Text>
      <Link href="/">
        <Text className="text-primary">{t('notFound.goHome')}</Text>
      </Link>
    </View>
  );
}
