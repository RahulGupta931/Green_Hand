export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  care: string;
  light: 'low' | 'medium' | 'high';
  water: 'low' | 'medium' | 'high';
  featured: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
};