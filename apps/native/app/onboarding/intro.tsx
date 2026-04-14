import { View, Text, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function IntroScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background gap-6 px-8">
      <Text className="text-3xl font-bold text-foreground">مرحباً بك في تحالل</Text>
      <Text className="text-center text-lg text-foreground/70">
        حوّل أفعالك الصديقة للبيئة إلى مدينة خضراء مزدهرة
      </Text>
      <Pressable
        onPress={() => router.push('/onboarding/profile')}
        className="mt-8 rounded-xl bg-primary px-8 py-4"
      >
        <Text className="text-lg font-semibold text-primary-foreground">التالي</Text>
      </Pressable>
    </View>
  );
}
