import { useEffect, useMemo, useRef } from 'react';
import { Pressable, Text } from 'react-native';
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';

import { useI18n } from '@/providers/i18n-provider';
import type { VerificationMethod } from '@/types/entities';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelectMethod: (method: VerificationMethod) => void;
};

const OPTIONS: Array<{ method: VerificationMethod; icon: string; key: string }> = [
  { method: 'photo', icon: '📸', key: 'actions.photo' },
  { method: 'qr', icon: '🔳', key: 'actions.qr' },
  { method: 'manual', icon: '✍️', key: 'actions.manual' },
];

export function ActionMethodSheet({ isOpen, onClose, onSelectMethod }: Props) {
  const { t } = useI18n();
  const ref = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['40%'], []);

  useEffect(() => {
    if (isOpen) {
      ref.current?.snapToIndex(0);
    } else {
      ref.current?.close();
    }
  }, [isOpen]);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />}
    >
      <BottomSheetView className="flex-1 gap-3 px-4 py-2">
        {OPTIONS.map((option) => (
          <Pressable
            key={option.method}
            accessibilityLabel={t(option.key)}
            className="flex-row items-center rounded-2xl border border-border bg-card px-4 py-4"
            onPress={() => {
              onSelectMethod(option.method);
              onClose();
            }}
          >
            <Text className="mr-3 text-2xl">{option.icon}</Text>
            <Text className="text-base font-medium text-foreground">{t(option.key)}</Text>
          </Pressable>
        ))}
      </BottomSheetView>
    </BottomSheet>
  );
}
