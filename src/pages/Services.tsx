import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck, faScrewdriverWrench, faShieldHalved, faCakeCandles,
  faCamera, faUsers, faCircleCheck,
} from '@fortawesome/free-solid-svg-icons';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { WHATSAPP_NUMBER } from '@/lib/config';

export default function Services() {
  const services = [
    { icon: faTruck, title: 'Delivery & on-site pitch', text: 'We deliver, assemble, secure, and anchor every tent at your location in Kampala, Wakiso, and upcountry.' },
    { icon: faScrewdriverWrench, title: 'Custom manufacturing', text: 'Need a tent built to your dimensions? We manufacture heavy-duty PVC and ripstop canvas tents to order.' },
    { icon: faShieldHalved, title: 'Maintenance & waterproofing', text: 'Professional high-pressure washing, re-waterproofing coating, and frame repair to extend tent life.' },
    { icon: faCakeCandles, title: 'Event layout & seating planning', text: 'From wedding receptions to corporate functions, we help map seating layouts, stage placement, and canopy flow.' },
    { icon: faCamera, title: 'Branding & logo printing', text: 'Custom screen-print your gazebo and pagoda roof panels with brand logos, slogans, and corporate colors.' },
    { icon: faUsers, title: 'Expert shelter consultation', text: 'Unsure about guest capacity or terrain requirements? Our team provides tailored recommendations.' },
  ];

  const process = [
    { step: '01', title: 'Choose your tent model', text: 'Select your preferred tent from our catalog or message our team on WhatsApp with your guest count.' },
    { step: '02', title: 'Instant WhatsApp quotation', text: 'We prepare an itemized quote with dates, delivery location, and setup timing for your review.' },
    { step: '03', title: 'Delivery & expert setup', text: 'Our trained crew arrives on schedule, builds the frame, tensions the canvas, and anchors all guy ropes.' },
    { step: '04', title: 'Event celebration & takedown', text: 'Enjoy your occasion. Once concluded, our team dismantles and retrieves all equipment smoothly.' },
  ];

  const quoteLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi JuliaTents! I would like to request a quote for your tent services.')}`;

  return (
    <PageTransition>
      <PageHeader
        label="Services & manufacturing"
        title="Full-service tent manufacturing & event hire"
        subtitle="Beyond rentals — we manufacture, brand, customize, and pitch. A single trusted partner for all your shelter requirements in Uganda."
        image="/images/tents/two_peaked.jpg"
      />

      {/* Services Grid */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="text-amber-600 font-medium text-sm">Our services</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">
              Everything under one roof
            </h2>
            <p className="text-stone-500 text-sm mt-2">End-to-end event shelter solutions tailored to your venue and budget</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-7 border border-stone-100 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="text-amber-600 text-2xl mb-4">
                  <FontAwesomeIcon icon={service.icon} />
                </div>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{service.title}</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">{service.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14 max-w-2xl mx-auto"
          >
            <span className="text-amber-600 font-medium text-sm">How it works</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">
              Simple 4-step rental process
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="relative bg-stone-50 rounded-3xl p-6 border border-stone-100"
              >
                <span className="font-display text-4xl font-black text-amber-500/30">{item.step}</span>
                <h3 className="font-display text-base font-bold text-stone-900 mt-2 mb-1.5">{item.title}</h3>
                <p className="text-xs md:text-sm text-stone-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-stone-50 border-t border-stone-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900">Why choose Julia Tents</h2>

          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              '8+ years of dedicated tent fabrication and rental service in Uganda',
              'Custom-built tents tailored to your specific event venue dimensions',
              'Free delivery and professional pitch in Kampala and surrounding areas',
              'Commercial-grade PVC and ripstop canvas fabrics tested for durability',
              'Precision branding and logo printing on canopy gazebos',
              'Responsive WhatsApp assistance from booking through to final takedown',
            ].map((point, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-stone-100 shadow-xs"
              >
                <FontAwesomeIcon icon={faCircleCheck} className="text-amber-500 flex-shrink-0" />
                <span className="text-xs md:text-sm text-stone-700">{point}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-amber-700">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl font-bold text-white"
          >
            Ready to request a custom quote?
          </motion.h2>
          <p className="text-amber-50 text-base md:text-lg mt-4">
            Tell us about your event dates and requirements — we will prepare an instant recommendation and quote on WhatsApp.
          </p>
          <a href={quoteLink} target="_blank" rel="noopener noreferrer">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="mt-8 bg-white text-amber-800 font-bold px-8 py-3.5 rounded-full inline-flex items-center gap-2 hover:bg-stone-100 transition-colors shadow-lg"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-[#25D366] text-lg" /> Request quote on WhatsApp
            </motion.button>
          </a>
          <div className="mt-4">
            <Link to="/products" className="text-amber-100 hover:text-white font-medium transition-colors text-sm">
              Or browse our tent inventory &rarr;
            </Link>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

