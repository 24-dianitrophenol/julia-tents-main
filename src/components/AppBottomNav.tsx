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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-stone-200/80 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-safe">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {tabs.map(tab => {
          const active = location.pathname === tab.path || (tab.path === '/products' && location.pathname.startsWith('/tent/'));
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 relative transition-colors ${
                active ? 'text-amber-600 font-semibold' : 'text-stone-400 hover:text-stone-600'
              }`}
            >
              <div className="relative">
                <FontAwesomeIcon icon={tab.icon} className={`text-lg transition-transform ${active ? 'scale-110' : ''}`} />
                {Boolean(tab.badge && tab.badge > 0) && (
                  <span className="absolute -top-1.5 -right-2.5 bg-amber-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight leading-none">{tab.label}</span>
              {active && (
                <span className="w-1 h-1 rounded-full bg-amber-600 mt-0.5" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
