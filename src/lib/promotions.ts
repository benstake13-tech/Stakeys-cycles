import { getSupabaseClient } from './supabase';
import type {
  PromotionRow,
  PromotionStatus,
  ShopPromotion,
  VehicleCategory,
} from '../types/backend';

const CATEGORIES: VehicleCategory[] = ['cycle', 'ebike', 'electric_scooter', 'cargo'];

function toCategory(value: string): VehicleCategory | null {
  return (CATEGORIES as string[]).includes(value) ? (value as VehicleCategory) : null;
}

/** Effective status: dates always win, so an elapsed end date reads as expired. */
export function resolveStatus(status: string | null, endDate: string | null): PromotionStatus {
  if (endDate) {
    const end = new Date(`${endDate}T23:59:59`);
    if (!Number.isNaN(end.getTime()) && end < new Date()) return 'expired';
  }
  if (status === 'active' || status === 'upcoming' || status === 'expired') return status;
  return 'active';
}

export function mapPromotionRow(row: PromotionRow): ShopPromotion {
  return {
    id: row.id,
    title: row.title ?? 'Special offer',
    subtitle: row.subtitle ?? '',
    code: row.code ?? '',
    discountPercentage: row.discount_percentage ?? undefined,
    discountAmount: row.discount_amount ?? undefined,
    badgeText: row.badge_text ?? '',
    status: resolveStatus(row.status, row.end_date),
    startDate: row.start_date ?? '',
    endDate: row.end_date ?? '',
    termsAndConditions: Array.isArray(row.terms_and_conditions)
      ? row.terms_and_conditions
      : [],
    eligibleCategories: (row.eligible_categories ?? [])
      .map(toCategory)
      .filter((c): c is VehicleCategory => c !== null),
    bgGradient: row.bg_gradient ?? '',
    featured: row.featured ?? false,
  };
}

const SELECT =
  'id,title,subtitle,code,badge_text,status,start_date,end_date,discount_percentage,discount_amount,terms_and_conditions,eligible_categories,bg_gradient,featured';

export async function fetchPromotions(): Promise<ShopPromotion[]> {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('promotions')
    .select(SELECT)
    .order('featured', { ascending: false })
    .order('start_date', { ascending: false });

  if (error) throw new Error(error.message);
  return ((data ?? []) as PromotionRow[]).map(mapPromotionRow);
}

/** Subscribe to live promotion changes; returns an unsubscribe function. */
export function subscribeToPromotions(onChange: () => void): () => void {
  const supabase = getSupabaseClient();
  const channel = supabase
    .channel('public:promotions')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'promotions' }, () =>
      onChange()
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

export function describeDiscount(_promo: ShopPromotion): string | null {
  // Prices are quote-only, so we no longer surface a discount figure.
  return null;
}

export function formatDateRange(promo: ShopPromotion): string | null {
  if (!promo.startDate && !promo.endDate) return null;
  const fmt = (d: string) =>
    new Date(`${d}T12:00:00`).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });
  if (promo.startDate && promo.endDate) return `${fmt(promo.startDate)} – ${fmt(promo.endDate)}`;
  if (promo.endDate) return `Ends ${fmt(promo.endDate)}`;
  return `From ${fmt(promo.startDate)}`;
}
