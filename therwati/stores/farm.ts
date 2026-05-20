import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getDatabase, generateId } from '../db/database';

interface Farm {
  id: string;
  name: string;
  governorate: string;
  city?: string;
}

interface FarmStore {
  farm: Farm | null;
  isOnboarded: boolean;
  isLoading: boolean;
  load: () => Promise<void>;
  createFarm: (data: Omit<Farm, 'id'>) => Promise<void>;
  updateFarm: (data: Partial<Farm>) => Promise<void>;
}

export const useFarmStore = create<FarmStore>((set, get) => ({
  farm: null,
  isOnboarded: false,
  isLoading: true,

  load: async () => {
    try {
      const onboarded = await AsyncStorage.getItem('isOnboarded');
      if (!onboarded) {
        set({ isLoading: false, isOnboarded: false });
        return;
      }
      const db = await getDatabase();
      const farm = await db.getFirstAsync('SELECT * FROM farms LIMIT 1');
      set({ farm: farm ?? null, isOnboarded: true, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createFarm: async (data) => {
    const db = await getDatabase();
    const id = generateId();
    await db.runAsync(
      'INSERT INTO farms (id, name, governorate, city) VALUES (?, ?, ?, ?)',
      [id, data.name, data.governorate, data.city ?? null]
    );
    await AsyncStorage.setItem('isOnboarded', '1');
    set({ farm: { id, ...data }, isOnboarded: true });
  },

  updateFarm: async (data) => {
    const { farm } = get();
    if (!farm) return;
    const updated = { ...farm, ...data };
    const db = await getDatabase();
    await db.runAsync(
      'UPDATE farms SET name=?, governorate=?, city=?, updated_at=datetime("now") WHERE id=?',
      [updated.name, updated.governorate, updated.city ?? null, farm.id]
    );
    set({ farm: updated });
  },
}));
