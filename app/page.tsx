// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTableStore } from '@/store/useTableStore';
import { TableGrid } from '@/components/dashboard/TableGrid';
import { ChefHat, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { History } from 'lucide-react';

export default function HomePage() {
  const { tables } = useTableStore();
  
  useEffect(() => {
    // Charger les tables depuis l'API (optionnel)
    // fetch('/api/tables').then(res => res.json()).then(data => setTables(data.tables));
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">
                Restaurant Commande
              </h1>
            </div>
            <Link href="/historique">
            <Button variant="outline" className="flex items-center gap-2">
              <History className="w-5 h-5" />
              Historique
            </Button>
          </Link>
            <Link href="/cuisine">
              <Button variant="primary" className="flex items-center gap-2">
                <ChefHat className="w-5 h-5" />
                Interface Cuisine
              </Button>
            </Link>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-gray-600">
            Sélectionnez une table pour prendre une commande
          </p>
        </div>
        
        <TableGrid tables={tables} />
      </main>
    </div>
  );
}