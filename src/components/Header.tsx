import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV_ITEMS, SHOP, TEL_HREF } from '../data/site';
import { Button, Container } from './ui';
import { CartIcon, CloseIcon, MenuIcon, PhoneIcon, ArrowRightIcon } from './Icons';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { count } = useCart();

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? 'text-brand-400' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/85 backdrop-blur-xl">
      <Container className="flex h-16 items-center justify-between gap-3 lg:h-18">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <img
            src="/images/logo.png"
            alt="Stakey's Cycles logo"
            className="h-10 w-10 shrink-0 rounded-full object-cover ring-1 ring-white/10"
          />
          <span className="flex min-w-0 flex-col leading-none">
            <span className="truncate text-base font-bold tracking-tight text-white">
              Stakey&rsquo;s Cycles
            </span>
            <span className="truncate text-[11px] font-medium uppercase tracking-[0.18em] text-brand-400">
              {SHOP.city} &middot; Mobile repair
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/cart"
            aria-label={`Cart, ${count} ${count === 1 ? 'item' : 'items'}`}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:border-white/30 active:scale-95"
          >
            <CartIcon className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[11px] font-bold text-ink-950">
                {count}
              </span>
            )}
          </Link>
          {/* Wrapper spans control visibility: Button's own display utility
              cannot be overridden by `hidden` from the caller. */}
          <span className="hidden md:contents">
            <Button href={TEL_HREF} variant="secondary">
              <PhoneIcon className="h-4 w-4" />
              Call us out
            </Button>
          </span>
          <span className="hidden sm:contents">
            <Button to="/book">
              Book online
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
          </span>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition active:scale-95 xl:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {/* Mobile / tablet drawer */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-white/10 bg-ink-950/98 backdrop-blur-xl xl:hidden"
        >
          <Container className="py-6">
            <nav className="grid gap-1.5">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-2xl border px-4 py-3.5 text-base font-medium transition ${
                      isActive
                        ? 'border-brand-400/40 bg-brand-500/10 text-brand-200'
                        : 'border-white/10 text-slate-200 active:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                  <ArrowRightIcon className="h-4 w-4 opacity-40" />
                </NavLink>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <Button to="/book" size="lg" className="w-full">
                Book a repair online
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button href={TEL_HREF} size="lg" variant="secondary" className="w-full">
                <PhoneIcon className="h-4 w-4" />
                Call {SHOP.phoneDisplay}
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
