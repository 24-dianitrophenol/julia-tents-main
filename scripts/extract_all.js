import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.join(__dirname, 'products_page.html'), 'utf-8');

// Match project-block-two
const blocks = [...html.matchAll(/<div class="project-block-two masonry-item all\s+([^"]+)">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>/gi)];

console.log('Found project blocks:', blocks.length);

const products = [];
for (const b of blocks) {
  const catClasses = b[1].trim();
  const inner = b[2];
  const imgMatch = inner.match(/<img[^>]+src="([^"]+)"/i);
  const titleMatch = inner.match(/<h4>([^<]+)<\/h4>/i);
  const pMatch = inner.match(/<p[^>]*>([^<]+)<\/p>/i);
  const linkMatch = inner.match(/<a[^>]+href="([^"]+)"/i);

  products.push({
    categoryClass: catClasses,
    title: titleMatch ? titleMatch[1].trim() : '',
    subTitle: pMatch ? pMatch[1].trim() : '',
    img: imgMatch ? imgMatch[1] : '',
    link: linkMatch ? linkMatch[1] : ''
  });
}

console.log(JSON.stringify(products, null, 2));

// Check home page as well
const homeHtml = fs.readFileSync(path.join(__dirname, 'home_page.html'), 'utf-8');
const homeImgs = [...homeHtml.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(m => m[1]);
console.log('Home images:', [...new Set(homeImgs)]);

// Check services page as well
const servHtml = fs.readFileSync(path.join(__dirname, 'services_page.html'), 'utf-8');
const servImgs = [...servHtml.matchAll(/<img[^>]+src="([^"]+)"/gi)].map(m => m[1]);
console.log('Services images:', [...new Set(servImgs)]);
