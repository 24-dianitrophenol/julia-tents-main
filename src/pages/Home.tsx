import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight, faStar, faUsers, faCalendarDays, faBolt,
  faShieldHalved, faTruckFast, faBagShopping, faClock,
} from '@fortawesome/free-solid-svg-icons';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import HomeSlider from '@/components/HomeSlider';
import { tents, categoryLabels, formatUGX } from '@/data/tents';
import { WHATSAPP_NUMBER } from '@/lib/config';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: paraProgress } = useScroll({
    target: parallaxRef,
    offset: ['start end', 'end start'],
  });
  const paraBgY = useTransform(paraProgress, [0, 1], ['-15%', '15%']);

  const featured = tents.slice(0, 6);

  const stats = [
    { icon: faUsers, value: '5,000+', label: 'Events sheltered across Uganda' },
    { icon: faCalendarDays, value: '8+ years', label: 'Manufacturing & rental experience' },
    { icon: faStar, value: '4.9 / 5', label: 'Customer satisfaction rating' },
    { icon: faBolt, value: '12+ models', label: 'Available for hire and purchase' },
  ];

  const highlights = [
    {
      icon: faTruckFast,
      title: 'Free delivery & on-site pitch',
      desc: 'Our trained crew delivers, pitches, and secures your tent anywhere in Kampala & Wakiso at zero extra setup fee.',
    },
    {
      icon: faShieldHalved,
      title: 'Heavy-duty 100% waterproof',
      desc: 'All tents are crafted with commercial flame-retardant PVC or ripstop canvas with UV50+ sun protection.',
    },
    {
      icon: faWhatsapp,
      title: 'Instant WhatsApp booking',
      desc: 'Select your tent and send your event details directly to our WhatsApp for instant availability confirmation.',
    },
    {
      icon: faClock,
      title: '24/7 Event emergency support',
      desc: 'Our support line is open round-the-clock during your rental period for any technical adjustments needed.',
    },
  ];

  return (
    <PageTransition>
      <HomeSlider />

      {/* Stats Bar */}
      <section className="bg-stone-950 py-12 border-y border-stone-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <span className="text-amber-500 text-3xl mb-2.5">
                <FontAwesomeIcon icon={stat.icon} />
              </span>
              <span className="font-display text-3xl md:text-4xl font-bold text-white tracking-tight">{stat.value}</span>
              <span className="text-xs md:text-sm text-stone-400 mt-1 max-w-[180px]">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Tents */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-amber-600 font-medium text-sm tracking-normal">Featured products</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">
                Tents available for hire & purchase
              </h2>
              <p className="text-stone-500 text-sm mt-1">
                Real photos, genuine specifications, and standard Ugandan market rates
              </p>
            </div>
            <Link to="/products" className="group inline-flex items-center gap-2 text-amber-600 font-medium hover:gap-3 transition-all">
              View all tents
              <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
            {featured.map((tent, i) => (
              <motion.div
                key={tent.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200/90 transition-all flex flex-col justify-between"
              >
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

                  <div className="flex items-center justify-between mt-3 pt-2.5 sm:pt-3 border-t border-stone-100 gap-1.5">
                    <div className="flex flex-col">
                      <span className="text-[9px] sm:text-[11px] text-stone-400 leading-none">Rate/day</span>
                      <span className="font-display text-xs sm:text-base md:text-lg font-bold text-stone-900 leading-tight">
                        {formatUGX(tent.pricePerDay)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi JuliaTents! I want to inquire about renting: ${tent.name} (${formatUGX(tent.pricePerDay)}/day)`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden sm:inline-flex p-2 rounded-xl text-[#25D366] hover:bg-green-50 transition-colors text-base"
                        title="Inquire on WhatsApp"
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
          </div>
        </div>
      </section>

      {/* Highlights / Why Choose Us */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-amber-600 font-medium text-sm">Why choose JuliaTents</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">
              Complete peace of mind for your event
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              From family weekend camping in Jinja to high-profile 200-guest wedding receptions in Kampala.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-stone-50 border border-stone-100 hover:border-amber-200 transition-colors"
              >
                <div className="text-amber-600 text-2xl mb-4">
                  <FontAwesomeIcon icon={h.icon} />
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{h.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax Quote Banner */}
      <section ref={parallaxRef} className="relative h-[55vh] overflow-hidden flex items-center justify-center">
        <motion.div
          style={{ y: paraBgY }}
          className="absolute inset-0 z-0"
        >
          <img
            src="/images/tents/luxury_frame_tent.jpg"
            alt="Camping and outdoor adventure in Uganda"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-stone-950/70" />
        </motion.div>
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6 max-w-3xl"
        >
          <p className="font-display text-2xl md:text-4xl text-white font-medium text-balance leading-relaxed">
            "The best outdoor moments and milestone celebrations happen with comfort under the right tent."
          </p>
          <footer className="mt-4 text-amber-400 text-base font-medium">— Julia Tents Company</footer>

        </motion.blockquote>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-white text-balance"
          >
            Ready to book a tent for your event?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-amber-50 text-base md:text-lg mt-4 max-w-2xl mx-auto"
          >
            Browse our full catalog, customize your order, and confirm instantly over WhatsApp. We take care of delivery, setup, and takedown.
          </motion.p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link to="/products">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-white text-amber-800 font-bold px-8 py-3.5 rounded-full hover:bg-stone-100 transition-colors shadow-lg"
              >
                Browse catalog
              </motion.button>
            </Link>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi JuliaTents! I would like to get a quote for tent hire/purchase.')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto bg-stone-900 text-white font-bold px-8 py-3.5 rounded-full hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-[#25D366] text-lg" /> Chat on WhatsApp
              </motion.button>
            </a>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

