import type { ChallengeProgress } from '@/types/entities';
import { getDatabase } from '../client';

export async function getActiveChallenges(): Promise<ChallengeProgress[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>("SELECT * FROM challenge_progress WHERE status = 'active' ORDER BY scope, started_at");
  return rows.map(mapRow);
}

export async function getAllChallenges(): Promise<ChallengeProgress[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>('SELECT * FROM challenge_progress ORDER BY started_at DESC');
  return rows.map(mapRow);
}

export async function upsertChallenge(c: ChallengeProgress): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT OR REPLACE INTO challenge_progress (id, challenge_def_id, scope, progress, status, started_at, period_key)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    c.id,
    c.challengeDefId,
    c.scope,
    c.progress,
    c.status,
    c.startedAt,
    c.periodKey,
  );
}

function mapRow(r: any): ChallengeProgress {
  return {
    id: r.id,
    challengeDefId: r.challenge_def_id,
    scope: r.scope,
    progress: r.progress,
    status: r.status,
    startedAt: r.started_at,
    periodKey: r.period_key,
  };
}
