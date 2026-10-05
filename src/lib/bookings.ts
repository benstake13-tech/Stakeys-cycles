import { getSupabaseClient } from './supabase';
import { SHOP } from '../data/site';
import type { GuestBookingInput, VehicleCategory } from '../types/backend';

export interface GuestBookingResult {
  id: string;
  booking: GuestBookingInput;
}

/** Stable id in the staff app's `bk-XXXX` style, unique per submission. */
function makeBookingId(): string {
  return `bk-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(2, 6)}`;
}

/**
 * Guest email used when the customer declines to give one. The staff app uses
 * the same convention so anonymous bookings stay identifiable.
 */
export function guestEmail(name: string, phone: string): string {
  const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'guest';
  const tail = phone.replace(/[^0-9]/g, '').slice(-4) || 'quick';
  return `${slug}-${tail}@guest.stakeysbikes.co.uk`;
}

function buildNotes(input: GuestBookingInput): string {
  const parts: string[] = [];
  if (input.vehicleModel) parts.push(`Vehicle: ${input.vehicleModel}`);
  if (input.notes?.trim()) parts.push(`Customer notes: ${input.notes.trim()}`);
  return parts.join('\n\n');
}

/**
 * Insert a guest booking into the shared service_bookings table. No
 * customer_id and no membership_number, which is what the staff app uses to
 * label a booking "Guest Direct Booking".
 */
export async function createGuestBooking(
  input: GuestBookingInput
): Promise<GuestBookingResult> {
  const supabase = getSupabaseClient();
  const id = makeBookingId();

  const payload = {
    id,
    customer_id: null,
    customer_name: input.customerName.trim(),
    customer_phone: input.customerPhone.trim(),
    customer_email: input.customerEmail.trim(),
    membership_number: null,
    service_id: input.serviceId,
    service_title: input.serviceTitle,
    service_price: input.servicePrice,
    vehicle_type: input.vehicleCategory,
    vehicle_model: input.vehicleModel,
    preferred_date: input.preferredDate,
    preferred_time_slot: input.preferredTimeSlot,
    notes: buildNotes(input),
    status: 'pending',
    reminder_24h_sent: false,
  };

  const { error } = await supabase.from('service_bookings').insert(payload);
  if (error) throw new Error(error.message);

  return { id, booking: input };
}

const EMAIL_HTML = (id: string, input: GuestBookingInput) => `
  <div style="font-family:Inter,Arial,sans-serif;background:#050806;color:#e2e8f0;padding:24px;border-radius:12px">
    <h2 style="color:#00aa21;margin:0 0 4px">New website booking #${id}</h2>
    <p style="color:#94a3b8;margin:0 0 16px">Submitted via stakeyscycles website (guest, no account).</p>
    <table style="border-collapse:collapse">
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Name</td><td>${input.customerName}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Phone</td><td>${input.customerPhone}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Email</td><td>${input.customerEmail}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Vehicle</td><td>${input.vehicleModel} (${input.vehicleCategory})</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Service</td><td>${input.serviceTitle}</td></tr>
      <tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Preferred</td><td>${input.preferredDate} · ${input.preferredTimeSlot}</td></tr>
      ${input.notes ? `<tr><td style="padding:4px 12px 4px 0;color:#94a3b8">Notes</td><td>${input.notes}</td></tr>` : ''}
    </table>
  </div>`;

/**
 * Best-effort staff alert via the loyalty app's existing send-email edge
 * function. A failure here never blocks the booking, which is already saved.
 */
export async function notifyStaffOfBooking(
  id: string,
  input: GuestBookingInput
): Promise<boolean> {
  try {
    const supabase = getSupabaseClient();
    const { error } = await supabase.functions.invoke('send-email', {
      body: {
        from: 'noreply@stakeyscyles.co.uk',
        to: SHOP.email,
        subject: `⚡ New website booking #${id}: ${input.serviceTitle} (${input.customerName})`,
        html: EMAIL_HTML(id, input),
      },
    });
    return !error;
  } catch {
    return false;
  }
}

export const VEHICLE_LABELS: Record<VehicleCategory, string> = {
  cycle: 'Bicycle',
  ebike: 'E-bike',
  electric_scooter: 'E-scooter',
  cargo: 'Cargo bike',
};
