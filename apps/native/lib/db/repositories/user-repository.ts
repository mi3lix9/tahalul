import type { UserProfile } from '@/types/entities';
import { getDatabase } from '../client';

export async function getUserProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();
  const row = await db.getFirstAsync<any>('SELECT * FROM user_profile LIMIT 1');
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    level: row.level,
    xp: row.xp,
    ecoPoints: row.eco_points,
    streak: row.streak,
    lastActionDate: row.last_action_date,
    streakFreezes: row.streak_freezes,
    createdAt: row.created_at,
  };
}

export async function upsertUserProfile(user: UserProfile): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO user_profile (id, name, level, xp, eco_points, streak, last_action_date, streak_freezes, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    user.id,
    user.name,
    user.level,
    user.xp,
    user.ecoPoints,
    user.streak,
    user.lastActionDate,
    user.streakFreezes,
    user.createdAt,
  );
}
