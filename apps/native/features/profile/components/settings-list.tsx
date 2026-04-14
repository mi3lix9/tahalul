import { useEffect, useState } from 'react';
import { Pressable, Switch, Text, View } from 'react-native';

import { ThemeToggle } from '@/components/theme-toggle';
import { APP_CONFIG } from '@/constants/app-config';
import { cancelAllReminders, requestNotificationPermission, scheduleDailyReminder } from '@/lib/notifications/reminders';
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
    if (!value) {
      setNotificationsEnabled(false);
      await setReminderEnabled(false);
      await cancelAllReminders();
      return;
    }

    const granted = await requestNotificationPermission();
    if (!granted) {
      setNotificationsEnabled(false);
      await setReminderEnabled(false);
      return;
    }

    setNotificationsEnabled(true);
    await setReminderEnabled(true);
    await scheduleDailyReminder(APP_CONFIG.DAILY_REMINDER_HOUR, APP_CONFIG.DAILY_REMINDER_MINUTE);
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
