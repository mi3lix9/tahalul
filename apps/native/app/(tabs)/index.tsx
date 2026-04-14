import { ScrollView } from 'react-native';

import { AppScreen } from '@/components/app-screen';
import { BadgeStrip } from '@/features/profile/components/badge-strip';
import { CityGrid } from '@/features/city/components/city-grid';
import { CityStageHeader } from '@/features/city/components/city-stage-header';
import { CitySummaryCard } from '@/features/city/components/city-summary-card';

export default function HomeScreen() {
  return (
    <AppScreen className="bg-background">
      <ScrollView className="flex-1" contentContainerClassName="pb-6">
        <CityStageHeader />
        <CityGrid />
        <CitySummaryCard />
        <BadgeStrip />
      </ScrollView>
    </AppScreen>
  );
}
