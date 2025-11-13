// TableCard.tsx
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
          'p-4 sm:p-6 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-lg',
          'min-h-[80px] sm:min-h-[100px]',
          isAvailable
            ? 'border-green-200 bg-green-50 hover:border-green-400'
            : table.status === 'occupied'
            ? 'border-red-200 bg-red-50 hover:border-red-400'
            : 'border-orange-200 bg-orange-50 hover:border-orange-400'
        )}
      >
        <div className="flex items-center justify-between mb-2 sm:mb-3">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
            {table.number}
          </h3>
          <Badge status={table.status} />
        </div>
        
        {table.status === 'occupied' && table.currentOrderId && (
          <div className="flex items-center gap-2 text-blue-600">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs font-medium">En cours</span>
          </div>
        )}
      </div>
    </Link>
  );
};