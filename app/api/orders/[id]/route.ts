// src/app/api/orders/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { Order } from '@/types';

// Simulation d'une base de données en mémoire (partagée avec route.ts)
// Dans un vrai projet, ce serait une vraie base de données
let orders: Order[] = [];

// GET /api/orders/[id] - Récupérer une commande par ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const order = orders.find((o) => o.id === id);
    
    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la commande' },
      { status: 500 }
    );
  }
}

// PUT /api/orders/[id] - Mettre à jour une commande
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const orderIndex = orders.findIndex((o) => o.id === params.id);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }
    
    orders[orderIndex] = {
      ...orders[orderIndex],
      ...body,
      updatedAt: new Date(),
    };
    
    return NextResponse.json({ order: orders[orderIndex] }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la commande' },
      { status: 500 }
    );
  }
}

// DELETE /api/orders/[id] - Supprimer une commande
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const orderIndex = orders.findIndex((o) => o.id === params.id);
    
    if (orderIndex === -1) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      );
    }
    
    orders.splice(orderIndex, 1);
    
    return NextResponse.json(
      { message: 'Commande supprimée avec succès' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Erreur lors de la suppression de la commande' },
      { status: 500 }
    );
  }
}