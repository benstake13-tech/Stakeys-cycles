import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SHOP, TEL_HREF, WHATSAPP_HREF } from '../data/site';
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from './Icons';

const STORAGE_KEY = 'stakeys-dock-magnification';
const DEFAULT_STRENGTH = 1.18;

/** Translucent mobile action dock with a persistent, adjustable hover magnification. */
export default function CallBar() {
  const [strength, setStrength] = useState(DEFAULT_STRENGTH);
  const [settingsOpen, setSettingsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = Number(saved);
        if (Number.isFinite(parsed)) setStrength(Math.min(1.5, Math.max(1, parsed)));
      }
    } catch {
      // Storage can be unavailable in private browsing; keep the in-memory default.
    }
  }, []);

  const updateStrength = (value: number) => {
    setStrength(value);
    try {
      window.localStorage.setItem(STORAGE_KEY, String(value));
    } catch {
      // The control still works for this visit when storage is unavailable.
    }
  };

  return (
    <div
      className="safe-bottom mobile-action-dock fixed inset-x-3 bottom-2 z-40 px-3 pt-3 sm:hidden"
      style={{ '--dock-magnification': strength } as React.CSSProperties}
    >
      <div className="flex items-center gap-2.5">
        <Link
          to="/book"
          className="dock-action dock-primary flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full px-4 text-sm font-semibold text-ink-950"
        >
          Book a repair
          <ArrowRightIcon className="h-4 w-4" />
        </Link>
        <a
          href={TEL_HREF}
          aria-label="Call us"
          className="dock-action dock-icon inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
        >
          <PhoneIcon className="h-5 w-5" />
        </a>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer noopener"
          aria-label="Message on WhatsApp"
          className="dock-action dock-icon inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
        >
          <WhatsAppIcon className="h-5 w-5" />
        </a>
        <button
          type="button"
          className="dock-action dock-icon dock-settings inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-200"
          aria-label="Dock magnification settings"
          aria-expanded={settingsOpen}
          aria-controls="dock-magnification-settings"
          onClick={() => setSettingsOpen((open) => !open)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.8 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.8-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.8-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.8 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" transform="translate(-1 -1) scale(.95)" />
          </svg>
        </button>
      </div>
      {settingsOpen && (
        <div id="dock-magnification-settings" className="dock-settings-panel mt-3 rounded-2xl p-4" role="group" aria-label="Magnification strength">
          <div className="mb-2 flex items-center justify-between gap-3">
            <label htmlFor="dock-strength" className="text-sm font-semibold text-white">Magnification strength</label>
            <span className="text-xs font-medium tabular-nums text-brand-200">{Math.round((strength - 1) * 100)}%</span>
          </div>
          <input
            id="dock-strength"
            type="range"
            min="1"
            max="1.5"
            step="0.05"
            value={strength}
            onChange={(event) => updateStrength(Number(event.target.value))}
            className="dock-strength-slider w-full"
          />
          <div className="mt-1 flex justify-between text-[11px] text-slate-400">
            <span>Subtle</span>
            <span>Strong</span>
          </div>
          <p className="mt-2 text-[11px] text-slate-400">Your preference is saved on this device.</p>
        </div>
      )}
      <p className="mt-2 text-center text-[11px] text-slate-300/75">
        {SHOP.phoneDisplay} &middot; {SHOP.hours.work}
      </p>
    </div>
  );
}
