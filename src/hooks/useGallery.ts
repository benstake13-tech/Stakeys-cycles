import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchGalleryItems, subscribeToGallery } from '../lib/gallery';
import type { GalleryItem } from '../types/backend';

interface GalleryState {
  items: GalleryItem[];
  loading: boolean;
  error: string | null;
  live: boolean;
  refresh: () => void;
}

/**
 * Loads the "Jobs we're proud of" photos from the shared backend and keeps them
 * current as staff publish new work, with a periodic fallback refresh.
 */
export function useGallery(): GalleryState {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [live, setLive] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(async () => {
    try {
      const rows = await fetchGalleryItems();
      if (!mounted.current) return;
      setItems(rows);
      setError(null);
    } catch (err) {
      if (!mounted.current) return;
      setError(err instanceof Error ? err.message : 'Could not load gallery');
    } finally {
      if (mounted.current) setLoading(false);
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    load();

    const unsubscribe = subscribeToGallery(() => {
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

  return { items, loading, error, live, refresh: load };
}
