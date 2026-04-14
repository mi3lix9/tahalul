import React, { createContext, useContext, useEffect, useState } from 'react';

import { isOnboardingComplete } from '@/lib/storage/preferences';

type BootstrapState = {
  isReady: boolean;
  isOnboarded: boolean;
  setOnboarded: (val: boolean) => void;
};

const BootstrapContext = createContext<BootstrapState>({
  isReady: false,
  isOnboarded: false,
  setOnboarded: () => {},
});

export function useBootstrap() {
  return useContext(BootstrapContext);
}

export function AppBootstrapProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      const onboarded = await isOnboardingComplete();
      setIsOnboarded(onboarded);
      setIsReady(true);
    };
    bootstrap();
  }, []);

  const setOnboarded = (val: boolean) => {
    setIsOnboarded(val);
  };

  return (
    <BootstrapContext.Provider value={{ isReady, isOnboarded, setOnboarded }}>
      {children}
    </BootstrapContext.Provider>
  );
}
