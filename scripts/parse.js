import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.join(__dirname, 'products_page.html'), 'utf-8');

// Find all images
const imgMatches = [...html.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi)];
console.log(`Total <img> tags: ${imgMatches.length}`);
const imgSrcs = imgMatches.map(m => {
  const src = m[1];
  const alt = (m[0].match(/alt=["']([^"']*)["']/) || [])[1] || '';
  return { tag: m[0], src, alt };
});

console.log('Sample images:');
imgSrcs.forEach((img, i) => {
  console.log(`${i+1}: ${img.src} (alt: "${img.alt}")`);
});

// Let's search for product cards or sections
console.log('\n--- Section headers or headings ---');
const headings = [...html.matchAll(/<h[1-6][^>]*>(.*?)<\/h[1-6]>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim());
console.log('Headings:', headings);

// Let's search for links
const links = [...html.matchAll(/<a[^>]+href=["']([^"']+)["'][^>]*>(.*?)<\/a>/gis)]
  .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }))
  .filter(l => l.text.length > 0);
console.log('\nLinks count:', links.length);
console.log('Sample links:', links.slice(0, 30));
