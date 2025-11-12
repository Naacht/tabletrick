// src/store/useOrderStore.ts
import { create } from 'zustand';
import { Order, OrderItem } from '@/types';
import { generateId, calculateOrderTotal } from '@/lib/utils';

interface OrderStore {
  orders: Order[];
  currentOrder: OrderItem[];
  
  // Actions pour les commandes
  addOrder: (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getOrdersByStatus: (status: Order['status']) => Order[];
  getOrderByTableId: (tableId: string) => Order | undefined;
  
  // Actions pour la commande en cours
  addItemToCurrentOrder: (item: OrderItem) => void;
  removeItemFromCurrentOrder: (menuItemId: string) => void;
  updateItemQuantity: (menuItemId: string, quantity: number) => void;
  clearCurrentOrder: () => void;
  getCurrentOrderTotal: () => number;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  currentOrder: [],
  
  // Gestion des commandes
  addOrder: (orderData) => {
    const newOrder: Order = {
      ...orderData,
      id: generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    set((state) => ({
      orders: [...state.orders, newOrder],
    }));
    
    return newOrder;
  },
  
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      ),
    })),
  
  deleteOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.filter((order) => order.id !== orderId),
    })),
  
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
  
  // Gestion de la commande en cours
  addItemToCurrentOrder: (item) =>
    set((state) => {
      const existingItem = state.currentOrder.find(
        (i) => i.menuItem.id === item.menuItem.id
      );
      
      if (existingItem) {
        return {
          currentOrder: state.currentOrder.map((i) =>
            i.menuItem.id === item.menuItem.id
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