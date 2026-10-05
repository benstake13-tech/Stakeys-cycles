import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchProducts, subscribeToProducts } from '../lib/shop';
import type { Product } from '../types/backend';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  live: boolean;
  refresh: () => void;
}

/**
 * Loads the shop catalogue from the shared backend and keeps it current as
 * staff add or restock items, with a periodic fallback refresh.
 */
export function useProducts(): ProductsState {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    try {
      const rows = await fetchProducts();
      if (!mounted.current) return;
      setProducts(rows);
      setError(null);
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Could not load the shop');
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();

    const unsubscribe = subscribeToProducts(() => {
      setLive(true);
      load();
    });

    const tick = setInterval(load, 120_000);

    return () => {
      mounted.current = false;
      unsubscribe();
      clearInterval(tick);
    };
  }, [load]);

  return { products, loading, error, live, refresh: load };
}
