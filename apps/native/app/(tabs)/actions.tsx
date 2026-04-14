import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { SectionHeader } from '@/components/section-header';
import { ManualActionForm } from '@/features/actions/components/manual-action-form';
import { PhotoActionForm } from '@/features/actions/components/photo-action-form';
import { QRScannerView } from '@/features/actions/components/qr-scanner-view';
import { VerificationStatusCard } from '@/features/actions/components/verification-status-card';
import { normalizeAction } from '@/features/actions/domain/normalize-action';
import { hapticSuccess } from '@/lib/haptics';
import { useI18n } from '@/providers/i18n-provider';
import { useAppStore } from '@/stores/app-store';
import type { ActionResult } from '@/types/domain';
import type { ActionType, VerificationMethod } from '@/types/entities';

const METHOD_CARDS: Array<{ method: VerificationMethod; icon: string; titleKey: string }> = [
  { method: 'photo', icon: '📸', titleKey: 'actions.photo' },
  { method: 'qr', icon: '🔳', titleKey: 'actions.qr' },
  { method: 'manual', icon: '✍️', titleKey: 'actions.manual' },
];

export default function ActionsScreen() {
  const { t } = useI18n();
  const logAction = useAppStore((state) => state.logAction);
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(null);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerified = (type: ActionType, method: VerificationMethod, extras?: { photoUri?: string; qrCode?: string; locationId?: string }) => {
    setIsVerifying(true);
    const actionResult = logAction(normalizeAction(type, method, extras));
    hapticSuccess();
    setResult(actionResult);
  };

  const handleDone = () => {
    setIsVerifying(false);
    setResult(null);
    setSelectedMethod(null);
  };

  return (
    <AppScreen>
      <ScrollView className="flex-1" contentContainerClassName="pb-8">
        <SectionHeader title={t('actions.title')} subtitle={t('actions.subtitle')} />

        {!selectedMethod ? (
          <View className="gap-3">
            {METHOD_CARDS.map((card) => (
              <Pressable
                key={card.method}
                className="rounded-3xl border border-border bg-card p-5"
                onPress={() => setSelectedMethod(card.method)}
              >
                <Text className="text-3xl">{card.icon}</Text>
                <Text className="mt-3 text-lg font-semibold text-foreground">{t(card.titleKey)}</Text>
              </Pressable>
            ))}
          </View>
        ) : null}

        {selectedMethod && !result ? (
          <Pressable className="mb-4 self-start rounded-full border border-border px-4 py-2" onPress={handleDone}>
            <Text className="font-medium text-foreground">{t('common.back')}</Text>
          </Pressable>
        ) : null}

        {selectedMethod === 'manual' ? <ManualActionForm onSubmit={(type) => handleVerified(type, 'manual')} /> : null}
        {selectedMethod === 'photo' ? <PhotoActionForm onSubmit={(type, photoUri) => handleVerified(type, 'photo', { photoUri })} /> : null}
        {selectedMethod === 'qr' ? <QRScannerView onSubmit={(type, qrCode, locationId) => handleVerified(type, 'qr', { qrCode, locationId })} /> : null}

        <VerificationStatusCard isVerifying={isVerifying} result={result} onDone={handleDone} />
      </ScrollView>
    </AppScreen>
  );
}
