// src/store/useOrderStore.ts
import { create } from 'zustand';
import { Order, OrderItem } from '@/types';
import { generateId, calculateOrderTotal } from '@/lib/utils';
import { storage } from '@/lib/storage';

interface OrderStore {
  orders: Order[];
  currentOrder: OrderItem[];
  isHydrated: boolean;
  
  // Actions pour les commandes
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrderByTableId: (tableId: string) => Order | undefined;
  getTableOrderHistory: (tableId: string) => Order[];
  
  // Actions pour la commande en cours
  addItemToCurrentOrder: (item: OrderItem) => void;
  removeItemFromCurrentOrder: (menuItemId: string) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  clearCurrentOrder: () => void;
  getCurrentOrderTotal: () => number;
  
  // Hydratation
  hydrate: () => void;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: [],
  isHydrated: false,
  
  // Hydratation depuis localStorage
  hydrate: () => {
    const savedOrders = storage.getOrders();
    set({ orders: savedOrders, isHydrated: true });
  },
  
  // Gestion des commandes
  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => {
      const newOrders = [...state.orders, newOrder];
      storage.setOrders(newOrders);
      return { orders: newOrders };
    });
    
    return newOrder;
  },
  
  updateOrderStatus: (orderId, status) =>
    set((state) => {
      const newOrders = state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      );
      storage.setOrders(newOrders);
      return { orders: newOrders };
    }),
  
  deleteOrder: (orderId) =>
    set((state) => {
      const newOrders = state.orders.filter((order) => order.id !== orderId);
      storage.setOrders(newOrders);
      return { orders: newOrders };
    }),
  
  getOrderById: (orderId) => {
    return get().orders.find((order) => order.id === orderId);
  },
  
  getOrdersByStatus: (status) => {
    return get().orders.filter((order) => order.status === status);
  },
  
  getOrderByTableId: (tableId) => {
    return get().orders.find(
      (order) => order.tableId === tableId && order.status !== 'served'
    );
  },
  
  getTableOrderHistory: (tableId) => {
    return get().orders.filter((order) => order.tableId === tableId);
  },
  
  // Gestion de la commande en cours
  addItemToCurrentOrder: (item) =>
    set((state) => {
      const existingItem = state.currentOrder.find(
        (i) => i.menuItem.id === item.menuItem.id && i.notes === item.notes
      );
      
      if (existingItem) {
        return {
          currentOrder: state.currentOrder.map((i) =>
            i.menuItem.id === item.menuItem.id && i.notes === item.notes
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          ),
        };
      }
      
      return {
        currentOrder: [...state.currentOrder, item],
      };
    }),
  
  removeItemFromCurrentOrder: (menuItemId) =>
    set((state) => ({
      currentOrder: state.currentOrder.filter(
        (item) => item.menuItem.id !== menuItemId
      ),
    })),
  
  updateItemQuantity: (menuItemId, quantity) =>
    set((state) => ({
      currentOrder: state.currentOrder.map((item) =>
        item.menuItem.id === menuItemId ? { ...item, quantity } : item
      ),
    })),
  
  clearCurrentOrder: () => set({ currentOrder: [] }),
  
  getCurrentOrderTotal: () => {
    return calculateOrderTotal(get().currentOrder);
  },
}));