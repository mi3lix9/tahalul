export const CREATE_TABLES_SQL = `
  CREATE TABLE IF NOT EXISTS user_profile (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT '',
    level INTEGER NOT NULL DEFAULT 1,
    xp INTEGER NOT NULL DEFAULT 0,
    eco_points INTEGER NOT NULL DEFAULT 0,
    streak INTEGER NOT NULL DEFAULT 0,
    last_action_date TEXT,
    streak_freezes INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS action_logs (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    verification_method TEXT NOT NULL,
    photo_uri TEXT,
    qr_code TEXT,
    location_id TEXT,
    points_awarded INTEGER NOT NULL DEFAULT 0,
    co2_saved_kg REAL NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS city_tiles (
    x INTEGER NOT NULL,
    y INTEGER NOT NULL,
    building_type TEXT NOT NULL DEFAULT 'empty',
    unlocked_by_action_id TEXT,
    unlocked_at TEXT,
    PRIMARY KEY (x, y)
  );

  CREATE TABLE IF NOT EXISTS challenge_progress (
    id TEXT PRIMARY KEY,
    challenge_def_id TEXT NOT NULL,
    scope TEXT NOT NULL,
    progress INTEGER NOT NULL DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'active',
    started_at TEXT NOT NULL,
    period_key TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS badge_unlocks (
    id TEXT PRIMARY KEY,
    badge_id TEXT NOT NULL UNIQUE,
    unlocked_at TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reward_redemptions (
    id TEXT PRIMARY KEY,
    reward_id TEXT NOT NULL,
    code TEXT NOT NULL,
    points_spent INTEGER NOT NULL DEFAULT 0,
    redeemed_at TEXT NOT NULL
  );
`;
