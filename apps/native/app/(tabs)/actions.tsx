import { View, Text } from 'react-native';

export default function ActionsScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-2xl font-bold text-foreground">📸 سجّل عملك</Text>
      <Text className="mt-2 text-foreground/60">التقط صورة أو امسح QR</Text>
    </View>
  );
}
