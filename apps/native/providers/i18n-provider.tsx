import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { I18nManager } from 'react-native';

import { i18n, setLocale } from '@/lib/i18n';
import { getLanguage, setLanguage as persistLanguage } from '@/lib/storage/preferences';

type I18nContextType = {
  locale: 'ar' | 'en';
  isRtl: boolean;
  setLanguage: (lang: 'ar' | 'en') => Promise<void>;
  t: (scope: string, options?: Record<string, unknown>) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<'ar' | 'en'>('ar');
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const saved = await getLanguage();
      const lang = saved ?? 'ar';
      setLocale(lang);
      setLocaleState(lang);

      const shouldBeRTL = lang === 'ar';
      if (I18nManager.isRTL !== shouldBeRTL) {
        I18nManager.allowRTL(shouldBeRTL);
        I18nManager.forceRTL(shouldBeRTL);
      }

      setIsReady(true);
    };
    init();
  }, []);

  const setLanguage = useCallback(async (lang: 'ar' | 'en') => {
    setLocale(lang);
    setLocaleState(lang);
    await persistLanguage(lang);

    const shouldBeRTL = lang === 'ar';
    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(shouldBeRTL);
      I18nManager.forceRTL(shouldBeRTL);
      // RTL change takes effect on next app restart
    }
  }, []);

  const t = useCallback((scope: string, options?: Record<string, unknown>) => {
    return i18n.t(scope, options);
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!isReady) return null;

  return (
    <I18nContext.Provider value={{ locale, isRtl: locale === 'ar', setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}
