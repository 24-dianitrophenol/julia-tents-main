import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { LogoMark } from '@/components/JuliaTentsLogo';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

interface NavigatorWithStandalone extends Navigator {
  standalone?: boolean;
}

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone mode (already installed)
    const nav = window.navigator as NavigatorWithStandalone;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || Boolean(nav.standalone);
    if (isStandalone) {
      setInstalled(true);
      return;
    }


    const dismissed = localStorage.getItem('jt_pwa_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed, 10) < 1000 * 60 * 60 * 24) {
      // Dismissed in the last 24h
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    window.addEventListener('appinstalled', () => {
      setInstalled(true);
      setIsVisible(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback alert for browsers without beforeinstallprompt (e.g. iOS Safari)
      alert('To install Julia Tents app on iOS, tap the Share button in Safari and select "Add to Home Screen".');
      return;
    }
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
      setIsVisible(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('jt_pwa_dismissed', Date.now().toString());
  };

  if (!isVisible || installed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        className="fixed top-20 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-stone-900/95 backdrop-blur-md text-white rounded-2xl p-4 shadow-2xl border border-stone-800"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-stone-800/80 border border-stone-700 flex items-center justify-center flex-shrink-0">
              <LogoMark className="w-8 h-8" isDarkBg={true} />
            </div>
            <div>
              <h4 className="font-display font-bold text-sm text-white leading-tight">
                Install Julia Tents app
              </h4>
              <p className="text-xs text-stone-300 mt-0.5 leading-snug">
                Fast offline access, quick orders & seamless tent browsing on your device.
              </p>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="text-stone-400 hover:text-white text-xs p-1 transition-colors"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="flex items-center gap-2 mt-3.5 pt-2 border-t border-stone-800">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-white font-semibold py-2 px-3.5 rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <FontAwesomeIcon icon={faDownload} /> Install on device
          </button>
          <button
            onClick={handleDismiss}
            className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-medium py-2 px-3 rounded-xl text-xs transition-colors"
          >
            Not now
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
