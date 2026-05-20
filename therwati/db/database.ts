import { Platform } from 'react-native';
import { CREATE_TABLES_SQL } from './schema';

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

// ─── Web in-memory database stub ─────────────────────────────────────────────
// Stores rows in JS Maps per table. No SQL engine — direct object ops.
// Good enough for web demo; native uses real expo-sqlite.

const WEB_TABLES: Record<string, Record<string, any>[]> = {};

function getTableName(sql: string): string | null {
  const m = sql.match(/(?:FROM|INTO|UPDATE|TABLE IF NOT EXISTS)\s+([a-z_]+)/i);
  return m ? m[1].toLowerCase() : null;
}

class WebDB {
  async execAsync(_sql: string): Promise<void> {
    // Parse CREATE TABLE statements to initialize tables
    const matches = _sql.matchAll(/CREATE TABLE IF NOT EXISTS (\w+)/g);
    for (const m of matches) {
      if (!WEB_TABLES[m[1]]) WEB_TABLES[m[1]] = [];
    }
  }

  async runAsync(sql: string, params: any[] = []): Promise<{ lastInsertRowId: number; changes: number }> {
    const normalized = sql.trim().toUpperCase();

    if (normalized.startsWith('INSERT INTO')) {
      const tableMatch = sql.match(/INSERT INTO (\w+)/i);
      if (tableMatch) {
        const table = tableMatch[1].toLowerCase();
        const colMatch = sql.match(/\(([^)]+)\)\s+VALUES/i);
        if (colMatch) {
          const cols = colMatch[1].split(',').map((c) => c.trim());
          const row: Record<string, any> = {};
          cols.forEach((col, i) => { row[col] = params[i] ?? null; });
          if (!row.created_at) row.created_at = new Date().toISOString();
          if (!row.updated_at) row.updated_at = new Date().toISOString();
          if (!WEB_TABLES[table]) WEB_TABLES[table] = [];
          WEB_TABLES[table].push(row);
        }
      }
      return { lastInsertRowId: 0, changes: 1 };
    }

    if (normalized.startsWith('UPDATE')) {
      const tableMatch = sql.match(/UPDATE (\w+) SET (.+?) WHERE (.+)/is);
      if (tableMatch) {
        const table = tableMatch[1].toLowerCase();
        const setPart = tableMatch[2];
        const wherePart = tableMatch[3];
        const setFields = parseSetClause(setPart, params);
        const { key, value } = parseWhereId(wherePart, params, setPart);
        const rows = WEB_TABLES[table] ?? [];
        rows.forEach((row) => {
          if (row[key] === value) Object.assign(row, setFields);
        });
      }
      return { lastInsertRowId: 0, changes: 1 };
    }

    if (normalized.startsWith('DELETE FROM')) {
      const tableMatch = sql.match(/DELETE FROM (\w+) WHERE (\w+)=\?/i);
      if (tableMatch) {
        const table = tableMatch[1].toLowerCase();
        const col = tableMatch[2].toLowerCase();
        WEB_TABLES[table] = (WEB_TABLES[table] ?? []).filter((r) => r[col] !== params[0]);
      }
      return { lastInsertRowId: 0, changes: 1 };
    }

