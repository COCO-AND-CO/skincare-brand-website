import sharp from 'sharp';
import fs from 'fs';

// A beautifully stylized C&C logo using the app's brand colors
// Background: Deep green (#2D4A3E), Text: Soft cream (#FBF9F4)
const svg = `
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#2D4A3E" rx="112"/>
  <text x="256" y="276" font-family="'Times New Roman', Times, serif" font-size="220" font-weight="bold" fill="#FBF9F4" text-anchor="middle" dominant-baseline="middle">C&amp;C</text>
</svg>
`;

async function main() {
  try {
    if (!fs.existsSync('./public')) fs.mkdirSync('./public');
    
    // 512x512 Splash / High-Res Manifest
    await sharp(Buffer.from(svg))
      .png()
      .toFile('./public/icon-512x512.png');
      
    // 192x192 Manifest
    await sharp(Buffer.from(svg))
      .resize(192, 192)
      .png()
      .toFile('./public/icon-192x192.png');

    // 180x180 Apple Touch Icon (Standard iOS size)
    await sharp(Buffer.from(svg))
      .resize(180, 180)
      .png()
      .toFile('./public/apple-icon.png');
      
    // 32x32 Favicon
    await sharp(Buffer.from(svg))
      .resize(32, 32)
      .png()
      .toFile('./public/favicon.ico');
      
    console.log('Successfully generated all brand icons!');
  } catch (err) {
    console.error('Failed to generate icons:', err);
  }
}

main();
