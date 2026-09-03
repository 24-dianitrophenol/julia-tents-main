import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faBars, faXmark, faPhone } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_NUMBER } from '@/lib/config';
import JuliaTentsLogo from '@/components/JuliaTentsLogo';


export default function Navbar() {
  const location = useLocation();
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Products', path: '/products' },
    { label: 'Services', path: '/services' },
    { label: 'Contact', path: '/contact' },
  ];

  const quoteLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi JuliaTents! I would like to request a quote.')}`;

  const isHome = location.pathname === '/';

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-stone-200/80'
          : 'bg-white/90 sm:bg-transparent backdrop-blur-md sm:backdrop-blur-none border-b border-stone-200/60 sm:border-none'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <JuliaTentsLogo theme={scrolled || !isHome ? 'light' : 'auto'} size="md" />
        </Link>


        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="relative px-4 py-2 text-sm font-medium tracking-normal transition-colors rounded-full"
              >
                {active && (
                  <motion.span
                    layoutId="navPill"
                    className={`absolute inset-0 rounded-full ${
                      scrolled ? 'bg-amber-100' : 'bg-white/15 backdrop-blur-md'
                    }`}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={`relative z-10 transition-colors ${
                    scrolled
                      ? active
                        ? 'text-amber-700 font-semibold'
                        : 'text-stone-600 hover:text-amber-600'
                      : active
                        ? 'text-white font-semibold'
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/checkout"
            aria-label="View cart"
            className={`relative p-2 sm:p-2.5 rounded-full flex items-center justify-center transition-all ${
              scrolled || !isHome
                ? 'text-stone-700 hover:text-amber-600 hover:bg-stone-100'
                : 'text-stone-800 sm:text-white hover:text-amber-600 sm:hover:text-amber-300 hover:bg-stone-100 sm:hover:bg-white/10'
            }`}
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-base sm:text-lg" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-sm"
                >
                  {totalItems}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <a
            href={quoteLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md shadow-amber-500/25 hover:shadow-amber-500/40 transition-all hover:scale-105"
          >
            <FontAwesomeIcon icon={faPhone} className="text-xs" />
            Request a quote
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className={`lg:hidden p-2 sm:p-2.5 rounded-full flex items-center justify-center transition-colors ${
              scrolled || !isHome
                ? 'text-stone-700 hover:bg-stone-100'
                : 'text-stone-800 sm:text-white hover:bg-stone-100 sm:hover:bg-white/10'
            }`}
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-stone-50/95 backdrop-blur-md overflow-hidden border-t border-stone-200"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2.5 px-3 text-base font-medium rounded-lg ${
                    location.pathname === link.path ? 'text-amber-600 bg-amber-50' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-3 rounded-full transition-colors"
              >
                <FontAwesomeIcon icon={faPhone} />
                Request a Quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
