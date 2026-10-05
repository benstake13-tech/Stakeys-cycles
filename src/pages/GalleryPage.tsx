import { useEffect, useState } from 'react';
import { Seo } from '../components/Seo';
import { Container, PageHero } from '../components/ui';
import { GALLERY_IMAGES } from '../data/gallery';
import { CloseIcon } from '../components/Icons';

export default function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null);
      if (active === null) return;
      if (event.key === 'ArrowRight') {
        setActive((i) => ((i ?? 0) + 1) % GALLERY_IMAGES.length);
      }
      if (event.key === 'ArrowLeft') {
        setActive((i) => ((i ?? 0) - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  return (
    <>
      <Seo
        title="Gallery"
        description="Photos of bike and e-scooter repair work carried out by Stakey's Cycles in Salford."
      />

      <PageHero
        title="Gallery"
        intro="A look at some of the bikes, scooters and repairs that have passed through the workshop."
        image="/images/gallery-2.jpg"
      />

      <Container className="py-14">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {GALLERY_IMAGES.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActive(index)}
              className="group block w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] text-left"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </Container>

      {active !== null && (
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
          <img
            src={GALLERY_IMAGES[active].src}
            alt={GALLERY_IMAGES[active].alt}
            className="max-h-[85vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}
