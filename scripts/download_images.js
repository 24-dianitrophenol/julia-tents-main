import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const outDir = path.join(rootDir, 'public', 'images', 'tents');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function downloadImage(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        return resolve(downloadImage(redirectUrl, destPath));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: status ${res.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve(destPath);
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function run() {
  const productsHtml = fs.readFileSync(path.join(__dirname, 'products_page.html'), 'utf-8');
  const homeHtml = fs.readFileSync(path.join(__dirname, 'home_page.html'), 'utf-8');
  const servHtml = fs.readFileSync(path.join(__dirname, 'services_page.html'), 'utf-8');

  const allHtml = productsHtml + '\n' + homeHtml + '\n' + servHtml;
  const imgMatches = [...allHtml.matchAll(/https:\/\/idealtents\.com\/(?:storage\/\d+\/[a-zA-Z0-9_\-\.]+|images\/gallery\/[a-zA-Z0-9_\-\.]+)/gi)];
  const urls = [...new Set(imgMatches.map(m => m[0]))];

  console.log(`Found ${urls.length} unique image URLs to download.`);

  for (const u of urls) {
    const filename = path.basename(u);
    const dest = path.join(outDir, filename);
    console.log(`Downloading ${u} -> ${filename}...`);
    try {
      await downloadImage(u, dest);
      console.log(`Saved ${filename}`);
    } catch (err) {
      console.error(`Error downloading ${u}:`, err.message);
    }
  }

  console.log('All downloads completed!');
}

run().catch(console.error);
