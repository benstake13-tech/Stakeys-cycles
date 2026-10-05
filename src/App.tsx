import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PriceListPage from './pages/PriceListPage';
import ShopPage from './pages/ShopPage';
import GalleryPage from './pages/GalleryPage';
import FaqsPage from './pages/FaqsPage';
import LocationPage from './pages/LocationPage';
import JoinTeamPage from './pages/JoinTeamPage';
import NotFoundPage from './pages/NotFoundPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="price-list" element={<PriceListPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="faqs" element={<FaqsPage />} />
          <Route path="location" element={<LocationPage />} />
          <Route path="join-the-team" element={<JoinTeamPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
