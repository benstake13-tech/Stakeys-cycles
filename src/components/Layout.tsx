import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CallBar from './CallBar';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CallBar />
      {/* Keeps content clear of the sticky mobile call bar */}
      <div aria-hidden className="h-24 sm:hidden" />
    </div>
  );
}
