import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { CartLine, Product } from '../types/backend';
import { orderSubtotal } from '../lib/shop';

const STORAGE_KEY = 'stakeys_cart_v1';

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStored(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line): line is CartLine =>
        line && typeof line.productId === 'string' && typeof line.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* storage unavailable (private mode) — cart stays in memory */
    }
  }, [lines]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((line) => line.productId === product.id);
      if (existing) {
        return prev.map((line) =>
          line.productId === product.id
            ? { ...line, quantity: Math.min(line.quantity + quantity, product.stock || 99) }
            : line
        );
      }
      return [
        ...prev,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity,
          imageUrl: product.imageUrl,
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((line) => line.productId !== productId)
        : prev.map((line) =>
            line.productId === productId ? { ...line, quantity } : line
          )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((prev) => prev.filter((line) => line.productId !== productId));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = lines.reduce((sum, line) => sum + line.quantity, 0);
    return {
      lines,
      count,
      subtotal: orderSubtotal(lines),
      addItem,
      setQuantity,
      removeItem,
      clear,
    };
  }, [lines, addItem, setQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
