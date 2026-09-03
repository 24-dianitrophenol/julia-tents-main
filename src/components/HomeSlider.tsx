import { getAssetUrl } from '@/lib/config';
import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  link: string;
  linkLabel: string;
}

const slides: Slide[] = [
  {
    image: getAssetUrl('images/tents/slide_one.jpg'),
    title: 'Quality tents manufactured and rented in Uganda',
    subtitle: 'From quick pop-up camping tents to 100-seater event marquees — durable materials and factory-direct pricing.',
    link: '/products',
    linkLabel: 'Browse tent catalog',
  },
  {
    image: getAssetUrl('images/tents/100_seater_20x30ft.jpg'),
    title: 'Wedding & event marquee setups',
    subtitle: 'Make your special day unforgettable with commercial PVC tents, church windows, and full on-site setup.',
    link: '/products',
    linkLabel: 'Explore event tents',
  },
  {
    image: getAssetUrl('images/tents/on_wooden_platform.jpg'),
    title: 'Safari lodge & luxury glamping tents',
    subtitle: 'Heavy-duty 420g waterproof canvas lodge tents engineered for wilderness lodges, eco-resorts, and getaways.',
    link: '/products',
    linkLabel: 'View glamping tents',
  },
  {
    image: getAssetUrl('images/tents/beige_canopy.jpg'),
    title: 'Promotional gazebos & pagoda canopies',
    subtitle: 'Quick 60-second foldable gazebos and high-peak pagoda tents with custom logo printing available.',
    link: '/services',
    linkLabel: 'Check branding services',
  },
];


export default function HomeSlider() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, next]);

  return (
    <section
      className="relative h-screen overflow-hidden"
      onMouseEnter={() => setAutoPlay(false)}
      onMouseLeave={() => setAutoPlay(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/50 via-stone-900/40 to-stone-900/80" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center max-w-4xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-200 text-sm font-medium mb-6"
          >
            Julia <span className="text-amber-400 font-semibold">Tents</span> — Event & Camping Shelters Uganda
          </motion.span>


          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-[1.1]">
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl text-stone-200 mt-6 max-w-2xl mx-auto leading-relaxed">
                {slides[current].subtitle}
              </p>
              <Link to={slides[current].link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group mt-8 bg-amber-500 hover:bg-amber-400 text-white font-semibold px-8 py-4 rounded-full flex items-center gap-2 mx-auto transition-colors shadow-lg shadow-amber-500/30"
                >
                  {slides[current].linkLabel}
                  <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Previous slide"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Next slide"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all ${
              i === current ? 'w-8 bg-amber-500' : 'w-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
