// src/app/layout.tsx
'use client';

import { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { useOrderStore } from '@/store/useOrderStore';
import { useTableStore } from '@/store/useTableStore';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hydrateOrders = useOrderStore((state) => state.hydrate);
  const hydrateTables = useTableStore((state) => state.hydrate);
  
  // Charger les données au démarrage
  useEffect(() => {
    hydrateOrders();
    hydrateTables();
  }, [hydrateOrders, hydrateTables]);
  
  return (
    <html lang="fr">
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}