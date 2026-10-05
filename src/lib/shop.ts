import { getSupabaseClient } from './supabase';
import { SHOP } from '../data/site';
import type {
  CartLine,
  FulfilmentMethod,
  OrderInput,
  OrderResult,
  Product,
  ProductRow,
} from '../types/backend';

export const PRODUCTS_TABLE = 'products';
export const ORDERS_TABLE = 'orders';
export const ORDER_ITEMS_TABLE = 'order_items';

function num(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const n = typeof value === 'string' ? Number.parseFloat(value) : value;
  return Number.isFinite(n) ? n : 0;
}

function toProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name ?? '',
    description: row.description ?? '',
    category: row.category ?? 'Other',
    price: num(row.price),
    wasPrice: row.was_price === null || row.was_price === undefined ? undefined : num(row.was_price),
    stock: row.stock ?? 0,
    imageUrl: row.image_url ?? '',
    condition: row.condition ?? 'Used',
    sku: row.sku ?? '',
    published: row.published ?? false,
    sortOrder: row.sort_order ?? 0,
  };
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    minimumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);
}

function isMissingTable(error: { code?: string; message?: string }): boolean {
  const message = error.message ?? '';
  return (
    error.code === 'PGRST205' ||
    error.code === '42P01' ||
    message.includes('schema cache') ||
    message.includes('does not exist')
  );
}

/** Published catalogue items, cheapest display order preserved by staff sort. */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await getSupabaseClient()
    .from(PRODUCTS_TABLE)
    .select('*')
    .eq('published', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  // Before the shop migration is applied the table is absent; show the empty
  // state rather than an error so the page still reads well.
  if (error) {
    if (isMissingTable(error)) return [];
    throw new Error(error.message);
  }
  return (data ?? []).map((row) => toProduct(row as ProductRow));
}

export async function fetchProduct(id: string): Promise<Product | null> {
  const { data, error } = await getSupabaseClient()
    .from(PRODUCTS_TABLE)
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .maybeSingle();

  if (error) {
    if (isMissingTable(error)) return null;
    throw new Error(error.message);
  }
  return data ? toProduct(data as ProductRow) : null;
}

/** Fires the callback whenever staff change the catalogue. */
export function subscribeToProducts(onChange: () => void): () => void {
  const channel = getSupabaseClient()
    .channel('products_changes')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: PRODUCTS_TABLE },
      () => onChange()
    )
    .subscribe();

  return () => {
    getSupabaseClient().removeChannel(channel);
  };
}

export function orderSubtotal(items: CartLine[]): number {
  return items.reduce((sum, line) => sum + line.price * line.quantity, 0);
}

function makeOrderId(): string {
  return `ord-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Record a website order. Payment is arranged afterwards (payment link / bank
 * transfer), so no card details are ever handled here. Staff see the order in
 * the loyalty app and reply with a payment link.
 */
export async function createOrder(input: OrderInput): Promise<OrderResult> {
  const supabase = getSupabaseClient();
  const id = makeOrderId();
  const subtotal = orderSubtotal(input.items);

  const { error: orderError } = await supabase.from(ORDERS_TABLE).insert({
    id,
    customer_name: input.customerName.trim(),
    customer_phone: input.customerPhone.trim(),
    customer_email: input.customerEmail.trim(),
    fulfilment: input.fulfilment,
    address: input.address?.trim() || null,
    postcode: input.postcode?.trim() || null,
    notes: input.notes?.trim() || null,
    subtotal,
    status: 'pending',
    payment_method: 'payment_link',
  });
  if (orderError) {
    if (isMissingTable(orderError)) {
      throw new Error(
        'Online ordering is being set up. Please call or WhatsApp us to place this order.'
      );
    }
    throw new Error(orderError.message);
  }

  const itemRows = input.items.map((line) => ({
    id: `${id}-${line.productId}`,
    order_id: id,
    product_id: line.productId,
    name: line.name,
    unit_price: line.price,
    quantity: line.quantity,
  }));

  const { error: itemsError } = await supabase.from(ORDER_ITEMS_TABLE).insert(itemRows);
  if (itemsError) throw new Error(itemsError.message);

  return { id, subtotal, fulfilment: input.fulfilment };
}

export const FULFILMENT_LABELS: Record<FulfilmentMethod, string> = {
  collection: 'Collection from Salford',
  delivery: 'Local delivery (Salford area)',
  postage: 'UK postage',
};

const ORDER_EMAIL_HTML = (id: string, input: OrderInput, subtotal: number) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#050806;color:#e2e8f0;padding:24px;border-radius:12px">
    <h2 style="color:#00aa21;margin:0 0 4px">New shop order #${id}</h2>
    <p style="color:#94a3b8;margin:0 0 16px">Submitted via the website shop. Arrange payment with the customer.</p>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Name</td><td>${input.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Phone</td><td>${input.customerPhone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Email</td><td>${input.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Fulfilment</td><td>${FULFILMENT_LABELS[input.fulfilment]}</td></tr>
      ${input.address ? `<tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Address</td><td>${input.address}</td></tr>` : ''}
      ${input.postcode ? `<tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Postcode</td><td>${input.postcode}</td></tr>` : ''}
      ${input.notes ? `<tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Notes</td><td>${input.notes}</td></tr>` : ''}
    </table>
    <h3 style="color:#fff;margin:20px 0 8px">Items</h3>
    <table style="border-collapse:collapse;width:100%">
      ${input.items
        .map(
          (line) =>
            `<tr><td style="padding:4px 12px 4px 0">${line.quantity} × ${line.name}</td><td style="text-align:right">£${(line.price * line.quantity).toFixed(2)}</td></tr>`
        )
        .join('')}
      <tr><td style="padding:8px 12px 4px 0;border-top:1px solid #334155;font-weight:700">Subtotal</td><td style="text-align:right;border-top:1px solid #334155;font-weight:700">£${subtotal.toFixed(2)}</td></tr>
    </table>
  </div>`;

/**
 * Best-effort staff alert via the loyalty app's existing send-email function.
 * A failure never blocks the order, which is already saved.
 */
export async function notifyStaffOfOrder(
  id: string,
  input: OrderInput,
  subtotal: number
): Promise<boolean> {
  try {
    const { error } = await getSupabaseClient().functions.invoke('send-email', {
      body: {
        from: 'noreply@stakeyswheels.co.uk',
        to: SHOP.email,
        subject: `🛒 New shop order #${id}: ${input.items.length} item(s) (${input.customerName})`,
        html: ORDER_EMAIL_HTML(id, input, subtotal),
      },
    });
    return !error;
  } catch {
    return false;
  }
}
