import { ScrollView } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { BadgeStrip } from '@/features/profile/components/badge-strip';
import { ProfileHeader } from '@/features/profile/components/profile-header';
import { SettingsList } from '@/features/profile/components/settings-list';
import { StreakCard } from '@/features/profile/components/streak-card';

export default function ProfileScreen() {
  return (
    <AppScreen>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName="pb-8">
        <ProfileHeader />
        <StreakCard />
        <BadgeStrip />
        <SettingsList />
      </ScrollView>
    </AppScreen>
  );
}
