export interface Product {
    id: number;
    name: string;
    price: number;
    stock: boolean;
    category: 'Food' | 'Toys' | 'Grooming';
    image?: string;
  }
  