// src/components/order/MenuItemCard.tsx
'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd }) => {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4 flex flex-col">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900 mb-1">{item.name}</h4>
        {item.description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
      
      <div className="flex items-center justify-between mt-3">
        <span className="text-lg font-bold text-blue-600">
          {formatPrice(item.price)}
        </span>
        <button
          onClick={() => onAdd(item)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};