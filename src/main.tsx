import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Register PWA Service Worker safely
if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./sw.js')
      .then((reg) => {
        if (import.meta.env.DEV) {
          console.log('Julia Tents service worker registered successfully:', reg.scope);
        }
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.warn('Service worker registration failed:', err);
        }
      });
  });
}


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

