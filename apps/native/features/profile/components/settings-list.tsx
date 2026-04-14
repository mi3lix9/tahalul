import { useEffect, useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

import { ThemeToggle } from '@/components/theme-toggle';
import { isReminderEnabled, setReminderEnabled } from '@/lib/storage/preferences';
import { useI18n } from '@/providers/i18n-provider';

function Row({ label, value, children, onPress }: { label: string; value?: string; children?: React.ReactNode; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-between rounded-2xl border border-white/10 bg-card px-4 py-4">
      <Text className="text-base font-medium text-foreground">{label}</Text>
      {children ?? <Text className="text-sm text-foreground/60">{value}</Text>}
    </Pressable>
  );
}

export function SettingsList() {
  const { locale, setLanguage, t } = useI18n();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    void isReminderEnabled().then(setNotificationsEnabled);
  }, []);

  const toggleLanguage = async () => {
    await setLanguage(locale === 'ar' ? 'en' : 'ar');
  };

  const toggleNotifications = async (value: boolean) => {
    setNotificationsEnabled(value);
    await setReminderEnabled(value);
  };

  return (
    <View className="mb-6 gap-3">
      <Text className="text-lg font-bold text-foreground">{t('profile.settings')}</Text>
      <Row label={t('profile.language')} value={locale.toUpperCase()} onPress={() => void toggleLanguage()} />
      <Row label={t('profile.theme')}>
        <ThemeToggle />
      </Row>
      <Row label={t('profile.notifications')}>
        <Switch value={notificationsEnabled} onValueChange={(value) => void toggleNotifications(value)} />
      </Row>
    </View>
  );
}
