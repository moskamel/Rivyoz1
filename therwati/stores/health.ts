import { create } from 'zustand';
import { getDatabase, generateId } from '../db/database';

export interface HealthEvent {
  id: string;
  farm_id: string;
  animal_id?: string | null;
  event_type: 'vaccine' | 'treatment' | 'examination' | 'preventive';
  name: string;
  event_date: string;
  cost: number;
  vet_name?: string | null;
  diagnosis?: string | null;
  notes?: string | null;
  withdrawal_days: number;
  next_dose_date?: string | null;
  created_at: string;
}

export interface NewHealthEventData {
  animal_id?: string | null;
  event_type: 'vaccine' | 'treatment' | 'examination' | 'preventive';
  name: string;
  event_date?: string;
  cost?: number;
  vet_name?: string | null;
  diagnosis?: string | null;
  notes?: string | null;
  withdrawal_days?: number;
  next_dose_date?: string | null;
}

interface HealthStore {
  events: HealthEvent[];
  isLoading: boolean;
  load: (farmId: string) => Promise<void>;
  addEvent: (farmId: string, data: NewHealthEventData) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
  getEvent: (id: string) => HealthEvent | undefined;
  getUpcoming: (days?: number) => HealthEvent[];
  getByAnimal: (animalId: string) => HealthEvent[];
}

export const useHealthStore = create<HealthStore>((set, get) => ({
  events: [],
  isLoading: false,

  load: async (farmId) => {
    set({ isLoading: true });
    const db = await getDatabase();
    const rows = await db.getAllAsync(
      'SELECT * FROM health_events WHERE farm_id=? ORDER BY event_date DESC',
      [farmId]
    );
    set({ events: rows as HealthEvent[], isLoading: false });
  },

  addEvent: async (farmId, data) => {
    const db = await getDatabase();
    const id = generateId();
    const today = new Date().toISOString().split('T')[0];
    const eventDate = data.event_date ?? today;

    await db.runAsync(
      `INSERT INTO health_events
         (id, farm_id, animal_id, event_type, name, event_date, cost,
          vet_name, diagnosis, notes, withdrawal_days, next_dose_date)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id,
        farmId,
        data.animal_id ?? null,
        data.event_type,
        data.name,
        eventDate,
        data.cost ?? 0,
        data.vet_name ?? null,
        data.diagnosis ?? null,
        data.notes ?? null,
        data.withdrawal_days ?? 0,
        data.next_dose_date ?? null,
      ]
    );

    const newEvent: HealthEvent = {
      id,
      farm_id: farmId,
      animal_id: data.animal_id ?? null,
      event_type: data.event_type,
      name: data.name,
      event_date: eventDate,
      cost: data.cost ?? 0,
      vet_name: data.vet_name ?? null,
      diagnosis: data.diagnosis ?? null,
      notes: data.notes ?? null,
      withdrawal_days: data.withdrawal_days ?? 0,
      next_dose_date: data.next_dose_date ?? null,
      created_at: new Date().toISOString(),
    };

    set((s) => ({ events: [newEvent, ...s.events] }));
  },

  deleteEvent: async (id) => {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM health_events WHERE id=?', [id]);
    set((s) => ({ events: s.events.filter((e) => e.id !== id) }));
  },

  getEvent: (id) => get().events.find((e) => e.id === id),

  getUpcoming: (days = 60) => {
    const now = new Date();
    const cutoff = new Date(now.getTime() + days * 86400000);
    return get()
      .events.filter((e) => {
        if (!e.next_dose_date) return false;
        const d = new Date(e.next_dose_date);
        return d <= cutoff;
      })
      .sort((a, b) => {
        const da = new Date(a.next_dose_date!).getTime();
        const db2 = new Date(b.next_dose_date!).getTime();
        return da - db2;
      });
  },

  getByAnimal: (animalId) =>
    get().events.filter((e) => e.animal_id === animalId),
}));
