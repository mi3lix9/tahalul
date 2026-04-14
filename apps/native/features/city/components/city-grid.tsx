import { View } from 'react-native';

import { STAGE_THEMES } from '@/constants/stage-theme';
import { CityTile } from '@/features/city/components/city-tile';
import { getCityStage } from '@/lib/domain/city';
import { useAppStore } from '@/stores/app-store';

export function CityGrid() {
  const { cityTiles, user } = useAppStore();
  const stageTheme = STAGE_THEMES[getCityStage(user.ecoPoints)];
  const sortedTiles = [...cityTiles].sort((a, b) => a.y - b.y || a.x - b.x);

  return (
    <View className="relative overflow-hidden rounded-3xl border border-white/10 p-3" style={{ backgroundColor: stageTheme.gridBg }}>
      <View className="flex-row flex-wrap justify-between">
        {sortedTiles.map((tile) => (
          <CityTile key={`${tile.x}-${tile.y}`} tile={tile} stageTheme={stageTheme} />
        ))}
      </View>

      <View pointerEvents="none" className="absolute inset-0 rounded-3xl bg-neutral-200" style={{ opacity: stageTheme.smogOpacity }} />
    </View>
  );
}
