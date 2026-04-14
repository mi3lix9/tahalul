import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { APP_CONFIG } from '@/constants/app-config';
import { requestNotificationPermission, scheduleDailyReminder } from '@/lib/notifications/reminders';
import { isReminderEnabled } from '@/lib/storage/preferences';

export function NotificationProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      const remindersEnabled = await isReminderEnabled();
      if (!remindersEnabled) return;

      const granted = await requestNotificationPermission();
      if (!granted) return;

      await scheduleDailyReminder(APP_CONFIG.DAILY_REMINDER_HOUR, APP_CONFIG.DAILY_REMINDER_MINUTE);
    };

    void init();
  }, []);

  return <>{children}</>;
}
