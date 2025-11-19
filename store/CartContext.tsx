import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, CartState } from '../types';

interface CartContextType {
  cart: CartState;
  addToCart: (password: string, wasAIGenerated?: boolean, businessContext?: string) => void;
  removeFromCart: (createdAt: number) => void;
  updateQuantity: (createdAt: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const PRODUCT_PRICE = 29.99;

export const CartProvider = ({ children }: { children?: ReactNode }) => {
  const [cart, setCart] = useState<CartState>(() => {
    const savedCart = localStorage.getItem('password_cart');
    return savedCart ? JSON.parse(savedCart) : { items: [], total: 0 };
  });

  useEffect(() => {
    localStorage.setItem('password_cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotal = (items: CartItem[]) => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const addToCart = (password: string, wasAIGenerated: boolean = false, businessContext?: string) => {
    setCart((prev) => {
      const newItem: CartItem = {
        id: 'cloud-plate-001',
        name: 'Cloud WiFi Sign Plate',
        price: PRODUCT_PRICE,
        customPassword: password,
        quantity: 1,
        createdAt: Date.now(),
        wasAIGenerated,
        businessContext
      };
      const newItems = [...prev.items, newItem];
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const removeFromCart = (createdAt: number) => {
    setCart((prev) => {
      const newItems = prev.items.filter((item) => item.createdAt !== createdAt);
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const updateQuantity = (createdAt: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => {
      const newItems = prev.items.map((item) =>
        item.createdAt === createdAt ? { ...item, quantity } : item
      );
      return {
        items: newItems,
        total: calculateTotal(newItems),
      };
    });
  };

  const clearCart = () => {
    setCart({ items: [], total: 0 });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};