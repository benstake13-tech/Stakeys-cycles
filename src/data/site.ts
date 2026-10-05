export const SHOP = {
  name: "Stakey's Cycles",
  tagline: 'Mobile bike & e-scooter repair',
  city: 'Salford',
  phoneDisplay: '07388 209102',
  phoneRaw: '07388209102',
  email: 'Benstake13@gmail.com',
  area: 'Salford, Greater Manchester',
  hours: {
    dropOff: '24-hour drop-off & collection',
    work: 'Repairs carried out 8:00 AM – 8:00 PM',
  },
  bookingUrl: 'https://book.heygoldie.com/Stakeys-Cycles/checkout',
  reviewUrl: 'https://www.google.com/search?q=stakeys+cycles+salford+reviews',
  /** Public marketing site (this app). */
  websiteUrl: 'https://stakeyscycles.vercel.app',
  /** Customer app: loyalty card, prize wheel and staff terminal. */
  staffUrl: 'https://stakeyswheels.co.uk',
} as const;

export const TEL_HREF = `tel:${SHOP.phoneRaw}`;
export const SMS_HREF = `sms:${SHOP.phoneRaw}`;
export const WHATSAPP_HREF = `https://wa.me/44${SHOP.phoneRaw.slice(1)}`;
export const MAIL_HREF = `mailto:${SHOP.email}`;

export interface SocialLink {
  label: string;
  href: string;
  icon: 'instagram' | 'facebook' | 'whatsapp' | 'mail';
}

/** Only links confirmed to belong to Stakey's Cycles. */
export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/stakeyscycles22',
    icon: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/share/1DARRNSNSz/',
    icon: 'facebook',
  },
  {
    label: 'WhatsApp',
    href: WHATSAPP_HREF,
    icon: 'whatsapp',
  },
  {
    label: 'Email',
    href: MAIL_HREF,
    icon: 'mail',
  },
];

export interface NavItem {
  label: string;
  to: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Price list', to: '/price-list' },
  { label: 'Shop', to: '/shop' },
  { label: 'Our work', to: '/gallery' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Location', to: '/location' },
  { label: 'Join the Team', to: '/join-the-team' },
  { label: 'Book', to: '/book' },
];
