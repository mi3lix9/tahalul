import { I18n } from 'i18n-js';

import { ar } from './translations/ar';
import { en } from './translations/en';

export const i18n = new I18n({ ar, en });

i18n.defaultLocale = 'ar';
i18n.locale = 'ar';
i18n.enableFallback = true;

export type TranslationKeys = typeof ar;

export function setLocale(locale: 'ar' | 'en') {
  i18n.locale = locale;
}

export function getLocale(): 'ar' | 'en' {
  return i18n.locale as 'ar' | 'en';
}

export function t(scope: string, options?: Record<string, unknown>): string {
  return i18n.t(scope, options);
}

export function isRTL(): boolean {
  return i18n.locale === 'ar';
}
