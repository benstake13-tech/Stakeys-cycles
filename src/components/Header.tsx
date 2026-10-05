import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { NAV_ITEMS, SHOP, TEL_HREF } from '../data/site';
import { Button, Container } from './ui';
import { CloseIcon, MenuIcon, PhoneIcon } from './Icons';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-sm font-medium transition ${
      isActive ? 'text-brand-400' : 'text-slate-300 hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink-950/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/images/logo.png"
            alt="Stakey's Cycles logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="flex flex-col leading-none">
            <span className="text-base font-bold tracking-tight text-white">
              Stakey&rsquo;s Cycles
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-brand-400">
              {SHOP.city} &middot; Mobile repair
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href={TEL_HREF} className="hidden sm:inline-flex">
            <PhoneIcon className="h-4 w-4" />
            Call us out
          </Button>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden">
          <Container className="pb-6">
            <div className="flex items-center justify-between pb-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Menu
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white"
              >
                <CloseIcon />
              </button>
            </div>
            <nav className="grid gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-base font-medium transition ${
                      isActive
                        ? 'bg-brand-500/10 text-brand-300'
                        : 'text-slate-200 hover:bg-white/5'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
            <Button href={TEL_HREF} size="lg" className="mt-4 w-full">
              <PhoneIcon className="h-4 w-4" />
              Call {SHOP.phoneDisplay}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
