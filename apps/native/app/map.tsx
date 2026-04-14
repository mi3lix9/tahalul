import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { LocationList } from '@/features/map/components/location-list';
import { MAP_LOCATIONS } from '@/features/map/data/locations';
import { useI18n } from '@/providers/i18n-provider';

export default function MapScreen() {
  const { locale, t } = useI18n();
  const [filter, setFilter] = useState('all');
  const filters = ['all', 'plastic', 'paper', 'glass', 'electronics', 'organic'];

  return (
    <AppScreen>
      <View className="flex-1">
        <View className="mb-4 flex-row items-center justify-between">
          <SectionHeader title={t('map.title')} subtitle={t('map.filter')} />
          <Pressable onPress={() => router.back()} className="self-start rounded-full bg-white/10 px-4 py-2">
            <Text className="font-medium text-foreground">{t('common.back')}</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4 max-h-12" contentContainerStyle={{ gap: 8, paddingRight: 12 }}>
          {filters.map((item) => (
            <Pressable
              key={item}
              className="rounded-full px-4 py-2"
              onPress={() => setFilter(item)}
              style={{ backgroundColor: filter === item ? 'rgba(16,185,129,0.18)' : 'rgba(255,255,255,0.06)' }}
            >
              <Text className="font-medium text-foreground">{item === 'all' ? (locale === 'ar' ? 'الكل' : 'All') : t(`map.${item}`)}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <LocationList locations={MAP_LOCATIONS} filter={filter} />
      </View>
    </AppScreen>
  );
}
