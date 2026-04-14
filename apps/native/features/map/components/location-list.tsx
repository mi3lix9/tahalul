import { FlatList, Text, View } from 'react-native';

import { LocationCard } from '@/features/map/components/location-card';
import { useI18n } from '@/providers/i18n-provider';
import type { MapLocation } from '@/types/domain';

type Props = {
  locations: MapLocation[];
  filter: string;
};

export function LocationList({ locations, filter }: Props) {
  const { locale, t } = useI18n();
  const filtered = filter === 'all' ? locations : locations.filter((location) => location.types.includes(filter));
  const filterLabel = filter === 'all' ? (locale === 'ar' ? 'الكل' : 'All') : t(`map.${filter}`);
  const resultLabel = locale === 'ar' ? `${filtered.length} نتيجة · ${filterLabel}` : `${filtered.length} results · ${filterLabel}`;

  return (
    <FlatList
      data={filtered}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ paddingBottom: 32 }}
      ListHeaderComponent={
        <View className="mb-4 rounded-2xl bg-white/5 px-4 py-3">
          <Text className="text-sm text-foreground/70">{resultLabel}</Text>
        </View>
      }
      renderItem={({ item }) => <LocationCard location={item} />}
    />
  );
}
