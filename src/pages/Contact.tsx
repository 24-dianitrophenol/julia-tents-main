import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';
import PageHeader from '@/components/PageHeader';
import { WHATSAPP_NUMBER, DISPLAY_PHONE, BUSINESS_EMAIL, BUSINESS_LOCATION, BUSINESS_HOURS, getAssetUrl } from '@/lib/config';

export default function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleWhatsApp = () => {
    const lines = [
      `*Inquiry from Julia Tents website contact form*`,
      `*Name:* ${name || 'Customer'}`,
    ];

    if (phone) lines.push(`*Phone:* ${phone}`);
    lines.push(`*Message:* ${message || 'Hello, I would like to inquire about tent rental and manufacturing.'}`);
    const text = encodeURIComponent(lines.join('\n'));
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${text}`, '_blank');
  };

  const contactInfo = [
    { icon: faPhone, label: 'Phone call', value: DISPLAY_PHONE, href: `tel:${WHATSAPP_NUMBER}` },
    { icon: faWhatsapp, label: 'WhatsApp support', value: DISPLAY_PHONE, href: `https://wa.me/${WHATSAPP_NUMBER}` },
    { icon: faEnvelope, label: 'Email sales', value: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
    { icon: faLocationDot, label: 'Workshop & depot', value: BUSINESS_LOCATION, href: '#' },
    { icon: faClock, label: 'Working hours', value: BUSINESS_HOURS, href: '#' },
  ];

  return (
    <PageTransition>
      <PageHeader
        label="Customer support & consultations"
        title="Get in touch with our tent team"
        subtitle="Inquire about pricing, custom manufacturing, wedding bookings, and instant availability across Uganda."
        image={getAssetUrl('images/tents/function_pic_1.jpg')}
      />

      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-medium text-sm">Direct channels</span>
            <h2 className="font-display text-3xl font-bold text-stone-900 mt-1 mb-6">Contact information</h2>
            <div className="space-y-4">
              {contactInfo.map((info, i) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-4 bg-white rounded-3xl p-5 shadow-xs border border-stone-200/80 transition-all hover:shadow-md"
                >
                  <div className="text-amber-600 text-xl flex-shrink-0 w-8 text-center">
                    <FontAwesomeIcon icon={info.icon} />
                  </div>
                  <div>
                    <p className="text-xs text-stone-400 font-medium">{info.label}</p>
                    <p className="font-semibold text-stone-800 text-sm">{info.value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold px-6 py-4 rounded-3xl transition-all shadow-md shadow-green-600/20"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-xl" />
              Chat directly on WhatsApp ({DISPLAY_PHONE})
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-8"
          >
            <span className="text-amber-600 font-medium text-sm">Quick inquiry</span>
            <h2 className="font-display text-2xl font-bold text-stone-900 mt-1 mb-2">Send a message to our WhatsApp</h2>
            <p className="text-xs text-stone-500 mb-6">
              Enter your details below and we will automatically open a pre-filled chat on WhatsApp.
            </p>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Your name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sarah Namubiru"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Phone number (optional)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+256 700 000 000"
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1.5">Your inquiry message</label>
                <textarea
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Tell us the type of tent, event date, location, or any questions..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              <button
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/20 text-sm"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" /> Send message on WhatsApp
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}

