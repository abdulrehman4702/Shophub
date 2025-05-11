export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
}

export interface CartItem {
  productId: string;
  quantity: number;
  variant?: {
    name: string;
    value: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
}