import { create } from 'zustand';
import { getDatabase, generateId } from '../db/database';

export interface Transaction {
  id: string;
  farm_id: string;
  transaction_type: 'income' | 'expense';
  category: string;
  amount: number;
  transaction_date: string;
  description?: string;
  animal_id?: string;
  batch_id?: string;
  created_at: string;
}

export interface NewTransactionData {
  transaction_type: 'income' | 'expense';
  category: string;
  amount: number;
  transaction_date?: string;
  description?: string;
  animal_id?: string;
  batch_id?: string;
}

interface FinanceStore {
  transactions: Transaction[];
  isLoading: boolean;
  load: (farmId: string) => Promise<void>;
  addTransaction: (farmId: string, data: NewTransactionData) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  getMonthStats: (year: number, month: number) => {
    income: number;
    expenses: number;
    profit: number;
  };
  getRecentTransactions: (limit?: number) => Transaction[];
}

export const useFinanceStore = create<FinanceStore>((set, get) => ({
  transactions: [],
  isLoading: false,

  load: async (farmId) => {
    set({ isLoading: true });
    const db = await getDatabase();
    const rows = await db.getAllAsync<Transaction>(
      'SELECT * FROM transactions WHERE farm_id=? ORDER BY transaction_date DESC, created_at DESC LIMIT 200',
      [farmId]
    );
    set({ transactions: rows, isLoading: false });
  },

  addTransaction: async (farmId, data) => {
    const db = await getDatabase();
    const id = generateId();
    const now = new Date().toISOString().split('T')[0];
    const tx: Transaction = {
      id,
      farm_id: farmId,
      transaction_type: data.transaction_type,
      category: data.category,
      amount: data.amount,
      transaction_date: data.transaction_date ?? now,
      description: data.description,
      animal_id: data.animal_id,
      batch_id: data.batch_id,
      created_at: new Date().toISOString(),
    };
    await db.runAsync(
      `INSERT INTO transactions (id, farm_id, transaction_type, category, amount, transaction_date, description, animal_id, batch_id)
       VALUES (?,?,?,?,?,?,?,?,?)`,
      [
        id, farmId, data.transaction_type, data.category, data.amount,
        data.transaction_date ?? now, data.description ?? null,
        data.animal_id ?? null, data.batch_id ?? null,
      ]
    );
    set((s) => ({ transactions: [tx, ...s.transactions] }));
  },

  deleteTransaction: async (id) => {
    const db = await getDatabase();
    await db.runAsync('DELETE FROM transactions WHERE id=?', [id]);
    set((s) => ({ transactions: s.transactions.filter((t) => t.id !== id) }));
  },

  getMonthStats: (year, month) => {
    const txs = get().transactions.filter((t) => {
      const d = new Date(t.transaction_date);
      return d.getFullYear() === year && d.getMonth() + 1 === month;
    });
    const income = txs.filter((t) => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = txs.filter((t) => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, profit: income - expenses };
  },

  getRecentTransactions: (limit = 10) => get().transactions.slice(0, limit),
}));
