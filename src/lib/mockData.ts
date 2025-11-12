// src/lib/mockData.ts
import { Table } from '@/types';

export const INITIAL_TABLES: Table[] = [
  // Tables Extérieur (E0 à E5)
  { id: 'e0', number: 'E0', capacity: 2, status: 'available', location: 'exterior' },
  { id: 'e1', number: 'E1', capacity: 4, status: 'available', location: 'exterior' },
  { id: 'e2', number: 'E2', capacity: 2, status: 'available', location: 'exterior' },
  { id: 'e3', number: 'E3', capacity: 4, status: 'available', location: 'exterior' },
  { id: 'e4', number: 'E4', capacity: 6, status: 'available', location: 'exterior' },
  { id: 'e5', number: 'E5', capacity: 2, status: 'available', location: 'exterior' },
  
  // Tables Intérieur (1 à 8)
  { id: 't1', number: '1', capacity: 2, status: 'available', location: 'interior' },
  { id: 't2', number: '2', capacity: 4, status: 'available', location: 'interior' },
  { id: 't3', number: '3', capacity: 2, status: 'available', location: 'interior' },
  { id: 't4', number: '4', capacity: 6, status: 'available', location: 'interior' },
  { id: 't5', number: '5', capacity: 4, status: 'available', location: 'interior' },
  { id: 't6', number: '6', capacity: 2, status: 'available', location: 'interior' },
  { id: 't7', number: '7', capacity: 4, status: 'available', location: 'interior' },
  { id: 't8', number: '8', capacity: 4, status: 'available', location: 'interior' },
];