// src/components/dashboard/TableCard.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import { Table } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface TableCardProps {
  table: Table;
}

export const TableCard: React.FC<TableCardProps> = ({ table }) => {
  const isAvailable = table.status === 'available';

  return (
    <Link href={`/table/${table.id}`}>
      <div
        className={cn(
          'p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg',
          isAvailable
            ? 'border-green-200 bg-green-50 hover:border-green-400'
            : table.status === 'occupied'
            ? 'border-red-200 bg-red-50 hover:border-red-400'
            : 'border-orange-200 bg-orange-50 hover:border-orange-400'
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-3xl font-bold text-gray-900">
            {table.number}
          </h3>
          <Badge status={table.status} />
        </div>

        {table.status === 'occupied' && table.currentOrderId && (
          <div className="flex items-center gap-2 text-blue-600">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">Commande en cours</span>
          </div>
        )}
      </div>
    </Link>
  );
};