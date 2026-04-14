import * as Linking from 'expo-linking';
import { Alert, Pressable, Text, View } from 'react-native';

import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';
import type { MapLocation } from '@/types/domain';

const TYPE_COLORS: Record<string, string> = {
  plastic: 'rgba(16,185,129,0.16)',
  paper: 'rgba(59,130,246,0.16)',
  glass: 'rgba(168,85,247,0.16)',
  electronics: 'rgba(245,158,11,0.16)',
  organic: 'rgba(132,204,22,0.16)',
  metal: 'rgba(148,163,184,0.16)',
};

export function LocationCard({ location }: { location: MapLocation }) {
  const { locale, t } = useI18n();
  const { logAction } = useAppStore();
  const title = locale === 'ar' ? location.nameAr : location.nameEn;
  const hours = locale === 'ar' ? location.hoursAr : location.hoursEn;

  const openDirections = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    await Linking.openURL(url);
  };

  const handleCheckIn = () => {
    logAction({ type: 'checkin', verificationMethod: 'qr', locationId: location.id });
    Alert.alert('✓', title);
  };

  return (
    <View className="mb-3 rounded-3xl border border-white/10 bg-card p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1">
          <Text className="text-lg font-bold text-foreground">{title}</Text>
          <Text className="mt-1 text-sm text-foreground/60">{location.city}</Text>
        </View>
        <Text className="text-sm text-amber-400">{'★'.repeat(Math.round(location.rating))}</Text>
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {location.types.map((type) => (
          <View key={type} className="rounded-full px-3 py-1" style={{ backgroundColor: TYPE_COLORS[type] ?? 'rgba(148,163,184,0.16)' }}>
            <Text className="text-xs font-medium text-foreground">{t(`map.${type}`)}</Text>
          </View>
        ))}
      </View>

      <View className="mt-4 flex-row items-center justify-between">
        <Text className="text-sm text-foreground/70">🕒 {hours}</Text>
        <Text className="text-sm text-foreground/70">{location.rating.toFixed(1)} · {location.reviewCount} {t('map.reviews')}</Text>
      </View>

      <View className="mt-4 flex-row gap-3">
        <Pressable className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3" onPress={openDirections}>
          <Text className="text-center font-semibold text-foreground">{t('map.directions')}</Text>
        </Pressable>
        <Pressable className="flex-1 rounded-2xl bg-emerald-500 px-4 py-3" onPress={handleCheckIn}>
          <Text className="text-center font-semibold text-white">{t('map.checkin')}</Text>
        </Pressable>
      </View>
    </View>
  );
}
