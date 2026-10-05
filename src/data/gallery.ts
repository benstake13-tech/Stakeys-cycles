export interface GalleryImage {
  src: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: '/images/gallery-1.jpg',
    alt: "Bike being serviced by Stakey's Cycles",
  },
  {
    src: '/images/gallery-2.jpg',
    alt: "Repair work in progress at Stakey's Cycles",
  },
  {
    src: '/images/gallery-3.jpg',
    alt: "A finished repair by Stakey's Cycles",
  },
  {
    src: '/images/shop.jpg',
    alt: "Second-hand parts ready at Stakey's Cycles",
  },
  {
    src: '/images/price-list.jpg',
    alt: "Stakey's Cycles workshop",
  },
  {
    src: '/images/location.jpg',
    alt: "Stakey's Cycles mobile service in Salford",
  },
];

export interface Offer {
  src: string;
  alt: string;
}

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
