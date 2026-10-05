import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Container } from '../components/ui';
import { fetchProduct, formatPrice } from '../lib/shop';
import { useCart } from '../context/CartContext';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import { ArrowRightIcon, CartIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons';
import type { Product } from '../types/backend';

export default function ProductPage() {
  const { id = '' } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    fetchProduct(id)
      .then((p) => {
        if (active) setProduct(p);
      })
      .catch(() => {
        if (active) setProduct(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [id]);

  const onAdd = () => {
    if (!product || product.stock <= 0) return;
    addItem(product, quantity);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  if (loading) {
    return (
      <Container className="py-16">
        <div className="grid animate-pulse gap-8 lg:grid-cols-2">
          <div className="surface aspect-[4/3] rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 w-2/3 rounded bg-white/10" />
            <div className="h-4 w-1/3 rounded bg-white/10" />
            <div className="h-24 rounded bg-white/10" />
          </div>
        </div>
      </Container>
    );
  }

  if (!product) {
    return (
      <>
        <Seo title="Item not found" />
        <Container className="py-20 text-center">
          <h1 className="text-2xl font-bold text-white">We couldn&rsquo;t find that item</h1>
          <p className="mt-3 text-sm text-slate-400">
            It may have sold or been removed from the shop.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button to="/shop">
              Back to the shop
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </Container>
      </>
    );
  }

  const soldOut = product.stock <= 0;
  const maxQty = Math.max(1, Math.min(product.stock, 10));

  return (
    <>
      <Seo title={product.name} description={product.description || `${product.name} for sale at Stakey's Cycles.`} />

      <Container className="py-8 sm:py-12">
        <nav className="mb-6 text-sm text-slate-500">
          <Link to="/shop" className="hover:text-brand-300">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-300">{product.name}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="surface overflow-hidden rounded-2xl">
            <div className="aspect-[4/3] bg-ink-900">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
                  No image
                </div>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wider text-brand-400">{product.category}</p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
              {product.wasPrice && product.wasPrice > product.price && (
                <span className="text-lg text-slate-500 line-through">
                  {formatPrice(product.wasPrice)}
                </span>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-full border border-white/10 px-3 py-1 text-slate-300">
                Condition: {product.condition}
              </span>
              <span
                className={`rounded-full px-3 py-1 font-semibold ${
                  soldOut
                    ? 'bg-slate-700 text-slate-200'
                    : product.stock <= 2
                      ? 'bg-amber-400 text-ink-950'
                      : 'bg-brand-500 text-ink-950'
                }`}
              >
                {soldOut
                  ? 'Sold out'
                  : product.stock <= 2
                    ? `Only ${product.stock} left`
                    : 'In stock'}
              </span>
              {product.sku && (
                <span className="rounded-full border border-white/10 px-3 py-1 text-slate-500">
                  SKU {product.sku}
                </span>
              )}
            </div>

            {product.description && (
              <p className="mt-6 text-sm leading-relaxed text-slate-400">{product.description}</p>
            )}

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {!soldOut && (
                <div className="flex items-center rounded-full border border-white/15">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white"
                  >
                    &minus;
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    onClick={() => setQuantity((q) => Math.min(maxQty, q + 1))}
                    className="flex h-11 w-11 items-center justify-center text-lg text-white"
                  >
                    +
                  </button>
                </div>
              )}
              <Button onClick={onAdd} disabled={soldOut} size="lg" className="flex-1 sm:flex-none">
                {added ? (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    Added to cart
                  </>
                ) : (
                  <>
                    <CartIcon className="h-4 w-4" />
                    {soldOut ? 'Sold out' : 'Add to cart'}
                  </>
                )}
              </Button>
              <Button to="/cart" variant="secondary" size="lg">
                View cart
              </Button>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-slate-400">
              <p className="font-semibold text-white">Payment &amp; delivery</p>
              <p className="mt-2 leading-relaxed">
                Order online and we&rsquo;ll confirm availability, then send a secure payment link
                or bank details. Collect from Salford, arrange local delivery, or have it posted.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button href={TEL_HREF} variant="secondary">
                  <PhoneIcon className="h-4 w-4" />
                  Call {SHOP.phoneDisplay}
                </Button>
                <Button href={WHATSAPP_HREF} variant="secondary" external>
                  <WhatsAppIcon className="h-4 w-4" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
