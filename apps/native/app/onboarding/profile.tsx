import { View, Text, TextInput, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function ProfileSetupScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background gap-6 px-8">
      <Text className="text-3xl font-bold text-foreground">ما اسمك؟</Text>
      <TextInput
        placeholder="أدخل اسمك"
        placeholderTextColor="#888"
        className="w-full rounded-xl border border-default-300 bg-default-100 px-4 py-3 text-center text-lg text-foreground"
      />
      <Pressable
        onPress={() => router.replace('/(tabs)')}
        className="mt-8 rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-lg font-semibold text-primary-foreground">ابدأ</Text>
      </Pressable>
    </View>
  );
}
