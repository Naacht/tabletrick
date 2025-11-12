// src/app/table/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UtensilsCrossed } from 'lucide-react';
import { useTableStore } from '@/store/useTableStore';
import { useOrderStore } from '@/store/useOrderStore';
import { MENU_ITEMS } from '@/constants/menu';
import { MenuCategories } from '@/components/order/MenuCategories';
import { MenuItemCard } from '@/components/order/MenuItemCard';
import { OrderSummary } from '@/components/order/OrderSummary';
import { Button } from '@/components/ui/Button';
import { MenuItem } from '@/types';
import toast from 'react-hot-toast';

export default function TableOrderPage() {
  const params = useParams();
  const router = useRouter();
  const tableId = params.id as string;
  
  const { getTableById, updateTableStatus } = useTableStore();
  const {
    currentOrder,
    addItemToCurrentOrder,
    removeItemFromCurrentOrder,
    updateItemQuantity,
    clearCurrentOrder,
    getCurrentOrderTotal,
    addOrder,
  } = useOrderStore();
  
  const [selectedCategory, setSelectedCategory] = useState('brunch');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const table = getTableById(tableId);
  
  useEffect(() => {
    if (!table) {
      toast.error('Table introuvable');
      router.push('/');
    }
  }, [table, router]);
  
  if (!table) {
    return null;
  }
  
  const filteredMenuItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory
  );
  
  const handleAddItem = (menuItem: MenuItem) => {
    addItemToCurrentOrder({
      menuItem,
      quantity: 1,
    });
    toast.success(`${menuItem.name} ajouté`);
  };
  
  const handleSubmitOrder = async () => {
    if (currentOrder.length === 0) {
      toast.error('Ajoutez des articles avant de soumettre');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const total = getCurrentOrderTotal();
      
      // Créer la commande
      const order = addOrder({
        tableId,
        items: currentOrder,
        status: 'pending',
        totalAmount: total,
      });
      
      // Envoyer à l'API
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      // Mettre à jour le statut de la table
      updateTableStatus(tableId, 'occupied', order.id);
      
      // Nettoyer le panier
      clearCurrentOrder();
      
      toast.success('Commande envoyée en cuisine !');
      
      // Rediriger vers le dashboard
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      toast.error('Erreur lors de l\'envoi de la commande');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" className="flex items-center gap-2">
                  <ArrowLeft className="w-5 h-5" />
                  Retour
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <UtensilsCrossed className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Table {table.number}
                  </h1>
                  <p className="text-sm text-gray-600">
                    Capacité: {table.capacity} personnes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
            
            <MenuCategories
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredMenuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  onAdd={handleAddItem}
                />
              ))}
            </div>
            
            {filteredMenuItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">
                  Aucun article dans cette catégorie
                </p>
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              items={currentOrder}
              total={getCurrentOrderTotal()}
              onUpdateQuantity={updateItemQuantity}
              onRemove={removeItemFromCurrentOrder}
              onSubmit={handleSubmitOrder}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>
    </div>
  );
}