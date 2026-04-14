import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  LANGUAGE: 'tahalul:language',
  ONBOARDING_COMPLETE: 'tahalul:onboardingComplete',
  USER_NAME: 'tahalul:userName',
  REMINDER_ENABLED: 'tahalul:reminderEnabled',
  LAST_DAILY_REFRESH: 'tahalul:lastDailyRefresh',
} as const;

export async function getLanguage(): Promise<'ar' | 'en' | null> {
  const val = await AsyncStorage.getItem(KEYS.LANGUAGE);
  return val as 'ar' | 'en' | null;
}

export async function setLanguage(lang: 'ar' | 'en'): Promise<void> {
  await AsyncStorage.setItem(KEYS.LANGUAGE, lang);
}

export async function isOnboardingComplete(): Promise<boolean> {
  const val = await AsyncStorage.getItem(KEYS.ONBOARDING_COMPLETE);
  return val === 'true';
}

export async function setOnboardingComplete(complete: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.ONBOARDING_COMPLETE, String(complete));
}

export async function getUserName(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.USER_NAME);
}

export async function setUserName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.USER_NAME, name);
}

export async function isReminderEnabled(): Promise<boolean> {
  const val = await AsyncStorage.getItem(KEYS.REMINDER_ENABLED);
  return val === 'true';
}

export async function setReminderEnabled(enabled: boolean): Promise<void> {
  await AsyncStorage.setItem(KEYS.REMINDER_ENABLED, String(enabled));
}

export async function getLastDailyRefresh(): Promise<string | null> {
  return AsyncStorage.getItem(KEYS.LAST_DAILY_REFRESH);
}

export async function setLastDailyRefresh(dateKey: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.LAST_DAILY_REFRESH, dateKey);
}
