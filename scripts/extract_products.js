import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const html = fs.readFileSync(path.join(__dirname, 'products_page.html'), 'utf-8');

// Let's write a regex or DOM extraction to see how products are structured
// Let's extract blocks around images or headings
const items = [];
const itemRegex = /<div class="[^"]*product-block[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi;
// Or let's inspect the HTML snippets around each storage/ image
const storageImages = [...html.matchAll(/(<div[^>]*class="[^"]*(?:product|gallery|item|col)[^"]*"[^>]*>[\s\S]*?<img[^>]+src="(https:\/\/idealtents\.com\/storage\/[^"]+)"[\s\S]*?<\/div>)/gi)];

console.log('Matches with storage:', storageImages.length);

// Let's print chunks around each storage/ image
const imgBlocks = [...html.matchAll(/<img[^>]+src="(https:\/\/idealtents\.com\/storage\/[^"]+)"[^>]*>/gi)];
for (const m of imgBlocks) {
  const idx = m.index;
  const snippet = html.slice(Math.max(0, idx - 300), Math.min(html.length, idx + 400));
  console.log('============================');
  console.log('IMG:', m[1]);
  console.log(snippet.replace(/\s+/g, ' '));
}
