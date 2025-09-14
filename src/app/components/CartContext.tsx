'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface CartProviderProps {
  children: ReactNode;
}

interface CartItem {
  ean: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (ean: string) => void;
  removeFromCart: (ean: string) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const addToCart = (ean: string) => {
    setCartItems(prev => {
      const found = prev.find(i => i.ean === ean);
      if (found) {
        return prev.map(i =>
          i.ean === ean ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ean, quantity: 1 }];
    });
  };

  const removeFromCart = (ean: string) => {
    setCartItems(prev => {
      const found = prev.find(i => i.ean === ean);
      if (!found) return prev;
      if (found.quantity === 1) {
        return prev.filter(i => i.ean !== ean);
      }
      return prev.map(i =>
        i.ean === ean ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  const clearCart = () => setCartItems([]);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