    return { lastInsertRowId: 0, changes: 0 };
  }

  async getFirstAsync<T>(sql: string, params: any[] = []): Promise<T | null> {
    const rows = await this.getAllAsync<T>(sql, params);
    return rows[0] ?? null;
  }

  async getAllAsync<T>(sql: string, params: any[] = []): Promise<T[]> {
    const tableMatch = sql.match(/FROM (\w+)/i);
    if (!tableMatch) return [];
    const table = tableMatch[1].toLowerCase();
    let rows: any[] = [...(WEB_TABLES[table] ?? [])];

    // WHERE filter — handle simple status/farm_id/animal_id conditions
    const whereMatch = sql.match(/WHERE (.+?)(?:\s+ORDER|\s+LIMIT|$)/is);
    if (whereMatch) {
      const conditions = parseWhereConditions(whereMatch[1], params);
      rows = rows.filter((row) =>
        conditions.every(({ col, val }) => {
          if (val === null) return row[col] === null || row[col] === undefined;
          return String(row[col]) === String(val);
        })
      );
    }

    // ORDER BY
    const orderMatch = sql.match(/ORDER BY (.+?)(?:\s+LIMIT|$)/is);
    if (orderMatch) {
      const parts = orderMatch[1].trim().split(/\s+/);
      const col = parts[0];
      const desc = parts[1]?.toUpperCase() === 'DESC';
      rows.sort((a, b) => {
        const av = a[col] ?? '';
        const bv = b[col] ?? '';
        return desc ? (bv > av ? 1 : -1) : (av > bv ? 1 : -1);
      });
    }

    // LIMIT
    const limitMatch = sql.match(/LIMIT (\d+)/i);
    if (limitMatch) rows = rows.slice(0, parseInt(limitMatch[1]));

    return rows as T[];
  }
}

function parseSetClause(setPart: string, params: any[]): Record<string, any> {
  const result: Record<string, any> = {};
  let paramIdx = 0;
  const parts = setPart.split(',');
  for (const part of parts) {
    const m = part.trim().match(/^(\w+)\s*=\s*(.+)$/);
    if (m) {
      const col = m[1].trim().toLowerCase();
      const valStr = m[2].trim();
      if (valStr === '?') {
        result[col] = params[paramIdx++];
      } else if (valStr.startsWith("datetime('now')") || valStr.startsWith("date('now')")) {
        result[col] = new Date().toISOString();
      } else {
        result[col] = valStr.replace(/'/g, '');
      }
    }
  }
  return result;
}

function parseWhereId(wherePart: string, params: any[], setPart: string): { key: string; value: any } {
  // Count ?s in SET to find the WHERE param offset
  const setParamCount = (setPart.match(/\?/g) ?? []).length;
  const m = wherePart.match(/(\w+)\s*=\s*\?/);
  if (m) {
    return { key: m[1].toLowerCase(), value: params[setParamCount] };
  }
  return { key: 'id', value: params[params.length - 1] };
}

function parseWhereConditions(where: string, params: any[]): { col: string; val: any }[] {
  const conditions: { col: string; val: any }[] = [];
  let paramIdx = 0;

  // Handle: col=? AND col="val" AND col=0
  const parts = where.split(/\s+AND\s+/i);
  for (const part of parts) {
    const eqMatch = part.match(/(\w+)\s*=\s*(.+)/);
    if (eqMatch) {
      const col = eqMatch[1].toLowerCase();
      const valStr = eqMatch[2].trim();
      if (valStr === '?') {
        conditions.push({ col, val: params[paramIdx++] });
      } else if (valStr === '0' || valStr === '1') {
        conditions.push({ col, val: parseInt(valStr) });
      } else {
        // quoted string like "active"
        conditions.push({ col, val: valStr.replace(/['"]/g, '') });
      }
    }
  }
  return conditions;
}

// ─── Real expo-sqlite (native) ───────────────────────────────────────────────

let nativeDb: any = null;

async function getNativeDatabase() {
  if (nativeDb) return nativeDb;
  const SQLite = await import('expo-sqlite');
  nativeDb = await SQLite.openDatabaseAsync('therwati.db');
  await nativeDb.execAsync(CREATE_TABLES_SQL);
  return nativeDb;
}

// ─── Unified export ──────────────────────────────────────────────────────────

let webDb: WebDB | null = null;

export async function getDatabase(): Promise<any> {
  if (Platform.OS === 'web') {
    if (!webDb) {
      webDb = new WebDB();
      await webDb.execAsync(CREATE_TABLES_SQL);
    }
    return webDb;
  }
  return getNativeDatabase();
}
