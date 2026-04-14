import type { BadgeUnlock } from '@/types/entities';
import { getDatabase } from '../client';

export async function getAllBadgeUnlocks(): Promise<BadgeUnlock[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>('SELECT * FROM badge_unlocks ORDER BY unlocked_at DESC');
  return rows.map((r) => ({ id: r.id, badgeId: r.badge_id, unlockedAt: r.unlocked_at }));
}

export async function insertBadgeUnlock(badge: BadgeUnlock): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT OR IGNORE INTO badge_unlocks (id, badge_id, unlocked_at) VALUES (?, ?, ?)',
    badge.id,
    badge.badgeId,
    badge.unlockedAt,
  );
}
