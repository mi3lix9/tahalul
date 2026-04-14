import { Pressable, Text, View } from 'react-native';

import { ACTION_OPTIONS } from '@/features/actions/data/action-definitions';
import { useI18n } from '@/providers/i18n-provider';
import type { ActionType } from '@/types/entities';

type Props = {
  onSubmit: (type: ActionType) => void;
};

export function ManualActionForm({ onSubmit }: Props) {
  const { locale, t } = useI18n();
  const options = ACTION_OPTIONS.filter((option) => option.methods.includes('manual'));

  return (
    <View className="mt-4 gap-3">
      <Text className="text-base font-semibold text-foreground">{t('actions.chooseManualAction')}</Text>
      {options.map((option) => (
        <Pressable
          key={option.type}
          className="flex-row items-center rounded-2xl border border-border bg-card px-4 py-4"
          onPress={() => onSubmit(option.type)}
        >
          <Text className="mr-3 text-2xl">{option.icon}</Text>
          <Text className="flex-1 text-base font-medium text-foreground">
            {locale === 'ar' ? option.labelAr : option.labelEn}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
