import * as SQLite from 'expo-sqlite';
import { CREATE_TABLES_SQL } from './schema';

let db: SQLite.SQLiteDatabase | null = null;

export async function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (db) return db;
  db = await SQLite.openDatabaseAsync('tahalul.db');
  await db.execAsync(CREATE_TABLES_SQL);
  return db;
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
