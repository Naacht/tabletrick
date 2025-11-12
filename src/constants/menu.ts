// src/constants/menu.ts
import { MenuItem } from '@/types';

export const MENU_ITEMS: MenuItem[] = [
  // === BRUNCH ===
  {
    id: 'br1',
    name: 'Green Toast',
    category: 'brunch',
    price: 13.00,
    description: 'Pain brioche toasté, avocat, concombre, cream cheese, œufs brouillés, alfa. Supplément: Pain sans gluten/bacon/saumon fumé +2€',
  },
  {
    id: 'br2',
    name: 'Pain Perdu Salé',
    category: 'brunch',
    price: 14.20,
    description: 'Pain brioche, bacon, œufs brouillés, cheddar, ciboulette. Supplément: Avocat +1.5€',
  },
  {
    id: 'br3',
    name: 'Salmon Toast',
    category: 'brunch',
    price: 13.50,
    description: 'Pain brioche toasté, saumon fumé, cream cheese, oignons nouveaux, zeste d\'orange, alfa blanche. Supplément: Avocat +1.5€, Œuf brouillé +1.5€',
  },
  {
    id: 'br4',
    name: 'Chicken Waffle',
    category: 'brunch',
    price: 15.50,
    description: 'Gaufre maison, poulet frit, yaourt franche, œuf au plat, oignons caramélisés, sauce OMSS. Supplément: Bacon +2€',
  },
  {
    id: 'br5',
    name: 'Burrata Toast',
    category: 'brunch',
    price: 14.80,
    description: 'Pain brioche toasté, champignons rôtis et cerises, bébé roquette, alfa blanche, burrata',
  },
  {
    id: 'br6',
    name: 'Açai Bowl',
    category: 'brunch',
    price: 12.50,
    description: 'Açai, granola maison, poudre de coco, banane, fruits de saison. Supplément: Beurre de cacahuète +1.5€',
  },
  {
    id: 'br7',
    name: 'Yaourt Granola',
    category: 'brunch',
    price: 9.50,
    description: 'Yaourt grec, granola maison, banane, fruits de saison, sirop d\'érable. Supplément: Beurre de cacahuète +1.5€',
  },
  {
    id: 'br8',
    name: 'Blueberry French Toast',
    category: 'brunch',
    price: 13.00,
    description: 'Pain brioche, poire pochée, fruits de saison, sirop de myrtilles, feuille de menthe',
  },

  // === PASTRIES - CAKES ===
  {
    id: 'c1',
    name: 'Banana Cake pépite de chocolat',
    category: 'pastries',
    price: 4.50,
  },
  {
    id: 'c2',
    name: 'Carrot Cake',
    category: 'pastries',
    price: 4.50,
  },
  {
    id: 'c3',
    name: 'Matcha Cake marbré',
    category: 'pastries',
    price: 5.00,
  },
  {
    id: 'c4',
    name: 'Citron Cake',
    category: 'pastries',
    price: 4.50,
  },

  // === PASTRIES - COOKIES ===
  {
    id: 'ck1',
    name: 'Cookie pépite de chocolat',
    category: 'pastries',
    price: 4.00,
  },
  {
    id: 'ck2',
    name: 'Cookie matcha pépite de chocolat blanc',
    category: 'pastries',
    price: 4.50,
  },

  // === PASTRIES - BROWNIES ===
  {
    id: 'bw1',
    name: 'Brownie chocolat (vegan/sans gluten)',
    category: 'pastries',
    price: 5.00,
  },
  {
    id: 'bw2',
    name: 'Brownie matcha',
    category: 'pastries',
    price: 5.00,
  },

  // === CAFÉ DE SPÉCIALITÉ ===
  {
    id: 'cf1',
    name: 'Espresso',
    category: 'cafe',
    price: 2.50,
  },
  {
    id: 'cf2',
    name: 'Double espresso',
    category: 'cafe',
    price: 3.00,
  },
  {
    id: 'cf3',
    name: 'Americano',
    category: 'cafe',
    price: 3.50,
  },
  {
    id: 'cf4',
    name: 'Iced americano',
    category: 'cafe',
    price: 5.00,
  },
    {
    id: 'cf6',
    name: 'Cortado',
    category: 'cafe',
    price: 4.00,
  },
  {
    id: 'cf7',
    name: 'Flat white',
    category: 'cafe',
    price: 5.00,
  },
  {
    id: 'cf8',
    name: 'Cappuccino',
    category: 'cafe',
    price: 4.80,
  },
  {
    id: 'cf9',
    name: 'Macchiato latte',
    category: 'cafe',
    price: 5.00,
  },
  {
    id: 'cf10',
    name: 'Latte',
    category: 'cafe',
    price: 5.50,
  },

  // === MATCHA ===
  {
    id: 'm1',
    name: 'Matcha latte',
    category: 'matcha',
    price: 5.50,
  },
  {
    id: 'm2',
    name: 'Chocolat chaud au matcha',
    category: 'matcha',
    price: 6.50,
  },
  {
    id: 'm3',
    name: 'Iced matcha Strawberry',
    category: 'matcha',
    price: 6.50,
  },
  {
    id: 'm4',
    name: 'Iced matcha Mango',
    category: 'matcha',
    price: 7.00,
  },
  {
    id: 'm5',
    name: 'Iced matcha Raspberry',
    category: 'matcha',
    price: 7.00,
  },
  {
    id: 'm6',
    name: 'Matcha Ceremonial',
    category: 'matcha',
    price: 8.00,
  },

  // === COMFORT DRINKS ===
  {
    id: 'cd1',
    name: 'Chai latte',
    category: 'comfort',
    price: 5.50,
  },
  {
    id: 'cd2',
    name: 'Dirty chai',
    category: 'comfort',
    price: 6.00,
  },
  {
    id: 'cd3',
    name: 'Chocolat chaud',
    category: 'comfort',
    price: 5.50,
  },
  {
    id: 'cd4',
    name: 'Mocaccino',
    category: 'comfort',
    price: 6.00,
  },
  {
    id: 'cd5',
    name: 'Sesame latte',
    category: 'comfort',
    price: 6.00,
  },
  {
    id: 'cd6',
    name: 'Dirty Sesame',
    category: 'comfort',
    price: 6.50,
  },
  {
    id: 'cd7',
    name: 'Hojicha latte',
    category: 'comfort',
    price: 5.50,
  },
  {
    id: 'cd8',
    name: 'Thé',
    category: 'comfort',
    price: 5.50,
  },

  // === JUS FRAIS ===
  {
    id: 'jf1',
    name: 'Orange detox',
    category: 'jus',
    price: 6.50,
    description: 'Orange, carotte, citron, gingembre',
  },
  {
    id: 'jf2',
    name: 'Vert detox',
    category: 'jus',
    price: 6.50,
    description: 'Pomme, concombre, kiwi, citron vert, gingembre',
  },

];

export const CATEGORIES = [
  { id: 'brunch', label: 'Brunch', icon: '🍳' },
  { id: 'pastries', label: 'Pastries', icon: '🍰' },
  { id: 'cafe', label: 'Café de Spécialité', icon: '☕' },
  { id: 'matcha', label: 'Matcha', icon: '🍵' },
  { id: 'comfort', label: 'Comfort Drinks', icon: '🫖' },
  { id: 'jus', label: 'Jus Frais', icon: '🍊' },
] as const;