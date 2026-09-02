import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faMagnifyingGlass, faSliders, faBagShopping, faRuler } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { tents, categoryLabels, formatUGX, type TentCategory } from '@/data/tents';
import { WHATSAPP_NUMBER } from '@/lib/config';

const categories: (TentCategory | 'all')[] = ['all', 'camping', 'event', 'safari', 'dome', 'canopy'];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState<TentCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'capacity'>('price-low');

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

  return (
    <PageTransition>
      <PageHeader
        label="Catalog & rental inventory"
        title="Explore our tent collection"
        subtitle="Genuine tents for camping, weddings, VIP pagodas, and corporate events across Uganda. Direct factory pricing in Ugandan Shillings."
        image="https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-8 bg-stone-50 sticky top-20 z-30 border-b border-stone-200 shadow-sm backdrop-blur-md bg-stone-50/95">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all relative ${
                    activeCategory === cat
                      ? 'text-white'
                      : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
                  }`}
                >
                  {activeCategory === cat && (
                    <motion.span
                      layoutId="activeCategory"
                      className="absolute inset-0 bg-amber-600 rounded-xl"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {cat === 'all' ? 'All tents' : categoryLabels[cat]}
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
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>
              <div className="relative">
                <FontAwesomeIcon icon={faSliders} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm pointer-events-none" />
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as 'price-low' | 'price-high' | 'capacity')}
                  className="pl-9 pr-8 py-2.5 rounded-xl bg-white border border-stone-200 text-sm focus:outline-none focus:border-amber-500 appearance-none cursor-pointer text-stone-700"
                >
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="capacity">Capacity (guests)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-stone-50 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-stone-200 max-w-xl mx-auto p-8">
              <p className="text-stone-700 font-semibold text-lg">No tents match your search criteria</p>
              <p className="text-stone-500 text-sm mt-1">Try changing category or clearing your search term.</p>
              <button
                onClick={() => { setActiveCategory('all'); setSearchQuery(''); }}
                className="mt-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-colors"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filtered.map(tent => (
                  <motion.div
                    key={tent.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-200/80 transition-all flex flex-col"
                  >
                    <Link to={`/tent/${tent.id}`} className="relative block aspect-[4/3] overflow-hidden bg-stone-100 group">
                      <img
                        src={tent.image}
                        alt={tent.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent" />
                      {tent.badge && (
                        <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-medium shadow-sm">
                          {tent.badge}
                        </span>
                      )}
                      <span className="absolute bottom-3 left-4 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md">
                        {categoryLabels[tent.category]}
                      </span>
                    </Link>

                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <Link to={`/tent/${tent.id}`}>
                          <h3 className="font-display text-xl font-bold text-stone-900 hover:text-amber-600 transition-colors leading-snug">
                            {tent.name}
                          </h3>
                        </Link>
                        <p className="text-stone-500 text-xs mt-1.5 line-clamp-2 leading-relaxed">{tent.tagline}</p>

                        <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 mt-4 pt-3 border-t border-stone-100">
                          <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faUsers} className="text-amber-500" /> {tent.capacity} people
                          </span>
                          <span className="flex items-center gap-1.5">
                            <FontAwesomeIcon icon={faRuler} className="text-amber-500" /> {tent.size}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-5 pt-3 border-t border-stone-100">
                        <div>
                          <span className="text-xs text-stone-400 block">Hire rate</span>
                          <span className="font-display text-lg font-bold text-stone-900">{formatUGX(tent.pricePerDay)}</span>
                          <span className="text-stone-400 text-xs font-normal"> / day</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi JuliaTents! I would like to book or ask about: ${tent.name} (${formatUGX(tent.pricePerDay)}/day)`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full text-[#25D366] hover:bg-green-50 transition-colors text-lg"
                            title="Chat on WhatsApp"
                          >
                            <FontAwesomeIcon icon={faWhatsapp} />
                          </a>
                          <Link
                            to={`/tent/${tent.id}`}
                            className="bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors inline-flex items-center gap-1.5"
                          >
                            <FontAwesomeIcon icon={faBagShopping} /> Details
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
    </PageTransition>
  );
}

