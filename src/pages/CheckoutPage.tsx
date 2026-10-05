import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Container } from '../components/ui';
import { useCart } from '../context/CartContext';
import { createOrder, formatPrice, FULFILMENT_LABELS, notifyStaffOfOrder } from '../lib/shop';
import { ArrowRightIcon } from '../components/Icons';
import type { FulfilmentMethod } from '../types/backend';

const FULFILMENT_ORDER: FulfilmentMethod[] = ['collection', 'delivery', 'postage'];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { lines, subtotal, clear } = useCart();

  const [form, setForm] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    fulfilment: 'collection' as FulfilmentMethod,
    address: '',
    postcode: '',
    notes: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const needsAddress = form.fulfilment !== 'collection';

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (lines.length === 0) return;
    setSubmitting(true);
    setError(null);

    const input = {
      ...form,
      items: lines,
    };

    try {
      const result = await createOrder(input);
      // Fire-and-forget: the order is already saved, so a failed alert never blocks it.
      notifyStaffOfOrder(result.id, input, result.subtotal);
      clear();
      navigate(`/order/${result.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (lines.length === 0) {
    return (
      <>
        <Seo title="Checkout" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold text-white">Your cart is empty</h1>
          <p className="mt-3 text-sm text-slate-400">Add something to your cart to check out.</p>
          <div className="mt-8">
            <Button to="/shop">
              Browse the shop
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-white/12 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-brand-400 focus:outline-none';

  return (
    <>
      <Seo title="Checkout" description="Place your order with Stakey's Cycles." />

      <Container className="py-10 sm:py-14">
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Checkout</h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Tell us where you&rsquo;d like your order and how to reach you. No payment is taken now
          &mdash; we&rsquo;ll send a payment link once we&rsquo;ve confirmed your order.
        </p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <section className="surface rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white">Your details</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1.5 block text-sm font-medium text-slate-300">Full name</span>
                  <input
                    required
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    className={inputClass}
                    placeholder="Jane Smith"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-300">Phone</span>
                  <input
                    required
                    type="tel"
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    className={inputClass}
                    placeholder="07…"
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-slate-300">Email</span>
                  <input
                    required
                    type="email"
                    value={form.customerEmail}
                    onChange={(e) => setForm({ ...form, customerEmail: e.target.value })}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
            </section>

            <section className="surface rounded-2xl p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white">Fulfilment</h2>
              <div className="mt-4 grid gap-3">
                {FULFILMENT_ORDER.map((method) => (
                  <label
                    key={method}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition ${
                      form.fulfilment === method
                        ? 'border-brand-400 bg-brand-500/10 text-white'
                        : 'border-white/12 text-slate-300 hover:border-white/25'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fulfilment"
                      className="accent-brand-500"
                      checked={form.fulfilment === method}
                      onChange={() => setForm({ ...form, fulfilment: method })}
                    />
                    {FULFILMENT_LABELS[method]}
                  </label>
                ))}
              </div>

              {needsAddress && (
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label className="block sm:col-span-2">
                    <span className="mb-1.5 block text-sm font-medium text-slate-300">Address</span>
                    <input
                      required
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      className={inputClass}
                      placeholder="Street address"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-slate-300">Postcode</span>
                    <input
                      required
                      value={form.postcode}
                      onChange={(e) => setForm({ ...form, postcode: e.target.value })}
                      className={inputClass}
                      placeholder="M…"
                    />
                  </label>
                </div>
              )}

              <label className="mt-4 block">
                <span className="mb-1.5 block text-sm font-medium text-slate-300">
                  Notes <span className="text-slate-500">(optional)</span>
                </span>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className={`${inputClass} resize-none`}
                  placeholder="Anything we should know?"
                />
              </label>
            </section>
          </div>

          <aside className="surface h-fit rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-white">Your order</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {lines.map((line) => (
                <li key={line.productId} className="flex justify-between gap-3">
                  <span className="text-slate-300">
                    {line.quantity} &times; {line.name}
                  </span>
                  <span className="shrink-0 font-medium text-white">
                    {formatPrice(line.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex justify-between border-t border-white/10 pt-4 text-sm">
              <span className="text-slate-400">Subtotal</span>
              <span className="text-base font-bold text-white">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Delivery, postage or collection costs are arranged with your payment link.
            </p>

            {error && (
              <p className="mt-4 rounded-xl border border-rose-500/40 bg-rose-950/40 px-3 py-2 text-xs text-rose-200">
                {error}
              </p>
            )}

            <Button type="submit" size="lg" disabled={submitting} className="mt-6 w-full">
              {submitting ? 'Placing order…' : 'Place order'}
              {!submitting && <ArrowRightIcon className="h-4 w-4" />}
            </Button>
            <p className="mt-3 text-center text-xs text-slate-500">
              By ordering you agree to be contacted to arrange payment and delivery.
            </p>
            <Link
              to="/cart"
              className="mt-3 block text-center text-xs text-slate-500 hover:text-slate-300"
            >
              Back to cart
            </Link>
          </aside>
        </form>
      </Container>
    </>
  );
}
