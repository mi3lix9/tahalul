import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { APP_CONFIG } from '@/constants/app-config';

export async function requestNotificationPermission(): Promise<boolean> {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  return finalStatus === 'granted';
}

export async function scheduleDailyReminder(
  hour: number = APP_CONFIG.DAILY_REMINDER_HOUR,
  minute: number = APP_CONFIG.DAILY_REMINDER_MINUTE,
): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: APP_CONFIG.APP_NAME_AR,
      body: 'لا تنسَ تسجيل عملك البيئي اليوم! 🌱',
    },
    trigger: Platform.select({
      default: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
      android: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour,
        minute,
      },
    })!,
  });
}

export async function cancelAllReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
