// src/components/order/OrderItem.tsx
'use client';

import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { OrderItem as OrderItemType } from '@/types';
import { formatPrice } from '@/lib/utils';

interface OrderItemProps {
  item: OrderItemType;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemove: (menuItemId: string) => void;
}

export const OrderItem: React.FC<OrderItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
}) => {
  const handleDecrease = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.menuItem.id, item.quantity - 1);
    } else {
      onRemove(item.menuItem.id);
    }
  };
  
  const handleIncrease = () => {
    onUpdateQuantity(item.menuItem.id, item.quantity + 1);
  };
  
  const subtotal = item.menuItem.price * item.quantity;
  
  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{item.menuItem.name}</h4>
          <p className="text-sm text-gray-600">{formatPrice(item.menuItem.price)}</p>
        </div>
        <button
          onClick={() => onRemove(item.menuItem.id)}
          className="text-red-600 hover:text-red-700 p-1"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
      
      {item.notes && (
        <p className="text-sm text-gray-500 mb-2 italic">Note: {item.notes}</p>
      )}
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrease}
            className="bg-gray-200 hover:bg-gray-300 p-1.5 rounded transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="font-semibold text-lg w-8 text-center">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrease}
            className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="font-bold text-blue-600">
          {formatPrice(subtotal)}
        </span>
      </div>
    </div>
  );
};