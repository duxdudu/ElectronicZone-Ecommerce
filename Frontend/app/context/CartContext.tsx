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
    setItems((currentItems) => {
      const numericId = typeof newItem.id === 'string' ? parseInt(newItem.id) : newItem.id;
      const existingItemIndex = currentItems.findIndex(item => item.id === numericId && item.name === newItem.name);
      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      }
      return [...currentItems, { ...newItem, id: numericId, quantity: 1 }];
    });

    toast({
      title: "Product added to cart",
      description: `${newItem.name} has been added to your cart.`,
      duration: 3000
    });
  };

  const removeItem = (id: string | number) => {
    const numericId = typeof id === 'string' ? parseInt(id) : id;
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === numericId);
      if (existingItem && existingItem.quantity > 1) {
        return currentItems.map(item =>
          item.id === numericId && item.name === existingItem.name && item.price === existingItem.price
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return currentItems.filter(item => !(item.id === numericId && item.name === existingItem?.name && item.price === existingItem?.price));
    });
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    setItems(currentItems => {
      const numericId = typeof id === 'string' ? parseInt(id) : id;
      return currentItems.map(item =>
        item.id === numericId ? { ...item, quantity } : item
      );
    });
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