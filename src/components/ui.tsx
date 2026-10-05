import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export function Container({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

type ButtonProps = {
  children: ReactNode;
  href?: string;
  to?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'md' | 'lg';
  className?: string;
  external?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  ariaLabel?: string;
};

const variants = {
  primary:
    'bg-brand-500 text-ink-950 hover:bg-brand-400 focus-visible:outline-brand-400 font-semibold shadow-lg shadow-brand-500/25',
  secondary:
    'border border-white/15 bg-white/5 text-white hover:border-white/30 hover:bg-white/10 focus-visible:outline-white/40',
  ghost: 'text-brand-300 hover:text-brand-200 focus-visible:outline-brand-400',
};

const sizes = {
  md: 'min-h-11 px-5 py-2.5 text-sm',
  lg: 'min-h-12 px-6 py-3.5 text-base sm:px-7',
};

export function Button({
  children,
  href,
  to,
  variant = 'primary',
  size = 'md',
  className = '',
  external,
  onClick,
  disabled,
  type = 'button',
  ariaLabel,
}: ButtonProps) {
  const cls = `inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full transition duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-brand-400">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-slate-400">{intro}</p>
      )}
    </div>
  );
}

export function Card({
  children,
  className = '',
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`surface rounded-2xl p-6 ${hover ? 'surface-hover' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHero({
  title,
  intro,
  image,
  children,
}: {
  title: string;
  intro?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-white/10">
      {image && (
        <img
          src={image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-25"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/70 via-ink-950/85 to-ink-950" />
      <div
        aria-hidden
        className="absolute -right-20 -top-16 h-64 w-64 rounded-full bg-brand-500/15 blur-3xl"
      />
      <Container className="relative py-12 sm:py-16 lg:py-20">
        <Eyebrow>Stakey&rsquo;s Cycles</Eyebrow>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            {intro}
          </p>
        )}
        {children && <div className="mt-6">{children}</div>}
      </Container>
    </header>
  );
}
