import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import { PhoneIcon, WhatsAppIcon } from './Icons';

/** Sticky call-to-action bar for small screens. */
export default function CallBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink-900/95 px-4 py-3 backdrop-blur sm:hidden">
      <div className="flex items-center gap-3">
        <a
          href={TEL_HREF}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 text-sm font-semibold text-ink-950"
        >
          <PhoneIcon className="h-4 w-4" />
          Call us out
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Message on WhatsApp"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
      </div>
      <p className="mt-2 text-center text-[11px] text-slate-400">
        {SHOP.phoneDisplay} &middot; {SHOP.hours.work}
      </p>
    </div>
  );
}
