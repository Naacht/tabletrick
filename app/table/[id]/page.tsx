// app/table/[id]/page.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UtensilsCrossed, History, LogOut } from 'lucide-react';
import { useTableStore } from '@/store/useTableStore';
import { useOrderStore } from '@/store/useOrderStore';
import { MENU_ITEMS } from '@/constants/menu';
import { MenuCategories } from '@/components/order/MenuCategories';
import { MenuItemCard } from '@/components/order/MenuItemCard';
import { OrderSummary } from '@/components/order/OrderSummary';
import { ItemCustomizationModal } from '@/components/order/ItemCustomizationModal';
import { OrderHistory } from '@/components/order/OrderHistory';
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
    getTableOrderHistory,
  } = useOrderStore();
  
  const [selectedCategory, setSelectedCategory] = useState('brunch');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const table = getTableById(tableId);
  const orderHistory = getTableOrderHistory(tableId);
  
  // Séparer les commandes servies des commandes actives
  const servedOrders = orderHistory.filter(order => order.status === 'served');
  const activeOrders = orderHistory.filter(order => order.status !== 'served');

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
    setSelectedItem(menuItem);
    setIsModalOpen(true);
  };

  const handleConfirmCustomization = (customization: {
    removedIngredients: string[];
    supplements: string[];
    notes: string;
    quantity: number;
  }) => {
    if (!selectedItem) return;

    let fullNotes = '';
    if (customization.removedIngredients.length > 0) {
      fullNotes += `SANS: ${customization.removedIngredients.join(', ')}`;
    }
    if (customization.supplements.length > 0) {
      if (fullNotes) fullNotes += ' | ';
      fullNotes += `AVEC: ${customization.supplements.join(', ')}`;
    }
    if (customization.notes) {
      if (fullNotes) fullNotes += ' | ';
      fullNotes += customization.notes;
    }

    addItemToCurrentOrder({
      menuItem: selectedItem,
      quantity: customization.quantity,
      notes: fullNotes || undefined,
      removedIngredients: customization.removedIngredients,
      supplements: customization.supplements,
    });

    toast.success(`${selectedItem.name} ajouté (x${customization.quantity})`);
  };

  const handleSubmitOrder = async () => {
    if (currentOrder.length === 0) {
      toast.error('Ajoutez des articles avant de soumettre');
      return;
    }

    setIsSubmitting(true);
    try {
      const total = getCurrentOrderTotal();
      const order = addOrder({
        tableId,
        items: currentOrder,
        status: 'pending',
        totalAmount: total,
      });

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      updateTableStatus(tableId, 'occupied', order.id);
      clearCurrentOrder();
      
      toast.success('Commande envoyée en cuisine !');
      
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la commande");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReleaseTable = () => {
    if (activeOrders.length > 0) {
      toast.error('Impossible de libérer : des commandes sont encore actives');
      return;
    }

    if (servedOrders.length === 0) {
      toast.error('Aucune commande à finaliser');
      return;
    }

    // Libérer la table
    updateTableStatus(tableId, 'available');
    toast.success(`Table ${table.number} libérée`);
    
    setTimeout(() => {
      router.push('/');
    }, 1000);
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
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Bouton Historique */}
              {orderHistory.length > 0 && (
                <Button
                  variant="outline"
                  onClick={() => setShowHistory(!showHistory)}
                  className="flex items-center gap-2"
                >
                  <History className="w-5 h-5" />
                  Historique ({orderHistory.length})
                </Button>
              )}

              {/* Bouton Libérer la table */}
              {servedOrders.length > 0 && activeOrders.length === 0 && (
                <Button
                  variant="success"
                  onClick={handleReleaseTable}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Libérer la table
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Historique (affichage conditionnel) */}
        {showHistory && (
          <div className="mb-8">
            <OrderHistory orders={orderHistory} />
          </div>
        )}

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

      {/* Customization Modal */}
      <ItemCustomizationModal
        item={selectedItem!}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleConfirmCustomization}
      />
    </div>
  );
}