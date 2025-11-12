// src/store/useTableStore.ts
import { create } from 'zustand';
import { Table } from '@/types';
import { INITIAL_TABLES } from '@/lib/mockData';

interface TableStore {
  tables: Table[];
  setTables: (tables: Table[]) => void;
  updateTableStatus: (tableId: string, status: Table['status'], orderId?: string) => void;
  getTableById: (tableId: string) => Table | undefined;
}

export const useTableStore = create<TableStore>((set, get) => ({
  tables: INITIAL_TABLES,
  
  setTables: (tables) => set({ tables }),
  
  updateTableStatus: (tableId, status, orderId) => 
    set((state) => ({
      tables: state.tables.map((table) =>
        table.id === tableId
          ? { ...table, status, currentOrderId: orderId }
          : table
      ),
    })),
  
  getTableById: (tableId) => {
    return get().tables.find((table) => table.id === tableId);
  },
}));