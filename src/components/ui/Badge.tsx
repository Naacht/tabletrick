// src/components/ui/Badge.tsx
import React from 'react';
import { cn } from '@/lib/utils';
import { OrderStatus, TableStatus } from '@/types';

interface BadgeProps {
  status: OrderStatus | TableStatus;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, className }) => {
  const baseStyles = 'px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide';
  
  const statusStyles: Record<OrderStatus | TableStatus, string> = {
    // Order statuses
    pending: 'bg-yellow-100 text-yellow-800',
    preparing: 'bg-blue-100 text-blue-800',
    ready: 'bg-green-100 text-green-800',
    served: 'bg-gray-100 text-gray-800',
    
    // Table statuses
    available: 'bg-green-100 text-green-800',
    occupied: 'bg-red-100 text-red-800',
    reserved: 'bg-orange-100 text-orange-800',
  };
  
  const statusLabels: Record<OrderStatus | TableStatus, string> = {
    // Order statuses
    pending: 'En attente',
    preparing: 'En préparation',
    ready: 'Prêt',
    served: 'Servi',
    
    // Table statuses
    available: 'Disponible',
    occupied: 'Occupée',
    reserved: 'Réservée',
  };
  
  return (
    <span className={cn(baseStyles, statusStyles[status], className)}>
      {statusLabels[status]}
    </span>
  );
};