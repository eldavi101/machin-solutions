/**
 * Generates the brand and social-share assets that are derived from other files, so
 * they never drift: the Open Graph card is cropped from a real project photograph, and
 * the icons are rasterized from the same mark used in the site header.
 *
 * Usage: node scripts/make-brand-assets.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const media = path.join(root, 'public/media');
const ogDir = path.join(root, 'public/og');

const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#161a18"/>
  <g fill="none" stroke="#c98f56" stroke-width="2.2" stroke-linecap="square">
    <path d="M4 13 16 6l12 7"/>
    <path d="M7.5 14v12M16 14v12M24.5 14v12"/>
    <path d="M4 14h24"/>
  </g>
</svg>`;

const FAVICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#161a18"/>
  <g fill="none" stroke="#c98f56" stroke-width="2.6" stroke-linecap="square">
    <path d="M4 13 16 6l12 7"/>
    <path d="M7.5 14v12M16 14v12M24.5 14v12"/>
    <path d="M4 14h24"/>
  </g>
</svg>`;

/** 1200x630 share card: real photograph, darkened, with the wordmark set over it. */
async function buildOgCard() {
  const source = path.join(media, 'rain-curtain-pool-cabana-miami-01-1600.jpg');

  const base = await sharp(source)
    .resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' })
    .modulate({ brightness: 0.82 })
    .toBuffer();

  const overlay = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs>
      <linearGradient id="scrim" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#0d100f" stop-opacity="0.45"/>
        <stop offset="55%" stop-color="#0d100f" stop-opacity="0.62"/>
        <stop offset="100%" stop-color="#0d100f" stop-opacity="0.88"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="630" fill="url(#scrim)"/>
    <g transform="translate(72 404)">
      <text x="0" y="0" font-family="Georgia, 'Times New Roman', serif" font-size="66" font-weight="700" fill="#ffffff">Machin Solutions</text>
      <text x="0" y="52" font-family="Helvetica, Arial, sans-serif" font-size="29" fill="#e2dccf">Custom pergolas, tiki huts &amp; outdoor living</text>
      <text x="0" y="98" font-family="Helvetica, Arial, sans-serif" font-size="23" letter-spacing="3" fill="#c98f56">MIAMI &#183; SOUTH FLORIDA</text>
    </g>
    <rect x="72" y="72" width="66" height="5" fill="#c98f56"/>
  </svg>`);

  await sharp(base)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(ogDir, 'machin-solutions-og.jpg'));

  console.log('+ og/machin-solutions-og.jpg (1200x630)');
}

async function buildIcons() {
  const mark = Buffer.from(MARK);

  await sharp(mark, { density: 600 })
    .resize(512, 512)
    .png()
    .toFile(path.join(ogDir, 'machin-solutions-logo.png'));
  console.log('+ og/machin-solutions-logo.png (512x512)');

  for (const size of [180, 192, 512]) {
    const name = size === 180 ? 'apple-touch-icon.png' : `icon-${size}.png`;
    await sharp(mark, { density: 600 }).resize(size, size).png().toFile(path.join(root, 'public', name));
    console.log(`+ ${name} (${size}x${size})`);
  }

  await writeFile(path.join(root, 'public/favicon.svg'), FAVICON);
  console.log('+ favicon.svg');
}

await mkdir(ogDir, { recursive: true });
await buildOgCard();
await buildIcons();
