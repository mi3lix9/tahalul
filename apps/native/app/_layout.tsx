import '@/global.css';
import { Stack } from 'expo-router';
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { AppThemeProvider } from '@/contexts/app-theme-context';
import { AppBootstrapProvider } from '@/providers/app-bootstrap-provider';
import { I18nProvider } from '@/providers/i18n-provider';

export const unstable_settings = {
  initialRouteName: 'index',
};

function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="onboarding/language" />
      <Stack.Screen name="onboarding/intro" />
      <Stack.Screen name="onboarding/profile" />
      <Stack.Screen name="map" options={{ presentation: 'modal' }} />
      <Stack.Screen name="shop" options={{ presentation: 'modal' }} />
      <Stack.Screen name="story" options={{ presentation: 'modal' }} />
      <Stack.Screen name="assistant" options={{ presentation: 'modal' }} />
      <Stack.Screen name="badge/[id]" options={{ presentation: 'modal' }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <KeyboardProvider>
        <I18nProvider>
          <AppThemeProvider>
            <HeroUINativeProvider>
              <AppBootstrapProvider>
                <StackLayout />
              </AppBootstrapProvider>
            </HeroUINativeProvider>
          </AppThemeProvider>
        </I18nProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}
