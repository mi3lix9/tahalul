import React, { createContext, useContext, useEffect, useState } from 'react';

type BootstrapState = {
  isReady: boolean;
  isOnboarded: boolean;
};

const BootstrapContext = createContext<BootstrapState>({
  isReady: false,
  isOnboarded: false,
});

export function useBootstrap() {
  return useContext(BootstrapContext);
}

export function AppBootstrapProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<BootstrapState>({
    isReady: false,
    isOnboarded: false,
  });

  useEffect(() => {
    // Will be expanded in Phase 1/2 to load AsyncStorage prefs + hydrate SQLite
    const bootstrap = async () => {
      // Simulate async init
      setState({ isReady: true, isOnboarded: false });
    };
    bootstrap();
  }, []);

  return <BootstrapContext.Provider value={state}>{children}</BootstrapContext.Provider>;
}
