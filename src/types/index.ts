// src/types/index.ts
export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'served';
export type TableStatus = 'available' | 'occupied' | 'reserved';
export type TableLocation = 'interior' | 'exterior';

export interface MenuItem {
  id: string;
  name: string;
  category: 'brunch' | 'pastries' | 'cafe' | 'matcha' | 'comfort' | 'jus' | 'supplements';
  price: number;
  description?: string;
  image?: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
}

export interface Table {
  id: string;
  number: string; // Changé de number à string pour supporter "E0", "E1", etc.
  capacity: number;
  status: TableStatus;
  location: TableLocation; // Nouveau champ
  currentOrderId?: string;
}