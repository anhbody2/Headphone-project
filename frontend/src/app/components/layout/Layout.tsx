import { Outlet, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchProvider } from '../layout/Search';
import { ScrollToTop } from '../ui/scroll-to-top';
import { AuthProvider } from '../../../hook/authContext';
import { SearchOverlay } from './SearchOverlay';
export function Layout() {
  const { pathname } = useLocation();
  const hasBanner = pathname === '/';

  const [isBannerVisible, setIsBannerVisible] = useState(hasBanner);

  useEffect(() => {
    setIsBannerVisible(hasBanner);
  }, [hasBanner]);

  return (
    <div className="min-h-screen flex flex-col">
      <AuthProvider>
      <SearchProvider>
        <ScrollToTop />
        <SearchOverlay />
        <Header isTransparent={hasBanner && isBannerVisible} />

        <main className="flex-1 min-h-[calc(100vh-120px)]">
          <Outlet context={{ setIsBannerVisible }} />
        </main>

        <Footer />
      </SearchProvider>
      </AuthProvider>
    </div>
  );
}
