import { create } from 'zustand';
import { getDatabase, generateId } from '../db/database';

export interface Alert {
  id: string;
  farm_id: string;
  alert_type: string;
  title: string;
  body: string;
  severity: 'critical' | 'warning' | 'info';
  animal_id?: string;
  due_date?: string;
  is_read: boolean;
  is_dismissed: boolean;
  created_at: string;
}

interface AlertsStore {
  alerts: Alert[];
  unreadCount: number;
  load: (farmId: string) => Promise<void>;
  markRead: (id: string) => Promise<void>;
  markAllRead: (farmId: string) => Promise<void>;
  dismiss: (id: string) => Promise<void>;
  addAlert: (farmId: string, data: Omit<Alert, 'id' | 'farm_id' | 'is_read' | 'is_dismissed' | 'created_at'>) => Promise<void>;
}

export const useAlertsStore = create<AlertsStore>((set, get) => ({
  alerts: [],
  unreadCount: 0,

  load: async (farmId) => {
    const db = await getDatabase();
    const rows = await db.getAllAsync(
      `SELECT * FROM alerts WHERE farm_id=? AND is_dismissed=0
       ORDER BY
         CASE severity WHEN 'critical' THEN 0 WHEN 'warning' THEN 1 ELSE 2 END,
         created_at DESC`,
      [farmId]
    );
    const unread = rows.filter((a: any) => !a.is_read).length;
    set({ alerts: rows, unreadCount: unread });
  },

  markRead: async (id) => {
    const db = await getDatabase();
    await db.runAsync('UPDATE alerts SET is_read=1 WHERE id=?', [id]);
    set((s) => {
      const alerts = s.alerts.map((a) => (a.id === id ? { ...a, is_read: true } : a));
      return { alerts, unreadCount: alerts.filter((a) => !a.is_read).length };
    });
  },

  markAllRead: async (farmId) => {
    const db = await getDatabase();
    await db.runAsync('UPDATE alerts SET is_read=1 WHERE farm_id=?', [farmId]);
    set((s) => ({
      alerts: s.alerts.map((a) => ({ ...a, is_read: true })),
      unreadCount: 0,
    }));
  },

  dismiss: async (id) => {
    const db = await getDatabase();
    await db.runAsync('UPDATE alerts SET is_dismissed=1 WHERE id=?', [id]);
    set((s) => {
      const alerts = s.alerts.filter((a) => a.id !== id);
      return { alerts, unreadCount: alerts.filter((a) => !a.is_read).length };
    });
  },

  addAlert: async (farmId, data) => {
    const db = await getDatabase();
    const id = generateId();
    await db.runAsync(
      `INSERT INTO alerts (id, farm_id, alert_type, title, body, severity, animal_id, due_date)
       VALUES (?,?,?,?,?,?,?,?)`,
      [id, farmId, data.alert_type, data.title, data.body, data.severity,
       data.animal_id ?? null, data.due_date ?? null]
    );
    await get().load(farmId);
  },
}));
