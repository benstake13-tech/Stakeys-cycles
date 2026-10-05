import { useMemo, useState } from 'react';
import { Seo } from '../components/Seo';
import { Button, Container, PageHero } from '../components/ui';
import { PRODUCT_CATEGORIES, PRODUCTS, formatPrice } from '../data/products';
import {
  MAIL_HREF,
  SHOP,
  SMS_HREF,
  TEL_HREF,
  WHATSAPP_HREF,
} from '../data/site';
import { FacebookIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '../components/Icons';

export default function ShopPage() {
  const [category, setCategory] = useState<string>('All Items');

  const visible = useMemo(
    () =>
      category === 'All Items'
        ? PRODUCTS
        : PRODUCTS.filter((product) => product.category === category),
    [category],
  );

  return (
    <>
      <Seo
        title="Shop"
        description="Second-hand bike parts and bikes for sale at Stakey's Cycles, Salford. Contact us directly to arrange an in-person exchange."
      />

      <PageHero
        title="We are temporarily suspending online orders"
        intro="To purchase any of our products, please contact us directly via phone, text, WhatsApp or Facebook Messenger. We will happily arrange an in-person exchange for your convenience."
        image="/images/shop.jpg"
      />

      <Container className="py-14">
        <div className="flex flex-wrap gap-3">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
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
          {visible.length} {visible.length === 1 ? 'result' : 'results'}
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <article
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                {product.wasPrice && (
                  <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-ink-950">
                    Sale
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-semibold text-white">{product.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {product.category}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-lg font-bold text-brand-300">
                    {formatPrice(product.price)}
                  </span>
                  {product.wasPrice && (
                    <span className="text-sm text-slate-500 line-through">
                      {formatPrice(product.wasPrice)}
                    </span>
                  )}
                </div>
                <div className="mt-5">
                  <Button href={TEL_HREF} className="w-full">
                    <PhoneIcon className="h-4 w-4" />
                    Enquire to buy
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h2 className="text-xl font-semibold text-white">How to buy</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Online orders are paused. Reach out on any of these channels and we&rsquo;ll
            arrange a convenient in-person exchange.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={TEL_HREF}>
              <PhoneIcon className="h-4 w-4" />
              Call {SHOP.phoneDisplay}
            </Button>
            <Button href={SMS_HREF} variant="secondary">
              Text us
            </Button>
            <Button href={WHATSAPP_HREF} variant="secondary" external>
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button href="https://m.me/100088457832581" variant="secondary" external>
              <FacebookIcon className="h-4 w-4" />
              Messenger
            </Button>
            <Button href={MAIL_HREF} variant="secondary">
              <MailIcon className="h-4 w-4" />
              Email
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
