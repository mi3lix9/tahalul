import type { RewardRedemption } from '@/types/entities';
import { getDatabase } from '../client';

export async function getAllRedemptions(): Promise<RewardRedemption[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>('SELECT * FROM reward_redemptions ORDER BY redeemed_at DESC');
  return rows.map((r) => ({
    id: r.id,
    rewardId: r.reward_id,
    code: r.code,
    pointsSpent: r.points_spent,
    redeemedAt: r.redeemed_at,
  }));
}

export async function insertRedemption(r: RewardRedemption): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    'INSERT INTO reward_redemptions (id, reward_id, code, points_spent, redeemed_at) VALUES (?, ?, ?, ?, ?)',
    r.id,
    r.rewardId,
    r.code,
    r.pointsSpent,
    r.redeemedAt,
  );
}
