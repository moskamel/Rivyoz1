import { create } from 'zustand';
import { getDatabase, generateId } from '../db/database';

export interface Animal {
  id: string;
  farm_id: string;
  tag_number: string;
  animal_type: string;
  gender: 'male' | 'female';
  name?: string;
  breed?: string;
  birth_date?: string;
  entry_date: string;
  purchase_price: number;
  status: 'active' | 'sold' | 'dead' | 'slaughtered' | 'transferred';
  purpose?: string;
  current_condition: string;
  pen_id?: string;
  notes?: string;
  photo_url?: string;
  created_at: string;
  updated_at: string;
}

export interface NewAnimalData {
  tag_number: string;
  animal_type: string;
  gender: 'male' | 'female';
  name?: string;
  breed?: string;
  birth_date?: string;
  entry_date?: string;
  purchase_price?: number;
  purpose?: string;
  pen_id?: string;
  notes?: string;
}

interface AnimalsStore {
  animals: Animal[];
  isLoading: boolean;
  load: (farmId: string) => Promise<void>;
  addAnimal: (farmId: string, data: NewAnimalData) => Promise<Animal>;
  addBatch: (farmId: string, type: string, gender: string, count: number) => Promise<void>;
  updateAnimal: (id: string, data: Partial<Animal>) => Promise<void>;
  updateStatus: (id: string, status: Animal['status'], salePrice?: number) => Promise<void>;
  getAnimal: (id: string) => Animal | undefined;
}

export const useAnimalsStore = create<AnimalsStore>((set, get) => ({
  animals: [],
  isLoading: false,

  load: async (farmId) => {
    set({ isLoading: true });
    const db = await getDatabase();
    const rows = await db.getAllAsync(
      'SELECT * FROM animals WHERE farm_id=? AND status="active" ORDER BY created_at DESC',
      [farmId]
    );
    set({ animals: rows, isLoading: false });
  },

  addAnimal: async (farmId, data) => {
    const db = await getDatabase();
    const id = generateId();
    const now = new Date().toISOString().split('T')[0];
    const animal: Animal = {
      id,
      farm_id: farmId,
      tag_number: data.tag_number,
      animal_type: data.animal_type,
      gender: data.gender,
      name: data.name,
      breed: data.breed,
      birth_date: data.birth_date,
      entry_date: data.entry_date ?? now,
      purchase_price: data.purchase_price ?? 0,
      status: 'active',
      purpose: data.purpose,
      current_condition: 'healthy',
      pen_id: data.pen_id,
      notes: data.notes,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await db.runAsync(
      `INSERT INTO animals (id, farm_id, tag_number, animal_type, gender, name, breed,
        birth_date, entry_date, purchase_price, status, purpose, current_condition, pen_id, notes)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      [
        id, farmId, data.tag_number, data.animal_type, data.gender,
        data.name ?? null, data.breed ?? null, data.birth_date ?? null,
        data.entry_date ?? now, data.purchase_price ?? 0,
        'active', data.purpose ?? null, 'healthy', data.pen_id ?? null, data.notes ?? null,
      ]
    );
    set((s) => ({ animals: [animal, ...s.animals] }));
    return animal;
  },

  addBatch: async (farmId, type, gender, count) => {
    const prefix = type.slice(0, 3).toUpperCase();
    const existing = get().animals.filter((a) => a.animal_type === type).length;
    const newAnimals: Animal[] = [];
    const db = await getDatabase();
    for (let i = 1; i <= count; i++) {
      const num = String(existing + i).padStart(3, '0');
      const tag = `${prefix}-${num}`;
      const id = generateId();
      const now = new Date().toISOString().split('T')[0];
      await db.runAsync(
        `INSERT INTO animals (id, farm_id, tag_number, animal_type, gender, entry_date, status, current_condition, purchase_price)
         VALUES (?,?,?,?,?,?,?,?,?)`,
        [id, farmId, tag, type, gender, now, 'active', 'healthy', 0]
      );
      newAnimals.push({
        id, farm_id: farmId, tag_number: tag, animal_type: type,
        gender: gender as 'male' | 'female', entry_date: now,
        purchase_price: 0, status: 'active', current_condition: 'healthy',
        created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      });
    }
    set((s) => ({ animals: [...newAnimals, ...s.animals] }));
  },

  updateAnimal: async (id, data) => {
    const db = await getDatabase();
    const fields = Object.keys(data).map((k) => `${k}=?`).join(',');
    const values = [...Object.values(data), new Date().toISOString(), id];
    await db.runAsync(
      `UPDATE animals SET ${fields}, updated_at=? WHERE id=?`,
      values
    );
    set((s) => ({
      animals: s.animals.map((a) => (a.id === id ? { ...a, ...data } : a)),
    }));
  },

  updateStatus: async (id, status, salePrice) => {
    const db = await getDatabase();
    const now = new Date().toISOString();
    await db.runAsync(
      'UPDATE animals SET status=?, exit_date=date("now"), updated_at=? WHERE id=?',
      [status, now, id]
    );
    if (salePrice !== undefined) {
      const animal = get().animals.find((a) => a.id === id);
      if (animal) {
        await db.runAsync(
          `INSERT INTO transactions (id, farm_id, transaction_type, category, amount, transaction_date, description, animal_id)
           VALUES (?,?,?,?,?,date('now'),?,?)`,
          [generateId(), animal.farm_id, 'income', 'animal_sale', salePrice, `بيع ${animal.tag_number}`, id]
        );
      }
    }
    set((s) => ({ animals: s.animals.filter((a) => a.id !== id) }));
  },

  getAnimal: (id) => get().animals.find((a) => a.id === id),
}));
