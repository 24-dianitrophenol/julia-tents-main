import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Transparent vector logo mark
const svgLogo = `<svg viewBox="0 0 160 110" fill="none" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="amberGradient" x1="12" y1="12" x2="128" y2="82" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
  </defs>
  <path d="M62 18 C58 12, 50 12, 46 18 L12 68 C8 74, 13 82, 21 82 L38 82 C42 82, 46 79, 49 75 L62 54 C66 48, 74 48, 78 54 L91 75 C94 79, 98 82, 102 82 L119 82 C127 82, 132 74, 128 68 Z" fill="url(#amberGradient)" />
  <path d="M104 6 C100 1, 93 1, 89 6 L78 21 C75 25, 75 31, 79 35 L129 95 C132 99, 137 101, 142 101 L153 101 C159 101, 163 94, 159 88 Z" fill="#1C1917" />
  <path d="M136 94 L158 94 C162 94, 165 98, 163 102 L160 108 C158 111, 154 113, 150 113 L134 113 C129 113, 126 108, 128 103 Z" fill="#F59E0B" />
</svg>`;

// 2. Full app icon with white background and website logo
function getAppIconSvg() {
  return `<svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="112" fill="#FFFFFF" />
  <image href="logo.jpg" x="32" y="32" width="448" height="448" preserveAspectRatio="xMidYMid meet" />
</svg>`;
}

fs.writeFileSync(path.join(publicDir, 'logo.svg'), svgLogo.trim());
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), getAppIconSvg().trim());
fs.writeFileSync(path.join(publicDir, 'pwa-icon.svg'), getAppIconSvg().trim());
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.svg'), getAppIconSvg().trim());

// 3. PWA Manifest (PWABuilder and W3C compliant) with white theme_color
const manifest = {
  name: 'Julia Tents — Event & Camping Tents Uganda',
  short_name: 'Julia Tents',
  description: 'Quality tent manufacturing and event shelter rentals in Uganda with instant WhatsApp orders.',
  start_url: './#/',
  scope: './',
  id: './#/',
  display: 'standalone',
  display_override: ['window-controls-overlay', 'standalone', 'minimal-ui'],
  background_color: '#FFFFFF',
  theme_color: '#FFFFFF',
  orientation: 'any',
  lang: 'en',
  dir: 'ltr',
  prefer_related_applications: false,
  categories: ['shopping', 'business', 'lifestyle'],
  icons: [
    {
      src: 'logo.jpg',
      sizes: '192x192 512x512',
      type: 'image/jpeg',
      purpose: 'any'
    },
    {
      src: 'favicon.png',
      sizes: '64x64 32x32 24x24 16x16',
      type: 'image/png',
      purpose: 'any'
    },
    {
      src: 'pwa-icon.svg',
      sizes: '192x192 512x512',
      type: 'image/svg+xml',
      purpose: 'maskable'
    }
  ],
  shortcuts: [
    {
      name: 'Tent catalog',
      url: './#/products',
      description: 'Explore camping, wedding marquee, pagoda and gazebo tents'
    },
    {
      name: 'Rental inquiry cart',
      url: './#/checkout',
      description: 'Review selected tents and submit WhatsApp booking'
    },
    {
      name: 'Services & setup',
      url: './#/services',
      description: 'Custom fabrication, on-site pitch and branding'
    },
    {
      name: 'Contact team',
      url: './#/contact',
      description: 'Direct WhatsApp and phone contact'
    }
  ]
};

fs.writeFileSync(path.join(publicDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
fs.writeFileSync(path.join(publicDir, 'manifest.webmanifest'), JSON.stringify(manifest, null, 2));

// 4. Service Worker (Network-First strategy to ensure latest content always renders)
const swCode = `// Julia Tents Service Worker
const CACHE_NAME = 'juliatents-v1.0.2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // Network First for everything
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && request.url.startsWith(self.location.origin)) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (request.mode === 'navigate') {
            return caches.match('./index.html') || caches.match('./');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
  );
});
`;

fs.writeFileSync(path.join(publicDir, 'sw.js'), swCode.trim());
console.log('PWA assets, manifests, and Service Worker generated in public/ successfully!');
