import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export function AppScreen({ children, className = '' }: Props) {
  return (
    <SafeAreaView className={`flex-1 bg-background ${className}`} edges={['top']}>
      <View className="flex-1 px-4">{children}</View>
    </SafeAreaView>
  );
}
