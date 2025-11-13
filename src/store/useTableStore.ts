// src/store/useTableStore.ts
import { create } from 'zustand';
import { Table } from '@/types';
import { INITIAL_TABLES } from '@/lib/mockData';
import { storage } from '@/lib/storage';

interface TableStore {
  tables: Table[];
  isHydrated: boolean;
  setTables: (tables: Table[]) => void;
  updateTableStatus: (tableId: string, status: Table['status'], orderId?: string) => void;
  getTableById: (tableId: string) => Table | undefined;
  hydrate: () => void;
}

export const useTableStore = create<TableStore>((set, get) => ({
  tables: INITIAL_TABLES,
  isHydrated: false,
  
  // Hydratation depuis localStorage
  hydrate: () => {
    const savedTables = storage.getTables();
    set({ 
      tables: savedTables || INITIAL_TABLES,
      isHydrated: true 
    });
  },
  
  setTables: (tables) => {
    storage.setTables(tables);
    set({ tables });
  },
  
  updateTableStatus: (tableId, status, orderId) =>
    set((state) => {
      const newTables = state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status, currentOrderId: orderId }
          : table
      );
      storage.setTables(newTables);
      return { tables: newTables };
    }),
  
  getTableById: (tableId) => {
    return get().tables.find((table) => table.id === tableId);
  },
}));