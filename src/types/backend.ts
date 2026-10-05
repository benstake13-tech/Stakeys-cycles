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

export type ProductCondition = 'New' | 'Used' | 'Refurbished';

export type FulfilmentMethod = 'collection' | 'delivery' | 'postage';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'paid'
  | 'ready'
  | 'completed'
  | 'cancelled';

/** A catalogue item shown in the website shop. */
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  wasPrice?: number;
  stock: number;
  imageUrl: string;
  condition: string;
  sku: string;
  published: boolean;
  sortOrder: number;
}

/** Shape of a row in the public.products table. */
export interface ProductRow {
  id: string;
  name: string | null;
  description: string | null;
  category: string | null;
  price: number | string | null;
  was_price: number | string | null;
  stock: number | null;
  image_url: string | null;
  condition: string | null;
  sku: string | null;
  published: boolean | null;
  sort_order: number | null;
}

export interface CartLine {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export interface OrderInput {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfilment: FulfilmentMethod;
  address?: string;
  postcode?: string;
  notes?: string;
  items: CartLine[];
}

export interface OrderResult {
  id: string;
  subtotal: number;
  fulfilment: FulfilmentMethod;
}

/** Shape of a row in the public.orders table. */
export interface OrderRow {
  id: string;
  customer_name: string | null;
  customer_phone: string | null;
  customer_email: string | null;
  fulfilment: string | null;
  address: string | null;
  postcode: string | null;
  notes: string | null;
  subtotal: number | string | null;
  status: string | null;
  payment_method: string | null;
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
