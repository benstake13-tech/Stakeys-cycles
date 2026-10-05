import { getSupabaseClient } from './supabase';
import type { GalleryItem, GalleryRow } from '../types/backend';

export const GALLERY_TABLE = 'gallery_items';

function toItem(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    imageUrl: row.image_url ?? '',
    title: row.title ?? '',
    caption: row.caption ?? '',
    vehicleType: row.vehicle_type ?? '',
    sortOrder: row.sort_order ?? 0,
    published: row.published ?? true,
    createdAt: row.created_at ?? '',
  };
}

/** Published job photos, newest first. */
export async function fetchGalleryItems(): Promise<GalleryItem[]> {
  const { data, error } = await getSupabaseClient()
    .from(GALLERY_TABLE)
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => toItem(row as GalleryRow));
}

/** Fires the callback whenever staff add, edit or remove a job photo. */
export function subscribeToGallery(onChange: () => void): () => void {
  const channel = getSupabaseClient()
    .channel('gallery_items_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: GALLERY_TABLE },
      () => onChange()
    )
    .subscribe();

  return () => {
    getSupabaseClient().removeChannel(channel);
  };
}
