// src/components/order/MenuItemCard.tsx
'use client';

import React from 'react';
import { MenuItem } from '@/types';
import { formatPrice } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
  onAdd: (item: MenuItem) => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd }) => {
  return (
    <button
      onClick={() => onAdd(item)}
      className="bg-white rounded-lg shadow hover:shadow-xl transition-all duration-200 p-5 flex flex-col active:scale-95 w-full text-left"
    >
      <h4 className="font-semibold text-gray-900 mb-2 text-lg">
        {item.name}
      </h4>
      
      <div className="mt-auto">
        <span className="text-xl font-bold text-blue-600">
          {formatPrice(item.price)}
        </span>
      </div>
    </button>
  );
};