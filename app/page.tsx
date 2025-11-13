// src/app/page.tsx
'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useTableStore } from '@/store/useTableStore';
import { TableGrid } from '@/components/dashboard/TableGrid';
import { ChefHat, Home } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { History } from 'lucide-react';
import { storage } from '@/lib/storage';

// app/page.tsx - CORRECTION HEADER
export default function HomePage() {
  const { tables } = useTableStore();

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden"> {/* ✅ FIX */}
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4"> {/* ✅ Padding réduit */}
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo + Titre */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0"> {/* ✅ min-w-0 pour truncate */}
              <Home className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 flex-shrink-0" />
              <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                Restaurant Commande
              </h1>
            </div>

            {/* Boutons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Link href="/historique">
                <Button 
                  variant="outline" 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2"
                >
                  <History className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden md:inline">Historique</span>
                </Button>
              </Link>
              
              <Link href="/cuisine">
                <Button 
                  variant="primary" 
                  className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2"
                >
                  <ChefHat className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden md:inline">Cuisine</span>
                </Button>
              </Link>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
        {/* ✅ Padding réduit + overflow-x-hidden */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h2>
          <p className="text-sm sm:text-base text-gray-600">
            Sélectionnez une table pour prendre une commande
          </p>
        </div>
        
        <TableGrid tables={tables} />
      </main>
    </div>
  );
}