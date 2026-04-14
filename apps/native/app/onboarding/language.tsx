import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function LanguageScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background gap-6">
      <Text className="text-3xl font-bold text-foreground">اختر اللغة</Text>
      <Pressable
        onPress={() => router.push('/onboarding/intro')}
        className="rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-lg font-semibold text-primary-foreground">العربية</Text>
      </Pressable>
      <Pressable
        onPress={() => router.push('/onboarding/intro')}
        className="rounded-xl bg-default-200 px-8 py-4"
      >
        <Text className="text-lg font-semibold text-foreground">English</Text>
      </Pressable>
    </View>
  );
}
