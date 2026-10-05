import { useEffect, useState } from 'react';
import { Seo } from '../components/Seo';
import { Button, Container, PageHero } from '../components/ui';
import { useGallery } from '../hooks/useGallery';
import { SHOP, TEL_HREF } from '../data/site';
import { ArrowRightIcon, CloseIcon, PhoneIcon, WrenchIcon } from '../components/Icons';

export default function GalleryPage() {
  const { items, loading, live } = useGallery();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (active === null) return;
      if (event.key === 'ArrowRight') {
        setActive((i) => ((i ?? 0) + 1) % items.length);
      }
      if (event.key === 'ArrowLeft') {
        setActive((i) => ((i ?? 0) - 1 + items.length) % items.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, items.length]);

  return (
    <>
      <Seo
        title="Jobs we're proud of"
        description="Recent bike and e-scooter repair work carried out by Stakey's Cycles in Salford."
      />

      <PageHero
        title="Jobs we're proud of"
        intro="A look at some of the bikes, scooters and repairs that have passed through the workshop."
        image="/images/workshop-2.jpg"
      />

      <Container className="py-12 sm:py-14">
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="aspect-[4/3] animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="surface mx-auto max-w-xl rounded-3xl p-8 text-center sm:p-12">
            <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500/15 text-brand-400">
              <WrenchIcon className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-xl font-bold text-white sm:text-2xl">
              Fresh work coming soon
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              We photograph every job worth showing off. New photos of finished repairs
              will appear here as the team uploads them from the workshop.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Button to="/book" className="w-full sm:w-auto">
                Book a repair
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={TEL_HREF}
                variant="secondary"
                className="w-full sm:w-auto"
              >
                <PhoneIcon className="h-4 w-4" />
                Call {SHOP.phoneDisplay}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {live && (
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-xs font-semibold text-brand-300">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
                Updated live from the workshop
              </span>
            )}
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(index)}
                  className="surface surface-hover group block overflow-hidden rounded-2xl text-left"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink-900">
                    <img
                      src={item.imageUrl}
                      alt={item.title || 'Job by Stakey\u2019s Cycles'}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  {(item.title || item.caption) && (
                    <div className="p-4">
                      {item.title && (
                        <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                      )}
                      {item.caption && (
                        <p className="mt-1 text-xs leading-relaxed text-slate-400">
                          {item.caption}
                        </p>
                      )}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </Container>

      {active !== null && items[active] && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4 backdrop-blur"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close viewer"
            onClick={() => setActive(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
          >
            <CloseIcon />
          </button>
          <figure
            className="max-h-[85vh] max-w-4xl"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={items[active].imageUrl}
              alt={items[active].title || 'Job by Stakey\u2019s Cycles'}
              className="max-h-[75vh] w-full rounded-xl object-contain"
            />
            {(items[active].title || items[active].caption) && (
              <figcaption className="mt-4 text-center text-sm text-slate-300">
                {items[active].title}
                {items[active].caption && (
                  <span className="mt-1 block text-slate-500">
                    {items[active].caption}
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
