// src/components/cuisine/OrderList.tsx
'use client';

import React, { useState } from 'react';
import { Order, OrderStatus } from '@/types';
import { OrderCard } from './OrderCard';

interface OrderListProps {
  orders: Order[];
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onUpdateStatus }) => {
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  
  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') return order.status !== 'served';
    return order.status === filter;
  });
  
  const stats = {
    pending: orders.filter((o) => o.status === 'pending').length,
    preparing: orders.filter((o) => o.status === 'preparing').length,
    ready: orders.filter((o) => o.status === 'ready').length,
  };
  
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-yellow-50 p-6 rounded-lg shadow">
          <p className="text-sm text-yellow-600 mb-1">En attente</p>
          <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
        <div className="bg-blue-50 p-6 rounded-lg shadow">
          <p className="text-sm text-blue-600 mb-1">En préparation</p>
          <p className="text-3xl font-bold text-blue-700">{stats.preparing}</p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg shadow">
          <p className="text-sm text-green-600 mb-1">Prêt</p>
          <p className="text-3xl font-bold text-green-700">{stats.ready}</p>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { value: 'all', label: 'Toutes' },
          { value: 'pending', label: 'En attente' },
          { value: 'preparing', label: 'En préparation' },
          { value: 'ready', label: 'Prêt' },
        ].map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
              filter === item.value
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      
      {/* Orders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onUpdateStatus={onUpdateStatus}
          />
        ))}
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Aucune commande pour le moment</p>
        </div>
      )}
    </div>
  );
};