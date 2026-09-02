import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faUsers, faRuler, faCheck, faStar, faMinus, faPlus, faCartShopping,
  faShieldHalved, faClock,
} from '@fortawesome/free-solid-svg-icons';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import { tents, formatUGX, categoryLabels } from '@/data/tents';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_NUMBER } from '@/lib/config';

export default function TentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const tent = tents.find(t => t.id === id);

  const [quantity, setQuantity] = useState(1);
  const [durationDays, setDurationDays] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [added, setAdded] = useState(false);

  if (!tent) {
    return (
      <PageTransition>
        <div className="pt-40 pb-20 text-center min-h-screen bg-stone-50">
          <h1 className="font-display text-3xl font-bold text-stone-900">Tent model not found</h1>
          <p className="text-stone-500 text-sm mt-2">The tent you are looking for might have been moved or updated.</p>
          <Link to="/products" className="text-amber-600 font-semibold hover:underline mt-4 inline-block">
            &larr; Return to catalog
          </Link>
        </div>
      </PageTransition>
    );
  }

  const totalPrice = tent.pricePerDay * quantity * durationDays;

  const handleAddToCart = () => {
    addItem(tent, quantity, durationDays);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  const directWhatsAppInquiry = () => {
    const lines = [
      `*Inquiry from Julia Tents website*`,
      ``,

      `*Tent:* ${tent.name}`,
      `*Quantity:* ${quantity} unit(s)`,
      `*Duration:* ${durationDays} day(s)`,
      `*Estimated total:* ${formatUGX(totalPrice)}`,
      `*Size / capacity:* ${tent.size} (${tent.capacity} people)`,
      ``,
      `Please let me know availability and delivery details.`,
    ];
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
  };

  return (
    <PageTransition>
      <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-stone-600 hover:text-amber-600 transition-colors font-medium text-sm"
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Back to previous page
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div>
              <motion.div
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg mb-4 bg-stone-200"
              >
                <img
                  src={tent.gallery[activeImage] || tent.image}
                  alt={tent.name}
                  className="w-full h-full object-cover"
                />
                {tent.badge && (
                  <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-amber-500 text-white text-xs font-medium shadow-md">
                    {tent.badge}
                  </span>
                )}
                <span className="absolute bottom-4 left-4 text-white text-xs font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg">
                  {categoryLabels[tent.category]}
                </span>
              </motion.div>

              {tent.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {tent.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`rounded-2xl overflow-hidden aspect-[4/3] transition-all bg-stone-100 ${
                        activeImage === i
                          ? 'ring-2 ring-amber-500 ring-offset-2 opacity-100 scale-105'
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`${tent.name} photo ${i + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Technical specs table */}
              <div className="mt-8 bg-white rounded-3xl p-6 border border-stone-200/80 shadow-sm">
                <h3 className="font-display text-lg font-bold text-stone-900 mb-4">Technical specifications</h3>
                <div className="divide-y divide-stone-100 text-sm">
                  <div className="py-2.5 flex justify-between">
                    <span className="text-stone-500">Dimensions</span>
                    <span className="font-semibold text-stone-800 text-right">{tent.size}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-stone-500">Capacity</span>
                    <span className="font-semibold text-stone-800 text-right">{tent.capacity} persons</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-stone-500">Fabric material</span>
                    <span className="font-semibold text-stone-800 text-right">{tent.material}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-stone-500">Waterproof rating</span>
                    <span className="font-semibold text-stone-800 text-right">{tent.waterproofIndex}</span>
                  </div>
                  <div className="py-2.5 flex justify-between">
                    <span className="text-stone-500">Frame construction</span>
                    <span className="font-semibold text-stone-800 text-right">{tent.frameType}</span>
                  </div>
                  {tent.setupTime && (
                    <div className="py-2.5 flex justify-between">
                      <span className="text-stone-500">Estimated setup time</span>
                      <span className="font-semibold text-stone-800 text-right">{tent.setupTime}</span>
                    </div>
                  )}
                  {tent.salePrice && (
                    <div className="py-2.5 flex justify-between text-amber-700 bg-amber-50/60 px-3 rounded-lg mt-2">
                      <span>Outright purchase price</span>
                      <span className="font-bold">{formatUGX(tent.salePrice)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Info & Booking */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-amber-600 font-medium text-sm">
                  {categoryLabels[tent.category]}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1 leading-tight">
                  {tent.name}
                </h1>
                <p className="text-stone-500 text-base mt-2">{tent.tagline}</p>

                <div className="flex items-center gap-1.5 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <FontAwesomeIcon key={i} icon={faStar} className="text-amber-400 text-sm" />
                  ))}
                  <span className="text-xs text-stone-500 ml-2 font-medium">(4.9 out of 5 based on recent rentals)</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 py-6 border-y border-stone-200">
                  <div className="flex flex-col">
                    <span className="text-amber-600 text-lg mb-1"><FontAwesomeIcon icon={faUsers} /></span>
                    <span className="text-xs text-stone-400">Capacity</span>
                    <span className="font-semibold text-stone-800 text-sm">{tent.capacity} guests</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-amber-600 text-lg mb-1"><FontAwesomeIcon icon={faRuler} /></span>
                    <span className="text-xs text-stone-400">Dimensions</span>
                    <span className="font-semibold text-stone-800 text-sm">{tent.size}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-amber-600 text-lg mb-1"><FontAwesomeIcon icon={faShieldHalved} /></span>
                    <span className="text-xs text-stone-400">Weatherproof</span>
                    <span className="font-semibold text-stone-800 text-sm">100% waterproof</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-amber-600 text-lg mb-1"><FontAwesomeIcon icon={faClock} /></span>
                    <span className="text-xs text-stone-400">Setup time</span>
                    <span className="font-semibold text-stone-800 text-sm">{tent.setupTime || 'Fast pitch'}</span>
                  </div>
                </div>

                <p className="text-stone-600 text-sm leading-relaxed mt-6">{tent.description}</p>

                <div className="mt-6">
                  <h3 className="font-semibold text-stone-900 text-sm mb-3">Key package features & inclusions</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {tent.features.map(feature => (
                      <div key={feature} className="flex items-start gap-2.5 text-xs md:text-sm text-stone-700">
                        <FontAwesomeIcon icon={faCheck} className="text-amber-600 mt-1 flex-shrink-0 text-xs" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking controls */}
                <div className="mt-8 bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6 md:p-8">
                  <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-stone-100">
                    <div>
                      <span className="text-xs text-stone-400 block">Daily rental rate</span>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-3xl md:text-4xl font-bold text-stone-900">{formatUGX(tent.pricePerDay)}</span>
                        <span className="text-stone-400 text-sm"> / day</span>
                      </div>
                    </div>
                    {tent.salePrice && (
                      <div className="text-right">
                        <span className="text-xs text-stone-400 block">Or buy new</span>
                        <span className="text-sm font-semibold text-amber-700">{formatUGX(tent.salePrice)}</span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">Number of tents</label>
                      <div className="flex items-center gap-2 bg-stone-50 rounded-2xl p-1 border border-stone-200">
                        <button
                          onClick={() => setQuantity(q => Math.max(1, q - 1))}
                          className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Decrease quantity"
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-xs" />
                        </button>
                        <span className="flex-1 text-center font-bold text-base text-stone-900">{quantity}</span>
                        <button
                          onClick={() => setQuantity(q => Math.min(20, q + 1))}
                          className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Increase quantity"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-stone-600 block mb-1.5">Rental duration (days)</label>
                      <div className="flex items-center gap-2 bg-stone-50 rounded-2xl p-1 border border-stone-200">
                        <button
                          onClick={() => setDurationDays(d => Math.max(1, d - 1))}
                          className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Decrease days"
                        >
                          <FontAwesomeIcon icon={faMinus} className="text-xs" />
                        </button>
                        <span className="flex-1 text-center font-bold text-base text-stone-900">{durationDays}</span>
                        <button
                          onClick={() => setDurationDays(d => Math.min(60, d + 1))}
                          className="w-9 h-9 rounded-xl bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors shadow-xs"
                          aria-label="Increase days"
                        >
                          <FontAwesomeIcon icon={faPlus} className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-t border-stone-100 mb-5">
                    <div>
                      <span className="text-xs text-stone-500 block">Calculated rental total</span>
                      <span className="text-xs text-green-600 font-medium">&bull; Free delivery & pitch in Kampala</span>
                    </div>
                    <span className="font-display text-2xl font-bold text-stone-900">{formatUGX(totalPrice)}</span>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full bg-amber-600 hover:bg-amber-500 text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-amber-600/20"
                    >
                      <AnimatePresence mode="wait">
                        {added ? (
                          <motion.span
                            key="added"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faCheck} /> Added to inquiry cart!
                          </motion.span>
                        ) : (
                          <motion.span
                            key="add"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="flex items-center gap-2"
                          >
                            <FontAwesomeIcon icon={faCartShopping} /> Add to inquiry cart
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>

                    <button
                      onClick={directWhatsAppInquiry}
                      className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-green-600/20"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="text-lg" /> Inquire directly on WhatsApp
                    </button>

                    <Link to="/checkout" className="block text-center pt-2">
                      <span className="text-amber-700 hover:text-amber-800 text-xs font-semibold hover:underline">
                        Proceed to checkout cart &rarr;
                      </span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

