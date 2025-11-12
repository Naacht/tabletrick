// app/historique/page.tsx
// À ajouter aussi dans app/page.tsx dans le header :
// <Link href="/historique">
//   <Button variant="outline" className="flex items-center gap-2">
//     <History className="w-5 h-5" />
//     Historique
//   </Button>
// </Link>
'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, History, Calendar, TrendingUp, DollarSign, Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import { useTableStore } from '@/store/useTableStore';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatPrice, formatDate, formatTime } from '@/lib/utils';
import { OrderStatus } from '@/types';

export default function HistoriquePage() {
  const { orders } = useOrderStore();
  const { getTableById } = useTableStore();
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all');
  const [filterDate, setFilterDate] = useState<'today' | 'week' | 'all'>('all');

  // Filtrer les commandes
  const filteredOrders = useMemo(() => {
    let filtered = [...orders];

    // Filtre par statut
    if (filterStatus !== 'all') {
      filtered = filtered.filter(order => order.status === filterStatus);
    }

    // Filtre par date
    if (filterDate !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

      filtered = filtered.filter(order => {
        const orderDate = new Date(order.createdAt);
        if (filterDate === 'today') {
          return orderDate >= today;
        } else if (filterDate === 'week') {
          return orderDate >= weekAgo;
        }
        return true;
      });
    }

    // Trier par date décroissante
    return filtered.sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [orders, filterStatus, filterDate]);

  // Statistiques
  const stats = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = filteredOrders.length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalItems = filteredOrders.reduce((sum, order) => 
      sum + order.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalItems,
    };
  }, [filteredOrders]);

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
                <History className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Historique des commandes
                  </h1>
                  <p className="text-sm text-gray-600">
                    {filteredOrders.length} commande{filteredOrders.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              <p className="text-sm text-gray-600">Chiffre d'affaires</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(stats.totalRevenue)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-5 h-5 text-blue-600" />
              <p className="text-sm text-gray-600">Commandes</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalOrders}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <p className="text-sm text-gray-600">Panier moyen</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {formatPrice(stats.averageOrderValue)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex items-center gap-3 mb-2">
              <Calendar className="w-5 h-5 text-orange-600" />
              <p className="text-sm text-gray-600">Articles vendus</p>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {stats.totalItems}
            </p>
          </div>
        </div>

        {/* Filtres */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Filtre par statut */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Statut
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: 'Toutes' },
                  { value: 'pending', label: 'En attente' },
                  { value: 'preparing', label: 'En préparation' },
                  { value: 'ready', label: 'Prêt' },
                  { value: 'served', label: 'Servi' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilterStatus(item.value as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterStatus === item.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filtre par date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Période
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'today', label: "Aujourd'hui" },
                  { value: 'week', label: 'Cette semaine' },
                  { value: 'all', label: 'Tout' },
                ].map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setFilterDate(item.value as any)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      filterDate === item.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Liste des commandes */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-12 text-center">
            <History className="w-24 h-24 mx-auto text-gray-300 mb-6" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Aucune commande
            </h2>
            <p className="text-gray-600">
              Aucune commande ne correspond à vos filtres
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const table = getTableById(order.tableId);
              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow p-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          Table {table?.number || order.tableId}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge status={order.status} />
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {formatPrice(order.totalAmount)}
                      </p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="border-t pt-4">
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-start justify-between py-2"
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
                                {item.notes}
                              </p>
                            )}
                          </div>
                          <span className="text-gray-600 font-medium ml-4">
                            {formatPrice(item.menuItem.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}