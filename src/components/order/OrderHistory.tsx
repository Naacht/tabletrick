// src/components/order/OrderHistory.tsx
'use client';

import React from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { Order } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatTime } from '@/lib/utils';

interface OrderHistoryProps {
  orders: Order[];
}

export const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  const [expandedOrders, setExpandedOrders] = React.useState<Set<string>>(
    new Set()
  );

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-gray-500">Aucune commande pour cette table</p>
      </div>
    );
  }

  const toggleOrder = (orderId: string) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Historique des commandes ({orders.length})
      </h3>
      
      {orders.map((order) => {
        const isExpanded = expandedOrders.has(order.id);
        
        return (
          <div
            key={order.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            {/* Header cliquable */}
            <button
              onClick={() => toggleOrder(order.id)}
              className="w-full p-4 flex items-center justify-between text-left"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <Badge status={order.status} />
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(order.createdAt)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  {order.items.length} article{order.items.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="font-bold text-blue-600">
                  {formatPrice(order.totalAmount)}
                </span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {/* Détails (extensible) */}
            {isExpanded && (
              <div className="px-4 pb-4 border-t">
                <div className="space-y-3 mt-3">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between py-2"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          <span className="text-blue-600 font-bold mr-2">
                            {item.quantity}x
                          </span>
                          {item.menuItem.name}
                        </p>
                        {item.notes && (
                          <p className="text-sm text-gray-600 mt-1 italic">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-gray-600 font-medium ml-4">
                        {formatPrice(item.menuItem.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};