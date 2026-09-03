import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers, faMagnifyingGlass, faSliders, faRuler, faXmark, faCheck,
  faCampground, faChampagneGlasses, faTree, faWarehouse, faStore, faBagShopping
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { tents, categoryLabels, formatUGX, type TentCategory } from '@/data/tents';
import { WHATSAPP_NUMBER, getAssetUrl } from '@/lib/config';

const categories: (TentCategory | 'all')[] = ['all', 'camping', 'event', 'safari', 'dome', 'canopy'];

const categoryIcons: Record<TentCategory | 'all', any> = {
  all: faCampground,
  camping: faCampground,
  event: faChampagneGlasses,
  safari: faTree,
  dome: faWarehouse,
  canopy: faStore,
};

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<TentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'capacity'>('price-low');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = tents;
    if (activeCategory !== 'all') {
      result = result.filter(t => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        t =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.material.toLowerCase().includes(q)
      );
    }
    const sorted = [...result];
    if (sortBy === 'price-low') sorted.sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sortBy === 'price-high') sorted.sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sortBy === 'capacity') sorted.sort((a, b) => b.capacity - a.capacity);
    return sorted;
  }, [activeCategory, searchQuery, sortBy]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: tents.length };
    tents.forEach(t => {
      counts[t.category] = (counts[t.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <PageTransition>
      <PageHeader
        label="Catalog & rental inventory"
        title="Explore our tent collection"
        subtitle="Genuine tents for camping, weddings, VIP pagodas, and corporate events across Uganda. Direct factory pricing in Ugandan Shillings."
        image={getAssetUrl('images/tents/arc_tent_20x10.jpg')}
      />

      {/* Desktop Filter Bar & Sticky Mobile Action Bar */}
      <section className="py-4 md:py-6 bg-white/95 sticky top-16 md:top-20 z-30 border-b border-stone-200/90 shadow-xs backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          {/* Mobile Filter & Search Bar */}
          <div className="flex md:hidden items-center gap-2">
            <div className="relative flex-1">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-xs" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search tents..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-stone-100 border border-stone-200 text-xs focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1.5 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-3.5 py-2 rounded-xl text-xs shadow-sm transition-transform active:scale-95 flex-shrink-0"
              aria-label="Open filter menu"
            >
              <FontAwesomeIcon icon={faSliders} />
              <span>{activeCategory === 'all' ? 'Filter' : categoryLabels[activeCategory].split(' ')[0]}</span>
              {activeCategory !== 'all' && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </button>
          </div>

          {/* Desktop Filter Controls */}
          <div className="hidden md:flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'bg-stone-100 border border-stone-200/80 text-stone-700 hover:bg-stone-200/70'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-amber-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <FontAwesomeIcon icon={categoryIcons[cat]} className="text-xs opacity-80" />
                    {cat === 'all' ? 'All tents' : categoryLabels[cat]}
                    <span className={`text-xs ml-1 px-1.5 py-0.5 rounded-full ${activeCategory === cat ? 'bg-amber-700/80 text-white' : 'bg-stone-200 text-stone-600'}`}>
                      {categoryCounts[cat] || 0}
                    </span>
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3 items-center">
              <div className="relative flex-1 lg:w-64">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search tents, size, material..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faSliders} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'price-low' | 'price-high' | 'capacity')}
                  className="pl-9 pr-8 py-2.5 rounded-xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer text-stone-700"
                >
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="capacity">Capacity (Guests)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Mobile & 3-Column Desktop Products Grid */}
      <section className="py-8 md:py-16 bg-stone-50 min-h-[50vh] pb-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 max-w-xl mx-auto p-6 sm:p-8">
              <p className="text-stone-700 font-semibold text-base sm:text-lg">No tents match your search criteria</p>
              <p className="text-stone-500 text-xs sm:text-sm mt-1">Try changing the category or clearing your search term.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map(tent => (
                  <motion.div
                    key={tent.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200/90 transition-all flex flex-col justify-between"
                  >
                    {/* Image Box */}
                    <Link to={`/tent/${tent.id}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-100 group">
                      <img
                        src={tent.image}
                        alt={tent.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/65 via-transparent to-transparent" />
                      
                      {tent.badge && (
                        <span className="absolute top-2 left-2 sm:top-3 sm:left-3 px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-500 text-white text-[10px] sm:text-xs font-bold shadow-xs">
                          {tent.badge}
                        </span>
                      )}
                      
                      <span className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 text-white text-[10px] sm:text-xs font-medium bg-black/50 backdrop-blur-md px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                        {categoryLabels[tent.category].split(' ')[0]}
                      </span>
                    </Link>

                    {/* Content Box */}
                    <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/tent/${tent.id}`}>
                          <h3 className="font-display text-xs sm:text-base md:text-lg font-bold text-stone-900 hover:text-amber-600 transition-colors line-clamp-2 leading-snug">
                            {tent.name}
                          </h3>
                        </Link>
                        <p className="hidden sm:block text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">{tent.tagline}</p>

                        <div className="flex items-center justify-between text-[10px] sm:text-xs text-stone-600 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-stone-100">
                          <span className="flex items-center gap-1 font-medium">
                            <FontAwesomeIcon icon={faUsers} className="text-amber-500 text-[10px]" /> {tent.capacity} ppl
                          </span>
                          <span className="flex items-center gap-1 text-stone-500 text-[10px] sm:text-xs truncate max-w-[55%]">
                            <FontAwesomeIcon icon={faRuler} className="text-amber-500 text-[10px]" /> {tent.size}
                          </span>
                        </div>
                      </div>

                      {/* Pricing & Order Button */}
                      <div className="flex items-center justify-between mt-3 pt-2.5 sm:pt-3 border-t border-stone-100 gap-1.5">
                        <div className="flex flex-col">
                          <span className="text-[9px] sm:text-[11px] text-stone-400 leading-none">Rate/day</span>
                          <span className="font-display text-xs sm:text-base md:text-lg font-bold text-stone-900 leading-tight">
                            {formatUGX(tent.pricePerDay)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi JuliaTents! I would like to order/rent: ${tent.name} (${formatUGX(tent.pricePerDay)}/day)`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:inline-flex p-2 rounded-xl text-[#25D366] hover:bg-green-50 transition-colors text-base"
                            title="Chat on WhatsApp"
                          >
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </a>

                          <Link
                            to={`/tent/${tent.id}`}
                            className="bg-amber-600 hover:bg-amber-500 active:scale-95 text-white text-[11px] sm:text-xs font-bold px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl transition-all inline-flex items-center gap-1 shadow-sm"
                          >
                            <FontAwesomeIcon icon={faBagShopping} className="text-[10px]" /> Order
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>

      {/* MOBILE HALF-SCREEN CURVED FILTER BOTTOM SHEET */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-stone-950/60 backdrop-blur-xs z-50 md:hidden"
            />

            {/* Bottom Sheet Drawer - Covers Half Way with Curved Top */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-[28px] max-h-[55vh] h-[52vh] flex flex-col shadow-2xl border-t border-stone-200/90 md:hidden overflow-hidden"
            >
              {/* Drag Handle Bar */}
              <div className="pt-3 pb-2 flex-shrink-0">
                <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto" />
              </div>

              {/* Drawer Header */}
              <div className="px-5 pb-3 pt-1 flex items-center justify-between border-b border-stone-100 flex-shrink-0">
                <div>
                  <h3 className="font-display text-base font-bold text-stone-900">Tent Categories</h3>
                  <p className="text-[11px] text-stone-500">Select product type to filter catalog</p>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 hover:bg-stone-200 flex items-center justify-center transition-colors"
                  aria-label="Close filters"
                >
                  <FontAwesomeIcon icon={faXmark} className="text-sm" />
                </button>
              </div>

              {/* Scrollable Categories List */}
              <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2">
                {categories.map(cat => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setActiveCategory(cat);
                        setIsFilterOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-left transition-all ${
                        isSelected
                          ? 'bg-amber-600 text-white font-bold shadow-sm'
                          : 'bg-stone-50 text-stone-800 hover:bg-stone-100 border border-stone-200/60 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm ${isSelected ? 'bg-white/20 text-white' : 'bg-amber-100 text-amber-700'}`}>
                          <FontAwesomeIcon icon={categoryIcons[cat]} />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm block">
                            {cat === 'all' ? 'All Tents & Shelters' : categoryLabels[cat]}
                          </span>
                          <span className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-stone-400'}`}>
                            {categoryCounts[cat] || 0} models available
                          </span>
                        </div>
                      </div>

                      {isSelected ? (
                        <FontAwesomeIcon icon={faCheck} className="text-white text-sm" />
                      ) : (
                        <span className="text-xs text-stone-400 font-semibold">{categoryCounts[cat] || 0}</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Drawer Footer Action */}
              <div className="p-4 bg-stone-50 border-t border-stone-100 flex gap-2 flex-shrink-0 pb-[calc(env(safe-area-inset-bottom,0px)+12px)]">
                {activeCategory !== 'all' && (
                  <button
                    onClick={() => {
                      setActiveCategory('all');
                      setIsFilterOpen(false);
                    }}
                    className="flex-1 bg-white border border-stone-300 text-stone-700 font-semibold py-2.5 rounded-xl text-xs"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="flex-2 bg-amber-600 text-white font-bold py-2.5 rounded-xl text-xs shadow-sm"
                >
                  Show {filtered.length} Tents
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
