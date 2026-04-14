import type { CityTile } from '@/types/entities';
import { getDatabase } from '../client';
import { GRID_SIZE } from '@/lib/domain/city';

export async function getAllCityTiles(): Promise<CityTile[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>('SELECT * FROM city_tiles ORDER BY x, y');
  return rows.map((r) => ({
    x: r.x,
    y: r.y,
    buildingType: r.building_type,
    unlockedByActionId: r.unlocked_by_action_id ?? undefined,
    unlockedAt: r.unlocked_at ?? undefined,
  }));
}

export async function initCityTiles(): Promise<void> {
  const db = await getDatabase();
  const existing = await db.getFirstAsync<any>('SELECT COUNT(*) as count FROM city_tiles');
  if (existing?.count > 0) return;

  const values: string[] = [];
  const params: any[] = [];
  for (let x = 0; x < GRID_SIZE; x++) {
    for (let y = 0; y < GRID_SIZE; y++) {
      values.push('(?, ?, ?)');
      params.push(x, y, 'empty');
    }
  }
  await db.runAsync(`INSERT INTO city_tiles (x, y, building_type) VALUES ${values.join(', ')}`, ...params);
}

export async function updateCityTile(tile: CityTile): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'UPDATE city_tiles SET building_type = ?, unlocked_by_action_id = ?, unlocked_at = ? WHERE x = ? AND y = ?',
    tile.buildingType,
    tile.unlockedByActionId ?? null,
    tile.unlockedAt ?? null,
    tile.x,
    tile.y,
  );
}
