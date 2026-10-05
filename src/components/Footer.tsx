import { Link } from 'react-router-dom';
import { MAIL_HREF, NAV_ITEMS, SHOP, SOCIAL_LINKS, TEL_HREF } from '../data/site';
import { Container } from './ui';
import { ICON_BY_NAME, MailIcon, MapPinIcon, PhoneIcon } from './Icons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ink-950">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/images/logo.png"
                alt="Stakey's Cycles logo"
                className="h-12 w-12 rounded-full object-cover"
              />
              <span className="text-lg font-bold text-white">Stakey&rsquo;s Cycles</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Salford&rsquo;s call-out-only bike and e-scooter repair service. Expert
              repairs brought directly to you.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-slate-400 transition hover:text-brand-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href={TEL_HREF}
                  className="flex items-center gap-2 transition hover:text-brand-300"
                >
                  <PhoneIcon className="h-4 w-4 text-brand-400" />
                  {SHOP.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={MAIL_HREF}
                  className="flex items-center gap-2 break-all transition hover:text-brand-300"
                >
                  <MailIcon className="h-4 w-4 shrink-0 text-brand-400" />
                  {SHOP.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPinIcon className="h-4 w-4 text-brand-400" />
                {SHOP.area}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Follow
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = ICON_BY_NAME[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-slate-300 transition hover:border-brand-400 hover:text-brand-300"
                  >
                    {Icon ? <Icon className="h-5 w-5" /> : social.label[0]}
                  </a>
                );
              })}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
              {SHOP.hours.work}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} Stakey&rsquo;s Cycles. All rights reserved.
          </p>
          <p>Salford, Greater Manchester &middot; Call-out service only</p>
        </div>
      </Container>
    </footer>
  );
}
