// SQLite schema — matches PRD section 4 exactly

export const CREATE_TABLES_SQL = `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS farms (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  name TEXT NOT NULL,
  governorate TEXT NOT NULL,
  city TEXT,
  currency TEXT DEFAULT 'EGP',
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS pens (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  pen_type TEXT,
  capacity INTEGER,
  notes TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS animals (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  tag_number TEXT NOT NULL,
  animal_type TEXT NOT NULL,
  gender TEXT NOT NULL,
  name TEXT,
  breed TEXT,
  color TEXT,
  distinguishing_marks TEXT,
  photo_url TEXT,
  birth_date TEXT,
  entry_date TEXT DEFAULT (date('now')),
  exit_date TEXT,
  purchase_price REAL DEFAULT 0,
  status TEXT DEFAULT 'active',
  purpose TEXT,
  current_condition TEXT DEFAULT 'healthy',
  mother_id TEXT REFERENCES animals(id),
  father_tag TEXT,
  pen_id TEXT REFERENCES pens(id),
  buffalo_breed TEXT,
  milk_fat_percentage REAL,
  produces_qareesh INTEGER DEFAULT 0,
  sheep_age_stage TEXT,
  suitable_for_sacrifice INTEGER DEFAULT 0,
  tag_color TEXT,
  camel_use TEXT,
  notes TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_animals_farm ON animals(farm_id);
CREATE INDEX IF NOT EXISTS idx_animals_type ON animals(animal_type);
CREATE INDEX IF NOT EXISTS idx_animals_status ON animals(status);

CREATE TABLE IF NOT EXISTS poultry_batches (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  batch_name TEXT NOT NULL,
  batch_type TEXT NOT NULL,
  initial_count INTEGER NOT NULL,
  chick_price REAL NOT NULL,
  start_date TEXT NOT NULL,
  breed TEXT,
  supplier TEXT,
  pen_name TEXT,
  barn_area_sqm REAL,
  target_sell_price REAL,
  status TEXT DEFAULT 'active',
  harvest_date TEXT,
  notes TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS poultry_daily_logs (
  id TEXT PRIMARY KEY,
  batch_id TEXT REFERENCES poultry_batches(id) ON DELETE CASCADE,
  log_date TEXT NOT NULL,
  deaths INTEGER DEFAULT 0,
  feed_consumed_kg REAL DEFAULT 0,
  avg_weight_kg REAL,
  barn_temperature REAL,
  eggs_collected INTEGER DEFAULT 0,
  broken_eggs INTEGER DEFAULT 0,
  cumulative_deaths INTEGER,
  alive_count INTEGER,
  notes TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS health_events (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id),
  animal_id TEXT REFERENCES animals(id),
  batch_id TEXT REFERENCES poultry_batches(id),
  event_type TEXT NOT NULL,
  name TEXT NOT NULL,
  event_date TEXT NOT NULL,
  cost REAL DEFAULT 0,
  dosage TEXT,
  dosage_unit TEXT,
  vet_name TEXT,
  diagnosis TEXT,
  treatment_result TEXT,
  withdrawal_days INTEGER DEFAULT 0,
  next_dose_date TEXT,
  photo_url TEXT,
  notes TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_health_animal ON health_events(animal_id);
CREATE INDEX IF NOT EXISTS idx_health_date ON health_events(event_date);

CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  transaction_type TEXT NOT NULL,
  category TEXT NOT NULL,
  amount REAL NOT NULL,
  transaction_date TEXT NOT NULL,
  description TEXT,
  animal_id TEXT REFERENCES animals(id),
  batch_id TEXT REFERENCES poultry_batches(id),
  receipt_photo_url TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_tx_farm ON transactions(farm_id);
CREATE INDEX IF NOT EXISTS idx_tx_date ON transactions(transaction_date);
CREATE INDEX IF NOT EXISTS idx_tx_type ON transactions(transaction_type);

CREATE TABLE IF NOT EXISTS milk_productions (
  id TEXT PRIMARY KEY,
  animal_id TEXT REFERENCES animals(id) ON DELETE CASCADE,
  production_date TEXT NOT NULL,
  morning_liters REAL DEFAULT 0,
  evening_liters REAL DEFAULT 0,
  sell_price_per_liter REAL,
  quality_note TEXT,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS feed_inventory (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  feed_type TEXT NOT NULL,
  quantity_kg REAL NOT NULL DEFAULT 0,
  price_per_kg REAL,
  alert_threshold_kg REAL DEFAULT 50,
  supplier_name TEXT,
  last_purchase_date TEXT,
  is_synced INTEGER DEFAULT 0,
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS alerts (
  id TEXT PRIMARY KEY,
  farm_id TEXT REFERENCES farms(id) ON DELETE CASCADE,
  alert_type TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  severity TEXT DEFAULT 'info',
  animal_id TEXT REFERENCES animals(id),
  batch_id TEXT REFERENCES poultry_batches(id),
  health_event_id TEXT REFERENCES health_events(id),
  due_date TEXT,
  is_read INTEGER DEFAULT 0,
  is_dismissed INTEGER DEFAULT 0,
  is_synced INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS sync_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  operation TEXT NOT NULL,
  payload TEXT,
  attempts INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);
`;
