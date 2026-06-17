import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const filesToOptimize = [
  {
    src: 'src/assets/download.jpeg',
    dest: 'src/assets/download.webp',
    width: 800,
  },
  {
    src: 'src/assets/election_cover_placeholder_1772523633362.png',
    dest: 'src/assets/election_cover_placeholder_1772523633362.webp',
    width: 1200,
  },
  {
    src: 'src/assets/og-image.png',
    dest: 'src/assets/og-image.webp',
    width: 1200,
  },
  {
    src: 'public/assets/login_bg.png',
    dest: 'public/assets/login_bg.webp',
    width: 1920,
  }
];

async function main() {
  for (const file of filesToOptimize) {
    const srcPath = path.resolve(rootDir, file.src);
    const destPath = path.resolve(rootDir, file.dest);
    if (fs.existsSync(srcPath)) {
      console.log(`Optimizing ${file.src} -> ${file.dest}...`);
      await sharp(srcPath)
        .resize({ width: file.width, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toFile(destPath);
      console.log(`Saved optimized image to ${file.dest}`);
    } else {
      console.warn(`File not found: ${srcPath}`);
    }
  }
}

main().catch(err => {
  console.error('Error optimizing images:', err);
});
