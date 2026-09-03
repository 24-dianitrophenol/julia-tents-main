import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTruck, faScrewdriverWrench, faShieldHalved, faCakeCandles,
  faCamera, faUsers, faCircleCheck, faPhone, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { WHATSAPP_NUMBER, getAssetUrl } from '@/lib/config';

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
    { step: '01', title: 'Consultation & quote', desc: 'Tell us your event date, estimated guests, and location. We suggest suitable sizes and provide a competitive quote.' },
    { step: '02', title: 'Dispatch & transport', desc: 'Our logistics team transports clean, inspected tents and heavy-duty frame components to your venue on schedule.' },
    { step: '03', title: 'Assembly & anchoring', desc: 'Our trained rigging crew pitches the shelter, secures all guy ropes and footplates, and verifies waterproof sealing.' },
    { step: '04', title: 'Prompt takedown', desc: 'After your event concludes, our crew dismantles everything cleanly without disturbing your venue grounds.' },
  ];

  const quoteLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi JuliaTents! I would like to request a quote for your tent services.')}`;

  return (
    <PageTransition>
      <PageHeader
        label="Services & manufacturing"
        title="Full-service tent manufacturing & event hire"
        subtitle="Beyond rentals — we manufacture, brand, customize, and pitch. A single trusted partner for all your shelter requirements in Uganda."
        image={getAssetUrl('images/tents/two_peaked.jpg')}
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
                transition={{ delay: i * 0.08 }}
                className="p-8 rounded-3xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl mb-6">
                    <FontAwesomeIcon icon={service.icon} />
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-900 mb-2">{service.title}</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">{service.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-white border-t border-stone-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16 max-w-2xl mx-auto"
          >
            <span className="text-amber-600 font-medium text-sm">How we work</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-stone-900 mt-1">
              4 simple steps from quote to takedown
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl bg-stone-50 border border-stone-100"
              >
                <span className="font-display text-4xl font-bold text-amber-200 block mb-3">{p.step}</span>
                <h3 className="font-display text-lg font-bold text-stone-900 mb-2">{p.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom manufacturing callout */}
      <section className="py-20 bg-stone-900 text-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-400 font-medium text-sm">Made in Uganda</span>
            <h2 className="font-display text-3xl md:text-5xl font-bold mt-2 mb-6">
              Need custom tent sizes or permanent shade structures?
            </h2>
            <p className="text-stone-300 text-base max-w-2xl mx-auto mb-8 leading-relaxed">
              We fabricate church pavilions, disaster relief shelters, lodge safari canvas, and warehouse tents tailored to your specifications at our Kampala factory.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={quoteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all hover:scale-105"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" />
                Discuss custom manufacturing
              </a>
              <Link
                to="/products"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full inline-flex items-center gap-2 transition-all border border-white/20"
              >
                View tent stock <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
