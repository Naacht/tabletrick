// TableGrid.tsx
'use client';

import React from 'react';
import { Table } from '@/types';
import { TableCard } from './TableCard';

interface TableGridProps {
  tables: Table[];
}

export const TableGrid: React.FC<TableGridProps> = ({ tables }) => {
  const exteriorTables = tables.filter((table) => table.location === 'exterior');
  const interiorTables = tables.filter((table) => table.location === 'interior');

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Tables Extérieur */}
      <div>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
            Extérieur
          </h3>
          <span className="text-xs sm:text-sm text-gray-600">
            ({exteriorTables.filter((t) => t.status === 'available').length}/
            {exteriorTables.length} disponibles)
          </span>
        </div>
        
        <div className="grid 
                        grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:grid-cols-6 
                        gap-2 sm:gap-3 lg:gap-4">
          {exteriorTables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      </div>

      {/* Tables Intérieur */}
      <div>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <h3 className="text-lg sm:text-2xl font-bold text-gray-900">
            Intérieur
          </h3>
          <span className="text-xs sm:text-sm text-gray-600">
            ({interiorTables.filter((t) => t.status === 'available').length}/
            {interiorTables.length} disponibles)
          </span>
        </div>
        
        <div className="grid 
                        grid-cols-2 
                        sm:grid-cols-3 
                        md:grid-cols-4 
                        lg:grid-cols-6 
                        gap-2 sm:gap-3 lg:gap-4">
          {interiorTables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      </div>
    </div>
  );
};