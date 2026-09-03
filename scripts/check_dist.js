import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the built JS bundle and check for syntax / runtime errors
const distDir = path.resolve(__dirname, '..', 'dist', 'assets');
const files = fs.readdirSync(distDir);
console.log('Dist assets:', files);

// Let's inspect index.html
const indexHtml = fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'index.html'), 'utf-8');
console.log('\n--- dist/index.html ---');
console.log(indexHtml);
