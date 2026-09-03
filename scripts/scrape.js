import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const u = new URL(url);
          redirectUrl = u.origin + redirectUrl;
        }
        return resolve(fetchUrl(redirectUrl));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ statusCode: res.statusCode, data }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('Fetching https://idealtents.com/products ...');
  const res = await fetchUrl('https://idealtents.com/products');
  console.log('Status:', res.statusCode, 'Length:', res.data.length);
  fs.writeFileSync(path.join(__dirname, 'products_page.html'), res.data);

  console.log('Fetching https://idealtents.com/ ...');
  const homeRes = await fetchUrl('https://idealtents.com');
  fs.writeFileSync(path.join(__dirname, 'home_page.html'), homeRes.data);

  console.log('Fetching https://idealtents.com/services ...');
  const servRes = await fetchUrl('https://idealtents.com/services');
  fs.writeFileSync(path.join(__dirname, 'services_page.html'), servRes.data);
  
  console.log('Done downloading html files.');
}

run().catch(console.error);
