import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tentsPath = path.resolve(__dirname, '..', 'src', 'data', 'tents.ts');
let content = fs.readFileSync(tentsPath, 'utf-8');

if (!content.includes("import { getAssetUrl } from '@/lib/config';")) {
  content = "import { getAssetUrl } from '@/lib/config';\n\n" + content;
}

content = content.replace(/'\/images\/tents\/([^']+)'/g, "getAssetUrl('images/tents/$1')");
fs.writeFileSync(tentsPath, content);
console.log('Successfully updated src/data/tents.ts');

// Also update HomeSlider.tsx, Home.tsx, Products.tsx, About.tsx, Services.tsx, Contact.tsx
const filesToUpdate = [
  'src/components/HomeSlider.tsx',
  'src/pages/Home.tsx',
  'src/pages/Products.tsx',
  'src/pages/About.tsx',
  'src/pages/Services.tsx',
  'src/pages/Contact.tsx'
];

for (const rel of filesToUpdate) {
  const filePath = path.resolve(__dirname, '..', rel);
  if (!fs.existsSync(filePath)) continue;
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  if (fileContent.includes("'/images/tents/")) {
    if (!fileContent.includes('getAssetUrl')) {
      fileContent = "import { getAssetUrl } from '@/lib/config';\n" + fileContent;
    }
    fileContent = fileContent.replace(/'\/images\/tents\/([^']+)'/g, "getAssetUrl('images/tents/$1')");
    fileContent = fileContent.replace(/"\/images\/tents\/([^"]+)"/g, "{getAssetUrl('images/tents/$1')}");
    fs.writeFileSync(filePath, fileContent);
    console.log(`Updated ${rel}`);
  }
}
