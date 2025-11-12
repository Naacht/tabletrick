// src/components/order/OrderSummary.tsx
'use client';

import React from 'react';
import { OrderItem as OrderItemType } from '@/types';
import { OrderItem } from './OrderItem';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Send } from 'lucide-react';

interface OrderSummaryProps {
  items: OrderItemType[];
  total: number;
  onUpdateQuantity: (menuItemId: string, quantity: number) => void;
  onRemove: (menuItemId: string) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  total,
  onUpdateQuantity,
  onRemove,
  onSubmit,
  isSubmitting = false,
}) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Panier vide
        </h3>
        <p className="text-gray-600">
          Ajoutez des articles au menu pour commencer
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <ShoppingCart className="w-6 h-6" />
        Commande
      </h3>
      
      <div className="space-y-3 mb-6 max-h-[400px] overflow-y-auto">
        {items.map((item) => (
          <OrderItem
            key={item.menuItem.id}
            item={item}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
          />
        ))}
      </div>
      
      <div className="border-t pt-4 mb-4">
        <div className="flex items-center justify-between text-xl font-bold">
          <span className="text-gray-900">Total</span>
          <span className="text-blue-600">{formatPrice(total)}</span>
        </div>
      </div>
      
      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full flex items-center justify-center gap-2"
        size="lg"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Envoi en cours...' : 'Envoyer en cuisine'}
      </Button>
    </div>
  );
};