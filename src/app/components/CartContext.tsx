// src/app/components/CartContext.tsx
'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { IProduct } from '../models/Product';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('cartItems');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const addToCart = (item: string) => {
    setCartItems(prev => {
      const found = prev.find((i) => i === item);
      if (found) {
        return prev.map(i => i === item ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems(prev => {
      const found = prev.find(i => i === item);
      if (found.quantity === 1) {
        return prev.filter(i => i.id !== item);
      }
      return prev.map(i => i === item ? { ...i, quantity: i.quantity - 1 } : i);
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
