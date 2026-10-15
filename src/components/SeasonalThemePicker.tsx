import { useEffect, useRef, useState } from 'react';
import { useSeasonalTheme, SEASONAL_THEMES } from '../context/SeasonalThemeContext';

export default function SeasonalThemePicker() {
  const { theme, setTheme } = useSeasonalTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = SEASONAL_THEMES.find((item) => item.id === theme)!;

  useEffect(() => {
    const closeOnOutside = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', closeOnOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="season-picker relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Choose seasonal theme. Current theme: ${selected.label}`}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.045] px-3 text-sm text-white transition hover:border-brand-300/50 hover:bg-white/[0.08] active:scale-95"
      >
        <span aria-hidden>{selected.icon}</span>
        <span className="hidden lg:inline">Theme</span>
      </button>
      {open && (
        <div className="season-picker-menu absolute right-0 top-[calc(100%+0.75rem)] z-[60] w-64 overflow-hidden rounded-2xl p-2" role="listbox" aria-label="Seasonal themes">
          <p className="px-3 pb-2 pt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">Choose a holiday</p>
          {SEASONAL_THEMES.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={theme === item.id}
              onClick={() => { setTheme(item.id); setOpen(false); }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${theme === item.id ? 'bg-brand-500/15 text-white' : 'text-slate-300 hover:bg-white/[0.07] hover:text-white'}`}
            >
              <span className="text-lg" aria-hidden>{item.icon}</span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="block text-xs text-slate-400">{item.character}</span>
              </span>
              {theme === item.id && <span className="ml-auto text-brand-300" aria-hidden>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
