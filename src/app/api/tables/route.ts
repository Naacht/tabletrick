// src/app/api/tables/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_TABLES } from '@/lib/mockData';

// Simulation d'une base de données en mémoire
let tables = [...INITIAL_TABLES];

// GET /api/tables - Récupérer toutes les tables
export async function GET() {
  try {
    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des tables' },
      { status: 500 }
    );
  }
}

// POST /api/tables - Créer ou mettre à jour des tables
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tables: newTables } = body;
    
    if (!newTables || !Array.isArray(newTables)) {
      return NextResponse.json(
        { error: 'Format de données invalide' },
        { status: 400 }
      );
    }
    
    tables = newTables;
    
    return NextResponse.json({ tables }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour des tables' },
      { status: 500 }
    );
  }
}