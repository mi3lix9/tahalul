import type { ActionLog } from '@/types/entities';
import { getDatabase } from '../client';

export async function getAllActions(): Promise<ActionLog[]> {
  const db = await getDatabase();
  const rows = await db.getAllAsync<any>('SELECT * FROM action_logs ORDER BY created_at DESC');
  return rows.map((r) => ({
    id: r.id,
    type: r.type,
    verificationMethod: r.verification_method,
    photoUri: r.photo_uri ?? undefined,
    qrCode: r.qr_code ?? undefined,
    locationId: r.location_id ?? undefined,
    pointsAwarded: r.points_awarded,
    co2SavedKg: r.co2_saved_kg,
    createdAt: r.created_at,
  }));
}

export async function insertAction(action: ActionLog): Promise<void> {
  const db = await getDatabase();
  await db.runAsync(
    `INSERT INTO action_logs (id, type, verification_method, photo_uri, qr_code, location_id, points_awarded, co2_saved_kg, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    action.id,
    action.type,
    action.verificationMethod,
    action.photoUri ?? null,
    action.qrCode ?? null,
    action.locationId ?? null,
    action.pointsAwarded,
    action.co2SavedKg,
    action.createdAt,
  );
}
