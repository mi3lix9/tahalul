import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

import { useI18n } from '@/providers/i18n-provider';

export default function LanguageScreen() {
  const { setLanguage, t } = useI18n();

  const handleLanguage = async (lang: 'ar' | 'en') => {
    await setLanguage(lang);
    router.push('/onboarding/intro');
  };

  return (
    <View className="flex-1 items-center justify-center bg-background gap-6">
      <Text className="text-3xl font-bold text-foreground">{t('onboarding.chooseLanguage')}</Text>
      <Pressable
        onPress={() => handleLanguage('ar')}
        className="rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-lg font-semibold text-primary-foreground">العربية</Text>
      </Pressable>
      <Pressable
        onPress={() => handleLanguage('en')}
        className="rounded-xl bg-default-200 px-8 py-4"
      >
        <Text className="text-lg font-semibold text-foreground">English</Text>
      </Pressable>
    </View>
  );
}
