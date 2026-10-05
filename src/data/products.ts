export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  wasPrice?: number;
  image: string;
}

export const PRODUCT_CATEGORIES = [
  'All Items',
  'Second hand parts',
  "Men's Bikes",
  "Women's Bikes",
  "Children's bikes",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: 'carrera-titan',
    name: 'Carrera Titan',
    category: "Men's Bikes",
    price: 150,
    wasPrice: 180,
    image: '/images/product-carrera-titan.jpg',
  },
  {
    id: 'riley-escooter',
    name: 'Riley E-Scooter',
    category: 'Second hand parts',
    price: 100,
    image: '/images/product-riley-escooter.jpg',
  },
  {
    id: 'shimano-front-brake',
    name: 'Shimano Front Brake',
    category: 'Second hand parts',
    price: 10,
    image: '/images/product-shimano-brake.jpg',
  },
  {
    id: 'rockshox-dropper',
    name: 'RockShox Dropper Reverb Stealth',
    category: 'Second hand parts',
    price: 50,
    wasPrice: 80,
    image: '/images/product-rockshox-dropper.jpg',
  },
  {
    id: 'manitou-airshock',
    name: 'Manitou Swinger Coil (Airshock)',
    category: 'Second hand parts',
    price: 40,
    image: '/images/product-manitou-airshock.jpg',
  },
  {
    id: 'enduro-pivot-bearings',
    name: 'Enduro Pivot Bearings',
    category: 'Second hand parts',
    price: 5,
    wasPrice: 10,
    image: '/images/product-enduro-bearings.jpg',
  },
  {
    id: 'raceface-crank-arms',
    name: 'Race Face Crank Arms',
    category: 'Second hand parts',
    price: 60,
    image: '/images/product-raceface-cranks.jpg',
  },
];

export const formatPrice = (value: number): string =>
  new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: 2,
  }).format(value);
