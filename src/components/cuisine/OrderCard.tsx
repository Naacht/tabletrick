// src/components/cuisine/OrderCard.tsx
'use client';

import React from 'react';
import { Clock, Check, ChefHat } from 'lucide-react';
import { Order } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { formatPrice, formatTime } from '@/lib/utils';

interface OrderCardProps {
  order: Order;
  onUpdateStatus: (orderId: string, status: Order['status']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onUpdateStatus }) => {
  const getNextStatus = (): Order['status'] | null => {
    switch (order.status) {
      case 'pending':
        return 'preparing';
      case 'preparing':
        return 'ready';
      case 'ready':
        return 'served';
      default:
        return null;
    }
  };
  
  const nextStatus = getNextStatus();
  
  const getActionButton = () => {
    if (!nextStatus) return null;
    
    const buttonConfig = {
      preparing: { label: 'Commencer', icon: ChefHat, variant: 'primary' as const },
      ready: { label: 'Marquer prêt', icon: Check, variant: 'success' as const },
      served: { label: 'Marquer servi', icon: Check, variant: 'secondary' as const },
    };
    
    const config = buttonConfig[nextStatus];
    const Icon = config.icon;
    
    return (
      <Button
        onClick={() => onUpdateStatus(order.id, nextStatus)}
        variant={config.variant}
        className="w-full flex items-center justify-center gap-2"
      >
        <Icon className="w-5 h-5" />
        {config.label}
      </Button>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Table {order.tableId.replace('t', '')}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Clock className="w-4 h-4" />
            <span>{formatTime(order.createdAt)}</span>
          </div>
        </div>
        <Badge status={order.status} />
      </div>
      
      {/* Items */}
      <div className="space-y-2 mb-4">
        {order.items.map((item, index) => (
          <div
            key={index}
            className="flex items-start justify-between py-2 border-b last:border-0"
          >
            <div className="flex-1">
              <p className="font-medium text-gray-900">
                <span className="text-blue-600 font-bold mr-2">
                  {item.quantity}x
                </span>
                {item.menuItem.name}
              </p>
              {item.notes && (
                <p className="text-sm text-gray-600 italic mt-1">
                  Note: {item.notes}
                </p>
              )}
            </div>
            <span className="text-gray-600 font-medium ml-4">
              {formatPrice(item.menuItem.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>
      
      {/* Total */}
      <div className="flex items-center justify-between mb-4 pt-2 border-t">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-xl font-bold text-blue-600">
          {formatPrice(order.totalAmount)}
        </span>
      </div>
      
      {/* Action Button */}
      {getActionButton()}
    </div>
  );
};