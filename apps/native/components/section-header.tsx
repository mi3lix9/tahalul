import { Text, View } from 'react-native';

type Props = {
  title: string;
  subtitle?: string;
};

export function SectionHeader({ title, subtitle }: Props) {
  return (
    <View className="mb-4">
      <Text className="text-2xl font-bold text-foreground">{title}</Text>
      {subtitle && <Text className="mt-1 text-base text-foreground/60">{subtitle}</Text>}
    </View>
  );
}
