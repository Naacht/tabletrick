// src/app/cuisine/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChefHat, RefreshCw } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { OrderList } from '@/components/cuisine/OrderList';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

export default function CuisinePage() {
  const { orders, updateOrderStatus } = useOrderStore();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Filtrer uniquement les commandes actives (pas encore servies)
  const activeOrders = orders.filter((order) => order.status !== 'served');

  // Rafraîchir les commandes depuis l'API
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/orders');
      const data = await response.json();
      
      if (data.orders) {
        // Note: Dans une vraie app, il faudrait synchroniser avec le store
        toast.success('Commandes mises à jour');
      }
    } catch (error) {
      toast.error('Erreur lors du rafraîchissement');
      console.error(error);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Gérer le changement de statut d'une commande
  const handleUpdateStatus = async (orderId: string, status: any) => {
    try {
      // Mettre à jour localement
      updateOrderStatus(orderId, status);

      // Envoyer à l'API
      await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      // Messages de succès selon le statut
      const messages = {
        preparing: 'Commande en préparation',
        ready: 'Commande prête !',
        served: 'Commande servie',
      };

      toast.success(messages[status as keyof typeof messages] || 'Statut mis à jour');
    } catch (error) {
      toast.error('Erreur lors de la mise à jour');
      console.error(error);
    }
  };

  // Auto-refresh toutes les 30 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

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
                <ChefHat className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Interface Cuisine
                  </h1>
                  <p className="text-sm text-gray-600">
                    {activeOrders.length} commande{activeOrders.length !== 1 ? 's' : ''} active{activeOrders.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
              Rafraîchir
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <ChefHat className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucune commande en cours
            </h2>
            <p className="text-gray-600 mb-6">
              Les nouvelles commandes apparaîtront ici automatiquement
            </p>
            <Link href="/">
              <Button variant="primary">
                Retour au tableau de bord
              </Button>
            </Link>
          </div>
        ) : (
          <OrderList
            orders={activeOrders}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </main>
    </div>
  );
}