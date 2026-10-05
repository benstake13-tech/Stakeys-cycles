import { useMemo, useState } from 'react';
import { Seo } from '../components/Seo';
import { Button, Container, PageHero } from '../components/ui';
import { PRODUCT_CATEGORIES, PRODUCTS } from '../data/products';
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

      <Container className="py-12 sm:py-14">
        {/* Filter chips — scrollable row on mobile, wrapped on desktop */}
        <div className="no-scrollbar -mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {PRODUCT_CATEGORIES.map((cat) => (
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
            <article
              key={product.id}
              className="surface surface-hover group flex flex-col overflow-hidden rounded-2xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-ink-950">
                  Available
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-base font-semibold text-white">{product.name}</h2>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  {product.category}
                </p>
                <p className="mt-4 text-sm font-semibold text-brand-300">Ask for a quote</p>
                <div className="mt-auto pt-5">
                  <Button href={TEL_HREF} className="w-full">
                    <PhoneIcon className="h-4 w-4" />
                    Enquire to buy
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-14 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-white">How to buy</h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-400">
            Online orders are paused. Reach out on any of these channels and we&rsquo;ll
            arrange a convenient in-person exchange.
          </p>
          <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
            <Button href={TEL_HREF} className="w-full sm:w-auto">
              <PhoneIcon className="h-4 w-4" />
              Call {SHOP.phoneDisplay}
            </Button>
            <Button href={SMS_HREF} variant="secondary" className="w-full sm:w-auto">
              Text us
            </Button>
            <Button
              href={WHATSAPP_HREF}
              variant="secondary"
              external
              className="w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              href="https://m.me/100088457832581"
              variant="secondary"
              external
              className="w-full sm:w-auto"
            >
              <FacebookIcon className="h-4 w-4" />
              Messenger
            </Button>
            <Button href={MAIL_HREF} variant="secondary" className="w-full sm:w-auto">
              <MailIcon className="h-4 w-4" />
              Email
            </Button>
          </div>
        </section>
      </Container>
    </>
  );
}
