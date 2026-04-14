import { Text, View } from 'react-native';

type Props = {
  icon: string;
  title: string;
  subtitle?: string;
};

export function EmptyState({ icon, title, subtitle }: Props) {
  return (
    <View className="items-center justify-center rounded-3xl border border-dashed border-white/10 bg-card px-6 py-10">
      <Text className="text-4xl opacity-70">{icon}</Text>
      <Text className="mt-4 text-center text-lg font-semibold text-foreground">{title}</Text>
      {subtitle ? <Text className="mt-2 text-center text-sm text-foreground/60">{subtitle}</Text> : null}
    </View>
  );
}
