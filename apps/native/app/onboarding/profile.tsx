import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';

import { setOnboardingComplete, setUserName } from '@/lib/storage/preferences';
import { useBootstrap } from '@/providers/app-bootstrap-provider';
import { useI18n } from '@/providers/i18n-provider';

export default function ProfileSetupScreen() {
  const { t } = useI18n();
  const { setOnboarded } = useBootstrap();
  const [name, setName] = useState('');

  const handleStart = async () => {
    if (name.trim()) {
      await setUserName(name.trim());
    }
    await setOnboardingComplete(true);
    setOnboarded(true);
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1 items-center justify-center bg-background gap-6 px-8">
      <Text className="text-3xl font-bold text-foreground">{t('onboarding.whatsYourName')}</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={t('onboarding.enterName')}
        placeholderTextColor="#888"
        className="w-full rounded-xl border border-default-300 bg-default-100 px-4 py-3 text-center text-lg text-foreground"
      />
      <Pressable onPress={handleStart} className="mt-8 rounded-xl bg-primary px-8 py-4">
        <Text className="text-lg font-semibold text-primary-foreground">{t('common.start')}</Text>
      </Pressable>
    </View>
  );
}
