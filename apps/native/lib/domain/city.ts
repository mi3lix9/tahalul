import type { CityStage, BuildingType, CityTile } from '@/types/entities';

export const GRID_SIZE = 6;

export const STAGE_THRESHOLDS: { stage: CityStage; minPoints: number }[] = [
  { stage: 'wasteland', minPoints: 0 },
  { stage: 'recovering', minPoints: 100 },
  { stage: 'neutral', minPoints: 500 },
  { stage: 'green', minPoints: 1500 },
  { stage: 'utopia', minPoints: 5000 },
];

export function getCityStage(totalEcoPoints: number): CityStage {
  let stage: CityStage = 'wasteland';
  for (const t of STAGE_THRESHOLDS) {
    if (totalEcoPoints >= t.minPoints) {
      stage = t.stage;
    }
  }
  return stage;
}

export function getPollutionPercent(totalEcoPoints: number): number {
  const maxPoints = 5000;
  const pct = Math.max(0, 100 - (totalEcoPoints / maxPoints) * 100);
  return Math.round(pct);
}

const BUILD_ORDER: BuildingType[] = [
  'tree', 'house', 'tree', 'garden', 'tree', 'school',
  'tree', 'house', 'park', 'tree', 'solar', 'house',
  'tree', 'wind', 'tree', 'house', 'garden', 'tree',
  'school', 'tree', 'house', 'park', 'solar', 'tree',
  'house', 'tree', 'wind', 'garden', 'tree', 'house',
  'tree', 'park', 'house', 'tree', 'solar', 'tree',
];

const PLACEMENT_ORDER: [number, number][] = [];
{
  const visited = new Set<string>();
  const cx = Math.floor(GRID_SIZE / 2);
  const cy = Math.floor(GRID_SIZE / 2);
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  let x = cx;
  let y = cy;
  let dir = 0;
  let steps = 1;
  let stepCount = 0;
  let turnCount = 0;

  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    if (x >= 0 && x < GRID_SIZE && y >= 0 && y < GRID_SIZE && !visited.has(`${x},${y}`)) {
      PLACEMENT_ORDER.push([x, y]);
      visited.add(`${x},${y}`);
    }
    x += dirs[dir]![0]!;
    y += dirs[dir]![1]!;
    stepCount++;
    if (stepCount === steps) {
      stepCount = 0;
      turnCount++;
      dir = (dir + 1) % 4;
      if (turnCount % 2 === 0) steps++;
    }
  }

  for (let xi = 0; xi < GRID_SIZE; xi++) {
    for (let yi = 0; yi < GRID_SIZE; yi++) {
      if (!visited.has(`${xi},${yi}`)) {
        PLACEMENT_ORDER.push([xi, yi]);
      }
    }
  }
}

export function getNextBuildSlot(builtCount: number): { x: number; y: number; type: BuildingType } | null {
  if (builtCount >= GRID_SIZE * GRID_SIZE) return null;
  const [x, y] = PLACEMENT_ORDER[builtCount]!;
  const type = BUILD_ORDER[builtCount % BUILD_ORDER.length]!;
  return { x, y, type };
}

export function initEmptyGrid(): CityTile[] {
  const tiles: CityTile[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      tiles.push({ x, y, buildingType: 'empty' });
    }
  }
  return tiles;
}
