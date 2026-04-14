import Animated, { ZoomIn } from 'react-native-reanimated';
import { Text, View } from 'react-native';

import type { StageTheme } from '@/constants/stage-theme';
import { BUILDING_DEFS } from '@/features/city/data/buildings';
import type { CityTile as CityTileType } from '@/types/entities';

type Props = {
  tile: CityTileType;
  stageTheme: StageTheme;
};

export function CityTile({ tile, stageTheme }: Props) {
  if (tile.buildingType === 'empty') {
    return (
      <View className="m-1 aspect-square w-[15%] items-center justify-center rounded-2xl border border-white/5" style={{ backgroundColor: stageTheme.emptyTileColor }}>
        <View className="h-2 w-2 rounded-full" style={{ backgroundColor: stageTheme.textColor, opacity: 0.3 }} />
      </View>
    );
  }

  const building = BUILDING_DEFS[tile.buildingType];

  return (
    <Animated.View entering={ZoomIn.springify().damping(14)} className="m-1 aspect-square w-[15%] items-center justify-center rounded-2xl border border-white/10" style={{ backgroundColor: building.color }}>
      <Text className="text-2xl">{building.icon}</Text>
    </Animated.View>
  );
}
