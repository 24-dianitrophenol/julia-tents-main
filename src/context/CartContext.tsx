import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { Tent } from '@/data/tents';

export interface CartItem {
  tent: Tent;
  quantity: number;
  durationDays: number;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (tent: Tent, quantity: number, durationDays: number) => void;
  removeItem: (tentId: string) => void;
  updateItem: (tentId: string, quantity: number, durationDays: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((tent: Tent, quantity: number, durationDays: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.tent.id === tent.id);
      if (existing) {
        return prev.map(i =>
          i.tent.id === tent.id ? { ...i, quantity, durationDays } : i
        );
      }
      return [...prev, { tent, quantity, durationDays }];
    });
  }, []);

  const removeItem = useCallback((tentId: string) => {
    setItems(prev => prev.filter(i => i.tent.id !== tentId));
  }, []);

  const updateItem = useCallback((tentId: string, quantity: number, durationDays: number) => {
    setItems(prev =>
      prev.map(i => (i.tent.id === tentId ? { ...i, quantity, durationDays } : i))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.tent.pricePerDay * i.quantity * i.durationDays, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateItem, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
