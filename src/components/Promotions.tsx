import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useActivePromotions } from '../hooks/usePromotions';
import { OFFERS } from '../data/gallery';
import { describeDiscount, formatDateRange } from '../lib/promotions';
import type { ShopPromotion } from '../types/backend';
import { Container, SectionHeading } from './ui';
import { ArrowRightIcon, CheckIcon, ClockIcon, ShieldIcon, StarIcon } from './Icons';

function gradient(promo: ShopPromotion): string {
  if (promo.bgGradient && promo.bgGradient.includes('gradient')) return promo.bgGradient;
  return 'linear-gradient(135deg, rgba(0,170,33,0.22), rgba(0,170,33,0.04))';
}

function CopyCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  if (!code) return null;

  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-400/60 bg-ink-950/40 px-3 py-1.5 font-mono text-sm font-semibold text-brand-300 transition hover:border-brand-300"
      title="Copy code"
    >
      {copied ? <CheckIcon className="h-3.5 w-3.5" /> : null}
      {copied ? 'Copied' : code}
    </button>
  );
}

function PromotionCard({ promo }: { promo: ShopPromotion }) {
  const [open, setOpen] = useState(false);
  const discount = describeDiscount(promo);
  const dates = formatDateRange(promo);

  return (
    <article
      className="relative flex flex-col overflow-hidden rounded-3xl border border-white/12 p-6"
      style={{ background: gradient(promo) }}
    >
      {promo.featured && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink-950">
          <StarIcon className="h-3 w-3" /> Featured
        </span>
      )}

      {promo.badgeText && (
        <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-brand-400/40 bg-ink-950/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-brand-300">
          {promo.badgeText}
        </span>
      )}

      <h3 className="text-xl font-bold text-white">{promo.title}</h3>
      {promo.subtitle && <p className="mt-2 text-sm leading-relaxed text-slate-300">{promo.subtitle}</p>}

      {discount && (
        <p className="mt-4 text-3xl font-extrabold tracking-tight text-brand-400">{discount}</p>
      )}

      {dates && (
        <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400">
          <ClockIcon className="h-3.5 w-3.5" /> {dates}
        </p>
      )}

      <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
        <CopyCode code={promo.code} />
        <Link
          to="/book"
          className="inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-brand-400"
        >
          Book now <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      </div>

      {promo.termsAndConditions.length > 0 && (
        <div className="mt-4 border-t border-white/10 pt-3">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white"
          >
            <ShieldIcon className="h-3.5 w-3.5" />
            {open ? 'Hide terms' : 'Terms & conditions'}
          </button>
          {open && (
            <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-slate-400">
              {promo.termsAndConditions.map((term, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brand-500">•</span>
                  {term}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}

/** Live promotions from the staff backend, falling back to static workshop offers. */
export default function PromotionsStrip() {
  const { promotions, loading } = useActivePromotions();

  if (loading) {
    return (
      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Offers" title="Current deals from the workshop" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/[0.03]" />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (promotions.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Offers"
            title="Current deals from the workshop"
            intro="Keep an eye out — we regularly run offers on servicing and parts."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {OFFERS.map((offer, index) => (
              <div
                key={offer.src}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
              >
                <img
                  src={offer.src}
                  alt={`Stakey's Cycles offer ${index + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover"
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Offers"
            title="Current deals from the workshop"
            intro="Updated live by the team — offers appear here the moment they go live."
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
            Live
          </span>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {promotions.map((promo) => (
            <PromotionCard key={promo.id} promo={promo} />
          ))}
        </div>
      </Container>
    </section>
  );
}
