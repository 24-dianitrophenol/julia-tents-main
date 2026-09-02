import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { WHATSAPP_NUMBER, DISPLAY_PHONE } from '@/lib/config';
import { LogoMark } from '@/components/JuliaTentsLogo';


export default function FloatingWhatsApp() {
  const [open, setOpen] = useState(false);

  const quickTopics = [
    'I want to inquire about event & wedding marquee tents',
    'I need prices for camping & pop-up dome tents',
    'I need a custom 3x3m branded gazebo quote',
    'Is delivery and setup available for my location?',
  ];

  const handleSend = (text: string) => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-stone-200/90 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1.5 shadow-sm">
                  <LogoMark className="w-7 h-7" isDarkBg={false} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm leading-tight text-white">Julia Tents Uganda</h4>
                  <p className="text-[11px] text-white/90 flex items-center gap-1.5 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Online &bull; Replies in minutes
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center text-white text-xs transition-colors"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>


            {/* Body */}
            <div className="p-4 bg-stone-50 space-y-3 text-xs">
              <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-2xs border border-stone-100 text-stone-700 leading-relaxed">
                Hello! Welcome to JuliaTents. How can we help you plan your tent rental or custom order today?
              </div>

              <p className="text-[11px] font-semibold text-stone-500 pt-1">Quick inquiry topics:</p>
              <div className="space-y-1.5">
                {quickTopics.map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(topic)}
                    className="w-full text-left bg-white hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 p-2.5 rounded-xl border border-stone-200 transition-colors flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <span>{topic}</span>
                    <FontAwesomeIcon icon={faPaperPlane} className="text-stone-300 text-[10px] flex-shrink-0" />
                  </button>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => handleSend('Hello JuliaTents! I would like to make an inquiry.')}
                  className="w-full bg-[#25D366] hover:bg-[#1da851] text-white font-semibold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-xs shadow-xs"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-sm" /> Start direct WhatsApp chat
                </button>
                <p className="text-[10px] text-stone-400 text-center mt-2">
                  Official WhatsApp line: {DISPLAY_PHONE}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setOpen(!open)}
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1da851] text-white flex items-center justify-center text-3xl shadow-xl transition-colors relative"
      >
        <FontAwesomeIcon icon={open ? faXmark : faWhatsapp} className={open ? 'text-2xl' : ''} />
        {!open && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 rounded-full border-2 border-white" />
        )}
      </motion.button>
    </div>
  );
}
