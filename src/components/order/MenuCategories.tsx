// src/components/order/MenuCategories.tsx
'use client';

import React from 'react';
import { CATEGORIES } from '@/constants/menu';
import { cn } from '@/lib/utils';

interface MenuCategoriesProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const MenuCategories: React.FC<MenuCategoriesProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
      {CATEGORIES.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={cn(
            'px-4 py-3 rounded-lg font-medium transition-all whitespace-nowrap flex items-center gap-2',
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
          )}
        >
          <span className="text-xl">{category.icon}</span>
          <span>{category.label}</span>
        </button>
      ))}
    </div>
  );
};