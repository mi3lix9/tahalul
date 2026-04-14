import { Redirect } from 'expo-router';
import { LoadingScreen } from '@/components/loading-screen';
import { useBootstrap } from '@/providers/app-bootstrap-provider';

export default function RootRedirect() {
  const { isReady, isOnboarded } = useBootstrap();

  if (!isReady) {
    return <LoadingScreen />;
  }

  if (!isOnboarded) {
    return <Redirect href="/onboarding/language" />;
  }

  return <Redirect href="/(tabs)" />;
}
