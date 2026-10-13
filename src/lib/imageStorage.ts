import { getSupabaseClient } from './supabase';

export const PUBLIC_IMAGE_BUCKET = 'stakeys-images';
export const PRIVATE_IMAGE_BUCKET = 'stakeys-private';

export function publicImageUrl(path: string): string {
  return getSupabaseClient().storage.from(PUBLIC_IMAGE_BUCKET).getPublicUrl(path).data.publicUrl;
}

export const officialLogoUrl = () => publicImageUrl('branding/official-logo.png');

export type PublicImage = {
  id: string;
  storage_path: string;
  image_category: string;
  alt_text: string | null;
  related_entity_id: string | null;
};

export async function listPublicImages(category: string): Promise<PublicImage[]> {
  const { data, error } = await getSupabaseClient().from('app_images')
    .select('id,storage_path,image_category,alt_text,related_entity_id')
    .eq('bucket_name', PUBLIC_IMAGE_BUCKET)
    .eq('image_category', category)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as PublicImage[];
}
