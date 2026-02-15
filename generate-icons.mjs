// 簡易的なアイコン生成スクリプト（SVGをPNGに変換）
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const createIconSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#3b82f6"/>
  <text x="50%" y="50%" font-size="${size * 0.5}" fill="white" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="bold">¥</text>
</svg>
`;

// SVGファイルとして保存
fs.writeFileSync(path.join(__dirname, 'public', 'icon-192.svg'), createIconSVG(192));
fs.writeFileSync(path.join(__dirname, 'public', 'icon-512.svg'), createIconSVG(512));

console.log('SVG icons generated. Converting to PNG with sharp...');

// sharpライブラリでPNGに変換
try {
  const sharp = (await import('sharp')).default;
  
  await sharp(Buffer.from(createIconSVG(192)))
    .png()
    .toFile(path.join(__dirname, 'public', 'icon-192.png'));
  console.log('icon-192.png created');
  
  await sharp(Buffer.from(createIconSVG(512)))
    .png()
    .toFile(path.join(__dirname, 'public', 'icon-512.png'));
  console.log('icon-512.png created');
} catch (e) {
  console.log('sharp not available, installing...');
  execSync('npm install sharp', { stdio: 'inherit' });
  console.log('Please run: node generate-icons.mjs again');
}
