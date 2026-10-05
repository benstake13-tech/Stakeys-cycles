import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/Seo';
import { Button, Container, PageHero } from '../components/ui';
import { useProducts } from '../hooks/useProducts';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/shop';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import { CartIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons';
import type { Product } from '../types/backend';

const ALL = 'All Items';

function stockLabel(product: Product): { text: string; tone: string } {
  if (product.stock <= 0) return { text: 'Sold out', tone: 'bg-slate-700 text-slate-200' };
  if (product.stock <= 2)
    return { text: `Only ${product.stock} left`, tone: 'bg-amber-400 text-ink-950' };
  return { text: 'In stock', tone: 'bg-brand-500 text-ink-950' };
}

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;
  const stock = stockLabel(product);

  const onAdd = () => {
    if (soldOut) return;
    addItem(product, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1600);
  };

  return (
    <article className="surface surface-hover group flex flex-col overflow-hidden rounded-2xl">
      <Link
        to={`/shop/${product.id}`}
        className="relative block aspect-[4/3] overflow-hidden bg-ink-900"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-slate-600">
            No image
          </div>
        )}
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${stock.tone}`}
        >
          {stock.text}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs uppercase tracking-wider text-slate-500">{product.category}</p>
        <h2 className="mt-1 text-base font-semibold text-white">
          <Link to={`/shop/${product.id}`} className="hover:text-brand-300">
            {product.name}
          </Link>
        </h2>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
          {product.wasPrice && product.wasPrice > product.price && (
            <span className="text-sm text-slate-500 line-through">
              {formatPrice(product.wasPrice)}
            </span>
          )}
        </div>

        <div className="mt-auto pt-5">
          <Button onClick={onAdd} disabled={soldOut} className="w-full">
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
        </div>
      </div>
    </article>
  );
}

export default function ShopPage() {
  const { products, loading, error } = useProducts();
  const [category, setCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => p.category && set.add(p.category));
    return [ALL, ...Array.from(set).sort()];
  }, [products]);

  const visible = useMemo(
    () => (category === ALL ? products : products.filter((p) => p.category === category)),
    [products, category],
  );

  return (
    <>
      <Seo
        title="Shop"
        description="Shop bikes, parts and accessories at Stakey's Cycles, Salford. Order online and arrange payment and collection or delivery."
      />

      <PageHero
        title="Shop bikes, parts & accessories"
        intro="Quality used bikes and parts, restocked by our mechanics. Order online and we'll send you a payment link, then arrange collection, local delivery or postage."
        image="/images/shop.jpg"
      />

      <Container className="py-12 sm:py-14">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="surface h-72 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="surface rounded-2xl p-8 text-center">
            <p className="text-base font-semibold text-white">We couldn&rsquo;t load the shop</p>
            <p className="mt-2 text-sm text-slate-400">{error}</p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={TEL_HREF}>
                <PhoneIcon className="h-4 w-4" />
                Call {SHOP.phoneDisplay}
              </Button>
              <Button href={WHATSAPP_HREF} variant="secondary" external>
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="surface rounded-2xl p-10 text-center">
            <p className="text-lg font-semibold text-white">We&rsquo;re restocking right now</p>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-400">
              There&rsquo;s nothing listed for sale at the moment. We get fresh bikes and parts in
              regularly &mdash; get in touch and we&rsquo;ll let you know what&rsquo;s coming.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button href={TEL_HREF}>
                <PhoneIcon className="h-4 w-4" />
                Call {SHOP.phoneDisplay}
              </Button>
              <Button href={WHATSAPP_HREF} variant="secondary" external>
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`min-h-10 shrink-0 snap-start whitespace-nowrap rounded-full border px-4 text-sm font-medium transition ${
                    category === cat
                      ? 'border-brand-400 bg-brand-500/15 text-brand-300'
                      : 'border-white/10 text-slate-300 hover:border-white/25 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <p className="mt-6 text-sm text-slate-500">
              {visible.length} {visible.length === 1 ? 'item' : 'items'}
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {visible.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">How buying works</h2>
          <ol className="mt-4 grid gap-4 text-sm text-slate-400 sm:grid-cols-3">
            <li>
              <span className="font-semibold text-brand-300">1. Order online</span>
              <p className="mt-1 leading-relaxed">
                Add what you want to the cart and place your order &mdash; no payment needed yet.
              </p>
            </li>
            <li>
              <span className="font-semibold text-brand-300">2. Get a payment link</span>
              <p className="mt-1 leading-relaxed">
                We confirm availability and send a secure payment link or bank details.
              </p>
            </li>
            <li>
              <span className="font-semibold text-brand-300">3. Collect or receive</span>
              <p className="mt-1 leading-relaxed">
                Collect from Salford, arrange local delivery, or have it posted.
              </p>
            </li>
          </ol>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Button href={TEL_HREF} className="w-full sm:w-auto">
              <PhoneIcon className="h-4 w-4" />
              Call {SHOP.phoneDisplay}
            </Button>
            <Button href={WHATSAPP_HREF} variant="secondary" external className="w-full sm:w-auto">
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
