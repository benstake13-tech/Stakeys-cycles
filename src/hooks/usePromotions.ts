import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchPromotions, subscribeToPromotions } from '../lib/promotions';
import type { ShopPromotion } from '../types/backend';

interface PromotionsState {
  promotions: ShopPromotion[];
  loading: boolean;
  error: string | null;
  live: boolean;
  refresh: () => void;
}

const EXPIRY_TICK_MS = 60_000;

/**
 * Loads promotions from the shared backend and keeps them current: realtime
 * pushes from staff edits plus a periodic tick so date-based expiry applies
 * without a reload.
 */
export function usePromotions(): PromotionsState {
  const [promotions, setPromotions] = useState<ShopPromotion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    try {
      const rows = await fetchPromotions();
      if (!mounted.current) return;
      setPromotions(rows);
      setError(null);
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Could not load promotions');
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();

    const unsubscribe = subscribeToPromotions(() => {
      setLive(true);
      load();
    });

    const tick = setInterval(load, EXPIRY_TICK_MS);

    return () => {
      mounted.current = false;
      unsubscribe();
      clearInterval(tick);
    };
  }, [load]);

  return { promotions, loading, error, live, refresh: load };
}

/** Visible promotions, newest first, with expired entries filtered out. */
export function useActivePromotions(): PromotionsState {
  const state = usePromotions();
  return {
    ...state,
    promotions: state.promotions.filter((p) => p.status !== 'expired'),
  };
}
