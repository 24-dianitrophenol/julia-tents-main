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
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-200/90 shadow-xs"
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center group">
          <JuliaTentsLogo theme="light" size="md" />
        </Link>

        {/* Desktop Nav Links - Always clearly visible dark text on white header */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => {
            const active = location.pathname === link.path || (link.path === '/products' && location.pathname.startsWith('/tent/'));
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-sm tracking-normal transition-colors rounded-full ${
                  active
                    ? 'text-amber-700 font-bold bg-amber-50'
                    : 'text-stone-700 hover:text-amber-600 hover:bg-stone-50 font-medium'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/checkout"
            aria-label="View cart"
            className="relative p-2 sm:p-2.5 rounded-full flex items-center justify-center text-stone-700 hover:text-amber-600 hover:bg-stone-100 transition-all"
          >
            <FontAwesomeIcon icon={faCartShopping} className="text-base sm:text-lg" />
            <AnimatePresence>
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] sm:text-[11px] font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-xs"
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
            className="hidden sm:inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-sm shadow-amber-500/20 hover:shadow-amber-500/30 transition-all hover:scale-105"
          >
            <FontAwesomeIcon icon={faPhone} className="text-xs" />
            Request a quote
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            className="lg:hidden p-2 sm:p-2.5 rounded-full flex items-center justify-center text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} className="text-lg" />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white overflow-hidden border-t border-stone-200 shadow-lg"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2.5 px-3 text-base font-medium rounded-lg ${
                    location.pathname === link.path ? 'text-amber-600 bg-amber-50 font-bold' : 'text-stone-700 hover:bg-stone-50'
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
                Request a quote
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
