import { View, Text } from 'react-native';

export default function ChallengesScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-foreground">🏆 التحديات</Text>
      <Text className="mt-2 text-foreground/60">تحديات يومية وأسبوعية</Text>
    </View>
  );
}
