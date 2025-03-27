"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

type CartItem = {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  description?: string;
  category?: string;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const { toast } = useToast();

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(currentItems => {
      // Check if the item already exists in the cart using both ID and name
      const existingItem = currentItems.find(item => 
        item.id === newItem.id && item.name === newItem.name
      );
      
      if (existingItem) {
        // If item exists with same ID and name, update its quantity
        return currentItems.map(item =>
          (item.id === newItem.id && item.name === newItem.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      // If item doesn't exist, add it as a new item
      return [...currentItems, { ...newItem, quantity: 1 }];
    });

    toast({
      title: "Product added to cart",
      description: `${newItem.name} has been added to your cart.`,
      duration: 3000
    });
  };

  const removeItem = (id: string | number) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return currentItems.map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}