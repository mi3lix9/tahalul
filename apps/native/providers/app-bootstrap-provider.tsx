import React, { createContext, useContext, useEffect, useState } from 'react';

import { LoadingScreen } from '@/components/loading-screen';
import { getAllActions } from '@/lib/db/repositories/actions-repository';
import { getAllBadgeUnlocks } from '@/lib/db/repositories/badges-repository';
import { getAllCityTiles, initCityTiles } from '@/lib/db/repositories/city-repository';
import { getAllChallenges } from '@/lib/db/repositories/challenges-repository';
import { getAllRedemptions } from '@/lib/db/repositories/rewards-repository';
import { getUserProfile } from '@/lib/db/repositories/user-repository';
import { isOnboardingComplete } from '@/lib/storage/preferences';
import { useAppStore } from '@/stores/app-store';

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
      await initCityTiles();
      const [user, actions, cityTiles, badges, redemptions, challenges, onboarded] = await Promise.all([
        getUserProfile(),
        getAllActions(),
        getAllCityTiles(),
        getAllBadgeUnlocks(),
        getAllRedemptions(),
        getAllChallenges(),
        isOnboardingComplete(),
      ]);

      useAppStore.getState().hydrate({
        ...(user ? { user } : {}),
        actions,
        cityTiles,
        badges,
        redemptions,
        challenges,
      });

      setIsOnboarded(onboarded);
      setIsReady(true);
    };
    bootstrap();
  }, []);

  const setOnboarded = (val: boolean) => {
    setIsOnboarded(val);
  };

  return <BootstrapContext.Provider value={{ isReady, isOnboarded, setOnboarded }}>{isReady ? children : <LoadingScreen />}</BootstrapContext.Provider>;
}
