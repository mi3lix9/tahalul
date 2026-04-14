import { View, Text } from 'react-native';

export default function ImpactScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-foreground">📊 أثرك البيئي</Text>
      <Text className="mt-2 text-foreground/60">تتبع تأثيرك الإيجابي</Text>
    </View>
  );
}
