import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../data/site';
import { StakeysAppIcon, type StakeysIconName } from './StakeysAppIcon';

const iconFor: StakeysIconName[] = ['home','sales','inventory','garage','workshop','help','website','account','booking'];
const icons = new Map(NAV_ITEMS.map((item, index) => [item.to, iconFor[index] || 'apps']));

export default function WebsiteDesktopDock() {
  const [open, setOpen] = useState(false);
  const refs = useRef<Array<HTMLAnchorElement | null>>([]);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  useEffect(() => {
    if (!open) return;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; document.removeEventListener('keydown', onKey); };
  }, [open]);
  return <>
    <nav className="stakeys-site-dock" aria-label="Website dock" onPointerLeave={() => refs.current.forEach(element => element?.style.removeProperty('--dock-scale'))} onPointerMove={event => {
      if (event.pointerType !== 'mouse') return;
      refs.current.forEach(element => {
        if (!element) return;
        const rect = element.getBoundingClientRect();
        const distance = Math.abs(event.clientX - (rect.left + rect.width / 2));
        element.style.setProperty('--dock-scale', (1 + .4 * Math.exp(-(distance ** 2) / (2 * 66 ** 2))).toFixed(3));
      });
    }}>
      <div className="stakeys-site-dock-items">{NAV_ITEMS.slice(0, 6).map(item => <Link key={item.to} ref={el => { refs.current[NAV_ITEMS.indexOf(item)] = el; }} to={item.to} aria-label={item.label} aria-current={location.pathname === item.to ? 'page' : undefined} title={item.label}>
        <span><StakeysAppIcon name={icons.get(item.to) || 'apps'} size={29}/></span><b>{item.label}</b>
      </Link>)}<button type="button" aria-label="Open site menu" onClick={() => setOpen(true)}><span><StakeysAppIcon name="apps" size={29}/></span><b>More</b></button></div>
    </nav>
    {open && <div className="stakeys-site-drawer-backdrop" onPointerDown={event => { if (event.target === event.currentTarget) setOpen(false); }}>
      <section className="stakeys-site-drawer" role="dialog" aria-modal="true" aria-label="Site menu"><header><div><small>STAKEY’S CYCLES</small><h2>Explore the site</h2></div><button type="button" aria-label="Close menu" onClick={() => setOpen(false)}>×</button></header>
        <nav>{NAV_ITEMS.map((item,index) => <Link key={item.to} to={item.to} aria-current={location.pathname === item.to ? 'page' : undefined}><span><StakeysAppIcon name={iconFor[index] || 'apps'} size={23}/></span>{item.label}<i>›</i></Link>)}</nav>
      </section>
    </div>}
  </>;
}
