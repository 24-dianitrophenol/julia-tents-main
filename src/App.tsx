import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import AppBottomNav from '@/components/AppBottomNav';
import ScrollToTop from '@/components/ScrollToTop';
import Home from '@/pages/Home';
import Products from '@/pages/Products';
import TentDetail from '@/pages/TentDetail';
import Checkout from '@/pages/Checkout';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Services from '@/pages/Services';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/tent/:id" element={<TentDetail />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-stone-50 flex flex-col relative pb-16 lg:pb-0">
          <PWAInstallBanner />
          <Navbar />
          <main className="flex-1">
            <AnimatedRoutes />
          </main>
          <FloatingWhatsApp />
          <AppBottomNav />
        </div>
      </HashRouter>
    </CartProvider>
  );
}


