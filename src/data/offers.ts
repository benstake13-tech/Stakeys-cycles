export interface Offer {
  src: string;
  alt: string;
}

/**
 * Fallback offer artwork shown when the live promotions table is empty.
 * (The public "Jobs we're proud of" gallery is loaded from the backend instead.)
 */
export const OFFERS: Offer[] = [
  {
    src: '/images/offer-1.jpg',
    alt: "Stakey's Cycles current offer",
  },
  {
    src: '/images/offer-2.jpg',
    alt: "Stakey's Cycles current offer",
  },
  {
    src: '/images/offer-3.jpg',
    alt: "Stakey's Cycles current offer",
  },
];
