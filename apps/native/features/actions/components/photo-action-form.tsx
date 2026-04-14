import { useEffect, useMemo, useState } from 'react';
import { Image, Linking, Pressable, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { APP_CONFIG } from '@/constants/app-config';
import { ACTION_OPTIONS } from '@/features/actions/data/action-definitions';
import { useI18n } from '@/providers/i18n-provider';
import type { ActionType } from '@/types/entities';

type Props = {
  onSubmit: (type: ActionType, photoUri: string) => void;
};

export function PhotoActionForm({ onSubmit }: Props) {
  const { locale, t } = useI18n();
  const [selectedType, setSelectedType] = useState<ActionType | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [confirming, setConfirming] = useState<boolean | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const options = useMemo(() => ACTION_OPTIONS.filter((option) => option.methods.includes('photo')), []);

  useEffect(() => {
    if (!isAnalyzing || !selectedType || !photoUri || !confirming) return;

    const timer = setTimeout(() => onSubmit(selectedType, photoUri), APP_CONFIG.AI_ANALYSIS_DELAY_MS);
    return () => clearTimeout(timer);
  }, [confirming, isAnalyzing, onSubmit, photoUri, selectedType]);

  const handleTakePhoto = async (type: ActionType) => {
    setSelectedType(type);
    setPermissionDenied(false);
    setConfirming(null);
    setPhotoUri(null);
    setIsAnalyzing(false);

    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      setPermissionDenied(true);
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      quality: 0.7,
    });

    if (result.canceled) return;

    setPhotoUri(result.assets[0]?.uri ?? null);
  };

  const confirmAction = (accepted: boolean) => {
    setConfirming(accepted);
    setIsAnalyzing(accepted);
  };

  return (
    <View className="mt-4 gap-3">
      <Text className="text-base font-semibold text-foreground">{t('actions.choosePhotoAction')}</Text>
      {options.map((option) => (
        <Pressable
          key={option.type}
          accessibilityLabel={locale === 'ar' ? option.labelAr : option.labelEn}
          className={`flex-row items-center rounded-2xl border px-4 py-4 ${selectedType === option.type ? 'border-emerald-500 bg-emerald-50' : 'border-border bg-card'}`}
          onPress={() => void handleTakePhoto(option.type)}
        >
          <Text className="mr-3 text-2xl">{option.icon}</Text>
          <Text className="flex-1 text-base font-medium text-foreground">
            {locale === 'ar' ? option.labelAr : option.labelEn}
          </Text>
        </Pressable>
      ))}

      {permissionDenied ? (
        <View className="rounded-2xl border border-border bg-card p-4">
          <Text className="text-sm text-destructive">{t('actions.cameraPermissionDenied')}</Text>
          <Pressable className="mt-3 items-center rounded-2xl bg-emerald-500 px-4 py-3" onPress={() => void Linking.openSettings()}>
            <Text className="font-semibold text-white">{t('actions.openSettings')}</Text>
          </Pressable>
        </View>
      ) : null}

      {photoUri ? (
        <View className="rounded-3xl border border-border bg-card p-4">
          <Image source={{ uri: photoUri }} className="h-56 w-full rounded-2xl" resizeMode="cover" />
          <Text className="mt-4 text-base font-semibold text-foreground">{t('actions.confirmRecyclingQuestion')}</Text>
          <View className="mt-4 flex-row gap-3">
            <Pressable className="flex-1 items-center rounded-2xl bg-emerald-500 px-4 py-3" onPress={() => confirmAction(true)}>
              <Text className="font-semibold text-white">{t('actions.yes')}</Text>
            </Pressable>
            <Pressable className="flex-1 items-center rounded-2xl border border-border bg-background px-4 py-3" onPress={() => confirmAction(false)}>
              <Text className="font-semibold text-foreground">{t('actions.no')}</Text>
            </Pressable>
          </View>
          {confirming === false ? <Text className="mt-3 text-sm text-foreground/60">{t('actions.retakePhoto')}</Text> : null}
          {isAnalyzing ? (
            <View className="mt-4 gap-3">
              <Text className="text-sm font-medium text-foreground">{t('actions.aiAnalyzing')}</Text>
              <View className="h-4 w-3/4 rounded-full bg-emerald-100" />
              <View className="h-4 w-full rounded-full bg-emerald-50" />
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}
