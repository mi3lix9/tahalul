import { useEffect, useState } from 'react';
import { Linking, Pressable, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

import { parseQRCode } from '@/features/actions/domain/qr-parser';
import { useI18n } from '@/providers/i18n-provider';

type Props = {
  onSubmit: (type: 'checkin', qrCode: string, locationId: string) => void;
};

export function QRScannerView({ onSubmit }: Props) {
  const { t } = useI18n();
  const [permission, requestPermission] = useCameraPermissions();
  const [error, setError] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);

  useEffect(() => {
    if (!permission) {
      void requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission || permission.status === 'undetermined') {
    return <Text className="mt-4 text-sm text-foreground/60">{t('common.loading')}</Text>;
  }

  if (!permission.granted) {
    return (
      <View className="mt-4 rounded-3xl border border-border bg-card p-5">
        <Text className="text-base font-semibold text-foreground">{t('actions.cameraPermissionDenied')}</Text>
        <Pressable className="mt-4 items-center rounded-2xl bg-emerald-500 px-4 py-3" onPress={() => void Linking.openSettings()}>
          <Text className="font-semibold text-white">{t('actions.openSettings')}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="mt-4 overflow-hidden rounded-3xl border border-border bg-card">
      <CameraView
        style={{ height: 360 }}
        facing="back"
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={hasScanned ? undefined : ({ data }) => {
          const parsed = parseQRCode(data);
          if (!parsed.valid || !parsed.locationId) {
            setError(t('actions.invalidQr'));
            setHasScanned(true);
            setTimeout(() => setHasScanned(false), 1500);
            return;
          }

          setError(null);
          setHasScanned(true);
          onSubmit('checkin', data, parsed.locationId);
        }}
      />
      <View className="p-4">
        <Text className="text-sm text-foreground/70">{t('actions.qrHelp')}</Text>
        {error ? <Text className="mt-2 text-sm text-destructive">{error}</Text> : null}
      </View>
    </View>
  );
}
