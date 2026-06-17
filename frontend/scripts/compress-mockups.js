import sharp from 'sharp';
import fs from 'fs';

const files = [
  {
    src: 'C:/Users/Bansal/.gemini/antigravity-ide/brain/b304142f-e3a5-4fdd-924e-c2f47e7d1f57/dashboard_mockup_1779965984878.png',
    dest: 'e:/Votify - Main - Copy/frontend/public/assets/dashboard_mockup.webp',
    width: 1200
  },
  {
    src: 'C:/Users/Bansal/.gemini/antigravity-ide/brain/b304142f-e3a5-4fdd-924e-c2f47e7d1f57/audit_mockup_1779966023025.png',
    dest: 'e:/Votify - Main - Copy/frontend/public/assets/audit_mockup.webp',
    width: 1200
  }
];

async function main() {
  for (const file of files) {
    if (fs.existsSync(file.src)) {
      console.log(`Compressing and converting ${file.src} -> ${file.dest}...`);
      await sharp(file.src)
        .resize({ width: file.width })
        .webp({ quality: 80 })
        .toFile(file.dest);
      console.log(`Saved WebP file to ${file.dest}`);
    } else {
      console.error(`Source file not found: ${file.src}`);
    }
  }
}

main().catch(console.error);
