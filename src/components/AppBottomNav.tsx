import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCampground, faWrench, faBagShopping, faHeadset } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/context/CartContext';

export default function AppBottomNav() {
  const location = useLocation();
  const { totalItems } = useCart();

  const tabs = [
    { label: 'Home', path: '/', icon: faHouse },
    { label: 'Tents', path: '/products', icon: faCampground },
    { label: 'Services', path: '/services', icon: faWrench },
    { label: 'Cart', path: '/checkout', icon: faBagShopping, badge: totalItems },
    { label: 'Contact', path: '/contact', icon: faHeadset },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/98 backdrop-blur-xl border-t border-stone-200/90 shadow-[0_-6px_25px_rgba(0,0,0,0.08)] pb-[calc(env(safe-area-inset-bottom,0px)+6px)] pt-2">
      <div className="flex items-center justify-around h-16 sm:h-18 px-2 max-w-md mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.path || (tab.path === '/products' && location.pathname.startsWith('/tent/'));
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center py-2 px-1 relative rounded-2xl transition-all ${
                active ? 'text-amber-600 font-bold bg-amber-50/80 scale-105' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <FontAwesomeIcon icon={tab.icon} className={`text-xl sm:text-2xl transition-transform ${active ? 'scale-110 text-amber-600' : 'text-stone-400'}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-3 bg-amber-500 text-white text-[11px] font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] sm:text-xs mt-1.5 tracking-tight leading-none ${active ? 'font-bold text-amber-700' : 'font-medium text-stone-500'}`}>
                {tab.label}
              </span>
              {active && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-1" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
