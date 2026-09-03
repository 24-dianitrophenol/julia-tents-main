import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faArrowRight, faTruckFast, faHandshakeAngle, faHammer } from '@fortawesome/free-solid-svg-icons';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { getAssetUrl } from '@/lib/config';

export default function About() {
  const values = [
    { icon: faAward, title: 'Commercial grade PVC', text: 'Flame retardant, 100% waterproof blockout fabrics built for heavy tropical rains and strong sun.' },
    { icon: faTruckFast, title: 'Kampala rapid delivery', text: 'Prompt logistics, on-time venue dispatch, and clean takedown across Uganda.' },
    { icon: faHandshakeAngle, title: 'Dedicated crew', text: 'Experienced rigging and installation team for safe structural anchoring.' },
    { icon: faHammer, title: 'Custom manufacturing', text: 'Tailored dimensions, custom color combinations, and corporate logo printing.' },
  ];

  return (
    <PageTransition>
      <PageHeader
        label="Our story & mission"
        title="Quality tents engineered for Uganda"
        subtitle="Julia Tents is a Kampala-based tent manufacturer and event shelter rental company, serving weddings, corporate events, church functions, and outdoor adventures."
        image={getAssetUrl('images/tents/15ftx12ft_executive.jpg')}
      />

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg bg-stone-200"
            >
              <img
                src={getAssetUrl('images/tents/on_wooden_platform.jpg')}
                alt="Luxury glamping and outdoor tents"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-amber-600 font-medium text-sm">Who we are</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1 mb-6">
                From local manufacturing to nationwide event setups
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                What began as a specialized canvas workshop in Kampala has expanded into a full-scale tent manufacturing and rental enterprise. We provide heavy-duty 50 to 200-seater event marquees, high-peak pagoda gazebos, safari lodge retreats, and compact camping domes.
              </p>
              <p className="text-stone-600 text-sm leading-relaxed mb-4">
                We handle the heavy lifting for you — transport, structural assembly, anchoring, and post-event takedown — so you and your guests can focus entirely on celebrating.
              </p>
              <Link to="/products" className="inline-flex items-center gap-2 text-amber-600 font-semibold hover:gap-3 transition-all text-sm mt-2">
                Browse our tent collection <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="text-amber-600 font-medium text-sm">Our core principles</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">What we stand for</h2>
            <p className="text-stone-500 text-sm mt-2">The standards behind every shelter we manufacture and pitch</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-stone-50 rounded-3xl p-6 border border-stone-100/80 hover:border-amber-200 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-600 text-2xl mb-4">
                    <FontAwesomeIcon icon={value.icon} />
                  </div>
                  <h3 className="font-display text-base md:text-lg font-bold text-stone-900 mb-2">{value.title}</h3>
                  <p className="text-xs md:text-sm text-stone-600 leading-relaxed">{value.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
