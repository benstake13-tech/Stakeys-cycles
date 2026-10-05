import { Seo } from '../components/Seo';
import { Button, Container } from '../components/ui';
import { NAV_ITEMS } from '../data/site';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <>
      <Seo title="Page not found" />
      <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl font-extrabold text-brand-500">404</p>
        <h1 className="mt-4 text-3xl font-bold text-white">We couldn&rsquo;t find that page</h1>
        <p className="mt-3 max-w-md text-slate-400">
          The page you&rsquo;re looking for doesn&rsquo;t exist. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-full border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-brand-400 hover:text-brand-300"
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Button to="/" size="lg">
            Back to home
          </Button>
        </div>
      </Container>
    </>
  );
}
