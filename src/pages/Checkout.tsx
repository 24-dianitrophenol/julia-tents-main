import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBagShopping, faTrash, faMinus, faPlus, faArrowRight, faCircleCheck,
  faCalendarDays, faLocationDot, faUser, faPhone, faEnvelope, faMessage, faSpinner,
} from '@fortawesome/free-solid-svg-icons';

import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import PageTransition from '@/components/PageTransition';
import { useCart } from '@/context/CartContext';
import { WHATSAPP_NUMBER, DISPLAY_PHONE } from '@/lib/config';
import { formatUGX } from '@/data/tents';

interface FormData {
  name: string;
  phone: string;
  email: string;
  eventDate: string;
  eventLocation: string;
  notes: string;
}

type CheckoutStage = 'cart' | 'details' | 'processing' | 'success';

export default function Checkout() {
  const { items, removeItem, updateItem, totalItems, totalPrice, clearCart } = useCart();
  const [stage, setStage] = useState<CheckoutStage>('cart');
  const [form, setForm] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    eventDate: '',
    eventLocation: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [orderRef, setOrderRef] = useState('');

  const validate = (): boolean => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Please provide your name';
    if (!form.phone.trim()) e.phone = 'Please provide your phone number';
    else if (!/^[+]?[\d\s()-]{7,}$/.test(form.phone)) e.phone = 'Please enter a valid phone number';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const buildWhatsAppMessage = (refId: string): string => {
    const lines: string[] = [];
    lines.push('🏕️ *New tent rental inquiry — Julia Tents Uganda*');

    lines.push(`*Reference:* ${refId || orderRef || 'JT-' + Date.now().toString().slice(-6)}`);
    lines.push('');
    lines.push('👤 *Customer details:*');
    lines.push(`• *Name:* ${form.name || 'Not provided'}`);
    lines.push(`• *WhatsApp:* ${form.phone || 'Not provided'}`);
    if (form.email) lines.push(`• *Email:* ${form.email}`);
    if (form.eventDate) lines.push(`• *Event date:* ${form.eventDate}`);
    if (form.eventLocation) lines.push(`• *Event location / venue:* ${form.eventLocation}`);
    lines.push('');
    lines.push('📦 *Itemized order details:*');
    items.forEach((item, i) => {
      const lineTotal = item.tent.pricePerDay * item.quantity * item.durationDays;
      lines.push(
        `${i + 1}. *${item.tent.name}* (${item.tent.size})`
      );
      lines.push(
        `   Qty: ${item.quantity} | Duration: ${item.durationDays} day(s) @ ${formatUGX(item.tent.pricePerDay)}/day = ${formatUGX(lineTotal)}`
      );
    });
    lines.push('');
    lines.push(`💰 *Grand total:* ${formatUGX(totalPrice)}`);
    lines.push('🚚 *Delivery & pitch:* Free on-site setup within Kampala & Wakiso');
    if (form.notes) {
      lines.push('');
      lines.push(`📝 *Special requests / notes:* ${form.notes}`);
    }
    lines.push('');
    lines.push('Please confirm tent availability and delivery schedule.');
    return encodeURIComponent(lines.join('\n'));
  };

  const handleProceedToDetails = () => {
    if (items.length === 0) return;
    setStage('details');
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setStage('processing');
    const newRef = 'JT-' + Date.now().toString().slice(-6);
    setOrderRef(newRef);

    setTimeout(() => {
      setStage('success');
      // Automatically open WhatsApp with order details
      const message = buildWhatsAppMessage(newRef);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }, 700);
  };

  const handleWhatsAppSend = () => {
    const message = buildWhatsAppMessage(orderRef);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  if (stage === 'success') {
    return (
      <PageTransition>
        <div className="pt-32 pb-20 min-h-screen bg-stone-50 flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center border border-stone-100"
          >
            <div className="text-5xl text-green-600 mb-4">
              <FontAwesomeIcon icon={faCircleCheck} />
            </div>
            <h1 className="font-display text-3xl font-bold text-stone-900">Inquiry submitted successfully!</h1>
            <p className="text-stone-600 mt-2 text-sm">
              Your inquiry reference number is <span className="font-bold text-stone-900 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-md">{orderRef}</span>
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-6 text-left">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm mb-1">
                <FontAwesomeIcon icon={faWhatsapp} className="text-base text-[#25D366]" />
                Finalize on WhatsApp
              </div>
              <p className="text-xs text-emerald-900 leading-relaxed">
                If the WhatsApp chat didn't open automatically, click the button below to send your complete order details directly to our team on <span className="font-semibold">{DISPLAY_PHONE}</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleWhatsAppSend}
                className="flex-1 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/20"
              >
                <FontAwesomeIcon icon={faWhatsapp} className="text-lg" /> Send order on WhatsApp
              </button>
              <Link to="/products" className="flex-1">
                <button className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-semibold py-3.5 px-5 rounded-2xl transition-colors">
                  Continue browsing
                </button>
              </Link>
            </div>

            <button
              onClick={() => {
                clearCart();
                setStage('cart');
                setForm({ name: '', phone: '', email: '', eventDate: '', eventLocation: '', notes: '' });
              }}
              className="mt-6 text-xs text-stone-400 hover:text-stone-600 transition-colors inline-block"
            >
              Start a new order
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  if (stage === 'processing') {
    return (
      <PageTransition>
        <div className="pt-32 pb-20 min-h-screen bg-stone-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <FontAwesomeIcon icon={faSpinner} spin className="text-amber-600 text-4xl mb-4" />
            <p className="text-stone-700 font-semibold text-base">Preparing your inquiry for WhatsApp...</p>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-28 pb-20 bg-stone-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          {/* Breadcrumb steps */}
          <div className="flex items-center gap-4 mb-8 mt-2">
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                stage === 'cart' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-600'
              }`}>1</div>
              <span className={`text-sm font-medium ${stage === 'cart' ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>Review cart</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-200 max-w-[50px]" />
            <div className="flex items-center gap-2">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                stage === 'details' ? 'bg-amber-600 text-white' : 'bg-stone-200 text-stone-600'
              }`}>2</div>
              <span className={`text-sm font-medium ${stage === 'details' ? 'text-stone-900 font-semibold' : 'text-stone-400'}`}>Event details</span>
            </div>
            <div className="flex-1 h-0.5 bg-stone-200 max-w-[50px]" />
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-stone-200 text-stone-600">3</div>
              <span className="text-sm font-medium text-stone-400">WhatsApp confirmation</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {stage === 'cart' && (
              <motion.div
                key="cart"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Your inquiry cart</h1>

                  {items.length === 0 ? (
                    <div className="bg-white rounded-3xl shadow-sm border border-stone-200 p-12 text-center">
                      <FontAwesomeIcon icon={faBagShopping} className="text-stone-300 text-5xl mb-4" />
                      <h2 className="font-display text-xl font-bold text-stone-700">Your inquiry cart is empty</h2>
                      <p className="text-stone-500 text-sm mt-2">Explore our collection of camping, event, and marquee tents to get started.</p>
                      <Link to="/products">
                        <button className="mt-6 bg-amber-600 hover:bg-amber-500 text-white font-semibold px-6 py-3 rounded-2xl transition-colors text-sm">
                          Browse tent catalog
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {items.map(item => (
                        <motion.div
                          key={item.tent.id}
                          layout
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -40 }}
                          className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
                        >
                          <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-stone-100">
                            <img src={item.tent.image} alt={item.tent.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="font-display text-base md:text-lg font-bold text-stone-900 leading-snug">{item.tent.name}</h3>
                            <p className="text-xs text-stone-500 mt-0.5">{formatUGX(item.tent.pricePerDay)} / day &bull; {item.tent.size} ({item.tent.capacity} persons)</p>

                            <div className="flex flex-wrap items-center gap-4 mt-3">
                              <div className="flex items-center gap-2 bg-stone-50 px-2.5 py-1 rounded-xl border border-stone-200">
                                <span className="text-xs text-stone-500">Qty:</span>
                                <button
                                  onClick={() => updateItem(item.tent.id, Math.max(1, item.quantity - 1), item.durationDays)}
                                  className="w-6 h-6 rounded-md bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors text-xs"
                                  aria-label="Decrease quantity"
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                                <button
                                  onClick={() => updateItem(item.tent.id, Math.min(20, item.quantity + 1), item.durationDays)}
                                  className="w-6 h-6 rounded-md bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors text-xs"
                                  aria-label="Increase quantity"
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 bg-stone-50 px-2.5 py-1 rounded-xl border border-stone-200">
                                <span className="text-xs text-stone-500">Days:</span>
                                <button
                                  onClick={() => updateItem(item.tent.id, item.quantity, Math.max(1, item.durationDays - 1))}
                                  className="w-6 h-6 rounded-md bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors text-xs"
                                  aria-label="Decrease days"
                                >
                                  <FontAwesomeIcon icon={faMinus} />
                                </button>
                                <span className="w-5 text-center text-xs font-bold">{item.durationDays}</span>
                                <button
                                  onClick={() => updateItem(item.tent.id, item.quantity, Math.min(60, item.durationDays + 1))}
                                  className="w-6 h-6 rounded-md bg-white hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-colors text-xs"
                                  aria-label="Increase days"
                                >
                                  <FontAwesomeIcon icon={faPlus} />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                            <span className="font-display text-base md:text-lg font-bold text-stone-900">
                              {formatUGX(item.tent.pricePerDay * item.quantity * item.durationDays)}
                            </span>
                            <button
                              onClick={() => removeItem(item.tent.id)}
                              className="text-stone-400 hover:text-red-500 transition-colors text-sm p-1"
                              aria-label="Remove item"
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Summary card */}
                <div>
                  <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6 sticky top-28">
                    <h2 className="font-display text-xl font-bold text-stone-900 mb-4">Summary of inquiry</h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between text-stone-600">
                        <span>Total items</span>
                        <span className="font-semibold">{totalItems}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Rental subtotal</span>
                        <span className="font-semibold">{formatUGX(totalPrice)}</span>
                      </div>
                      <div className="flex justify-between text-stone-600">
                        <span>Delivery & on-site pitch</span>
                        <span className="text-green-600 font-semibold">Free in Kampala</span>
                      </div>
                      <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                        <span className="font-semibold text-stone-900">Estimated total</span>
                        <span className="font-display text-2xl font-bold text-stone-900">{formatUGX(totalPrice)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleProceedToDetails}
                      disabled={items.length === 0}
                      className="w-full mt-6 bg-amber-600 hover:bg-amber-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-md shadow-amber-600/20 text-sm"
                    >
                      Enter event details <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                    <p className="text-xs text-stone-400 text-center mt-3">
                      Order will be sent directly to WhatsApp for fast confirmation.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {stage === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                <div className="lg:col-span-2">
                  <h1 className="font-display text-3xl font-bold text-stone-900 mb-6">Your event & contact details</h1>

                  <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6 md:p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field
                        icon={faUser}
                        label="Your full name"
                        value={form.name}
                        onChange={v => setForm({ ...form, name: v })}
                        error={errors.name}
                        placeholder="e.g. John Mukasa"
                      />
                      <Field
                        icon={faPhone}
                        label="WhatsApp phone number"
                        value={form.phone}
                        onChange={v => setForm({ ...form, phone: v })}
                        error={errors.phone}
                        placeholder="+256 700 000 000"
                      />
                    </div>

                    <Field
                      icon={faEnvelope}
                      label="Email address (optional)"
                      value={form.email}
                      onChange={v => setForm({ ...form, email: v })}
                      placeholder="e.g. john@gmail.com"
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <Field
                        icon={faCalendarDays}
                        label="Date of your event"
                        value={form.eventDate}
                        onChange={v => setForm({ ...form, eventDate: v })}
                        type="date"
                      />
                      <Field
                        icon={faLocationDot}
                        label="Event location / venue"
                        value={form.eventLocation}
                        onChange={v => setForm({ ...form, eventLocation: v })}
                        placeholder="e.g. Munyonyo, Kampala"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-stone-700 block mb-1.5">Special instructions / notes</label>
                      <div className="relative">
                        <FontAwesomeIcon icon={faMessage} className="absolute left-3.5 top-3.5 text-stone-400 text-sm" />
                        <textarea
                          value={form.notes}
                          onChange={e => setForm({ ...form, notes: e.target.value })}
                          placeholder="Tell us about the setup grounds (grass/paved), extra chairs or tables needed, branding colors..."
                          rows={3}
                          className="w-full pl-9 pr-4 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-sm focus:outline-none focus:border-amber-500 transition-colors resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={() => setStage('cart')}
                      className="px-5 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium transition-colors text-sm"
                    >
                      &larr; Back to cart
                    </button>
                  </div>
                </div>

                {/* Summary & Submit */}
                <div>
                  <div className="bg-white rounded-3xl shadow-sm border border-stone-200/80 p-6 sticky top-28">
                    <h2 className="font-display text-xl font-bold text-stone-900 mb-4">Inquiry breakdown</h2>
                    <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-hide mb-4 divide-y divide-stone-100">
                      {items.map(item => (
                        <div key={item.tent.id} className="pt-2 first:pt-0 flex justify-between text-xs">
                          <span className="text-stone-700 font-medium truncate pr-2">
                            {item.tent.name}
                            <span className="text-stone-400 block font-normal">{item.quantity} unit(s) &bull; {item.durationDays} day(s)</span>
                          </span>
                          <span className="font-bold text-stone-900 whitespace-nowrap">
                            {formatUGX(item.tent.pricePerDay * item.quantity * item.durationDays)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-stone-100 pt-3 flex justify-between items-baseline">
                      <span className="font-semibold text-stone-900">Total</span>
                      <span className="font-display text-2xl font-bold text-stone-900">{formatUGX(totalPrice)}</span>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full mt-6 bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-md shadow-green-600/20 text-sm"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} className="text-lg" /> Send order on WhatsApp
                    </button>
                    <p className="text-[11px] text-stone-400 text-center mt-3">
                      We'll open WhatsApp immediately with your pre-filled inquiry.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}

interface FieldProps {
  icon: IconDefinition;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}

function Field({ icon, label, value, onChange, error, placeholder, type = 'text' }: FieldProps) {
  return (
    <div>
      <label className="text-xs font-semibold text-stone-700 block mb-1.5">{label}</label>
      <div className="relative">
        <FontAwesomeIcon icon={icon} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-sm" />
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full pl-9 pr-4 py-3 rounded-2xl bg-stone-50 border text-sm focus:outline-none transition-colors ${
            error ? 'border-red-400 focus:border-red-500' : 'border-stone-200 focus:border-amber-500'
          }`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

