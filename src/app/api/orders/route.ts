// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/types';

// Simulation d'une base de données en mémoire
let orders: Order[] = [];

// GET /api/orders - Récupérer toutes les commandes
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const tableId = searchParams.get('tableId');
    
    let filteredOrders = orders;
    
    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status);
    }
    
    if (tableId) {
      filteredOrders = filteredOrders.filter((order) => order.tableId === tableId);
    }
    
    return NextResponse.json({ orders: filteredOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
}

// POST /api/orders - Créer une nouvelle commande
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newOrder: Order = {
      ...body,
      createdAt: new Date(body.createdAt),
      updatedAt: new Date(body.updatedAt),
    };
    
    // Validation
    if (!newOrder.tableId || !newOrder.items || newOrder.items.length === 0) {
      return NextResponse.json(
        { error: 'Données de commande invalides' },
        { status: 400 }
      );
    }
    
    orders.push(newOrder);
    
    return NextResponse.json({ order: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}