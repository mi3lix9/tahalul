import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-background gap-4">
      <Text className="text-xl font-bold text-foreground">الصفحة غير موجودة</Text>
      <Link href="/" className="text-primary">
        <Text className="text-primary">العودة للرئيسية</Text>
      </Link>
    </View>
  );
}
