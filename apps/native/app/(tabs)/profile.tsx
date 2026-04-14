import { View, Text } from 'react-native';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-foreground">👤 الملف الشخصي</Text>
      <Text className="mt-2 text-foreground/60">مستواك وإنجازاتك</Text>
      <View className="mt-4">
        <ThemeToggle />
      </View>
    </View>
  );
}
