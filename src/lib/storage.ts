// src/lib/storage.ts

const STORAGE_KEYS = {
  ORDERS: 'restaurant_orders',
  TABLES: 'restaurant_tables',
} as const;

export const storage = {
  // Orders
  getOrders: () => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (!data) return [];
      const orders = JSON.parse(data);
      // Convertir les dates en objets Date
      return orders.map((order: any) => ({
        ...order,
        createdAt: new Date(order.createdAt),
        updatedAt: new Date(order.updatedAt),
      }));
    } catch (error) {
      console.error('Erreur lors de la lecture des commandes:', error);
      return [];
    }
  },

  setOrders: (orders: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commandes:', error);
    }
  },

  // Tables
  getTables: () => {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.TABLES);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Erreur lors de la lecture des tables:', error);
      return null;
    }
  },

  setTables: (tables: any[]) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.TABLES, JSON.stringify(tables));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des tables:', error);
    }
  },

  // Clear all
  clearAll: () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.ORDERS);
    localStorage.removeItem(STORAGE_KEYS.TABLES);
  },
};