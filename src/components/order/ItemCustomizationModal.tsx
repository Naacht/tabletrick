// src/components/order/ItemCustomizationModal.tsx
'use client';

import React, { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { MenuItem } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';

interface ItemCustomizationModalProps {
  item: MenuItem;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (customization: {
    removedIngredients: string[];
    supplements: string[];
    notes: string;
    quantity: number;
  }) => void;
}

// Liste des ingrédients communs à retirer
const COMMON_INGREDIENTS = [
  'Avocat',
  'Œufs',
  'Bacon',
  'Fromage',
  'Oignons',
  'Champignons',
  'Saumon',
  'Tomates',
  'Concombre',
  'Roquette',
];

// Liste des suppléments disponibles
const AVAILABLE_SUPPLEMENTS = [
  { name: 'Avocat', price: 1.5 },
  { name: 'Œuf brouillé', price: 1.5 },
  { name: 'Bacon', price: 2 },
  { name: 'Saumon fumé', price: 2 },
  { name: 'Pain sans gluten', price: 2 },
  { name: 'Beurre de cacahuète', price: 1.5 },
  { name: 'Burrata', price: 3 },
];

export const ItemCustomizationModal: React.FC<ItemCustomizationModalProps> = ({
  item,
  isOpen,
  onClose,
  onConfirm,
}) => {
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [supplements, setSupplements] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!isOpen) return null;

  const toggleIngredient = (ingredient: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const toggleSupplement = (supplement: string) => {
    setSupplements((prev) =>
      prev.includes(supplement)
        ? prev.filter((s) => s !== supplement)
        : [...prev, supplement]
    );
  };

  const calculateTotal = () => {
    let total = item.price * quantity;
    supplements.forEach((supp) => {
      const supplementItem = AVAILABLE_SUPPLEMENTS.find((s) => s.name === supp);
      if (supplementItem) {
        total += supplementItem.price * quantity;
      }
    });
    return total;
  };

  const handleConfirm = () => {
    onConfirm({
      removedIngredients,
      supplements,
      notes,
      quantity,
    });
    // Reset
    setRemovedIngredients([]);
    setSupplements([]);
    setNotes('');
    setQuantity(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-t-3xl sm:rounded-xl shadow-2xl w-full sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
            <p className="text-sm text-gray-600">{formatPrice(item.price)}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Quantité */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quantité</h3>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 hover:bg-gray-300 p-3 rounded-lg transition-colors"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="font-bold text-2xl w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Retirer des ingrédients */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Retirer des ingrédients
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {COMMON_INGREDIENTS.map((ingredient) => (
                <button
                  key={ingredient}
                  onClick={() => toggleIngredient(ingredient)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    removedIngredients.includes(ingredient)
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {ingredient}
                </button>
              ))}
            </div>
          </div>

          {/* Ajouter des suppléments */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Ajouter des suppléments
            </h3>
            <div className="space-y-2">
              {AVAILABLE_SUPPLEMENTS.map((supplement) => (
                <button
                  key={supplement.name}
                  onClick={() => toggleSupplement(supplement.name)}
                  className={`w-full p-3 rounded-lg border-2 transition-all flex items-center justify-between ${
                    supplements.includes(supplement.name)
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="font-medium">{supplement.name}</span>
                  <span className="text-sm text-gray-600">
                    +{formatPrice(supplement.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Notes supplémentaires
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: Bien cuit, sans sel..."
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 bg-gray-50 sticky bottom-0">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(calculateTotal())}
            </span>
          </div>
          <Button onClick={handleConfirm} className="w-full" size="lg">
            Ajouter au panier
          </Button>
        </div>
      </div>
    </div>
  );
};