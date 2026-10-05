export type VehicleCategory = 'cycle' | 'ebike' | 'electric_scooter' | 'cargo';

export type PromotionStatus = 'active' | 'upcoming' | 'expired';

/** Mirrors ShopPromotion in the staff loyalty app so both share the table. */
export interface ShopPromotion {
  id: string;
  title: string;
  subtitle: string;
  code: string;
  discountPercentage?: number;
  discountAmount?: number;
  badgeText: string;
  status: PromotionStatus;
  startDate: string;
  endDate: string;
  termsAndConditions: string[];
  eligibleCategories: VehicleCategory[];
  bgGradient: string;
  featured?: boolean;
}

/** Shape of a row in the public.promotions table. */
export interface PromotionRow {
  id: string;
  title: string | null;
  subtitle: string | null;
  code: string | null;
  badge_text: string | null;
  status: string | null;
  start_date: string | null;
  end_date: string | null;
  discount_percentage: number | null;
  discount_amount: number | null;
  terms_and_conditions: string[] | null;
  eligible_categories: string[] | null;
  bg_gradient: string | null;
  featured: boolean | null;
}

export type BookingStatus = 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type ApprovalStatus = 'pending_approval' | 'approved' | 'declined';

/** A job photo uploaded by staff and shown on the public "Jobs we're proud of" page. */
export interface GalleryItem {
  id: string;
  imageUrl: string;
  title: string;
  caption: string;
  vehicleType: string;
  sortOrder: number;
  published: boolean;
  createdAt: string;
}

/** Shape of a row in the public.gallery_items table. */
export interface GalleryRow {
  id: string;
  image_url: string | null;
  title: string | null;
  caption: string | null;
  vehicle_type: string | null;
  sort_order: number | null;
  published: boolean | null;
  created_at: string | null;
}

export interface GuestBookingInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleCategory: VehicleCategory;
  vehicleModel: string;
  serviceId: string;
  serviceTitle: string;
  servicePrice: number;
  preferredDate: string;
  preferredTimeSlot: string;
  notes?: string;
  selectedIssues?: string[];
}
