/**
 * Media pipeline for the Machin Solutions site.
 *
 * Reads the project manifest in src/data/media.json, pulls the ORIGINAL photos and
 * videos out of the Gallery folder (never modifying them), and writes SEO-named,
 * web-optimized derivatives into public/media/:
 *
 *   <slug>-<width>.avif / .webp / .jpg   responsive still images
 *   <slug>-poster.webp                   poster frame for each video
 *   <slug>.mp4                           re-muxed video with faststart
 *   manifest.json                        real pixel dimensions, for explicit width/height
 *
 * Usage: npm run media
 */
import { readFile, writeFile, mkdir, stat, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ffmpeg is not on PATH in every shell on this machine; fall back to the known install.
const FFMPEG_CANDIDATES = ['ffmpeg', 'D:\Installed programs\ffmpeg.exe'];

async function findFfmpeg() {
  for (const candidate of FFMPEG_CANDIDATES) {
    try {
      await execFileAsync(candidate, ['-version']);
      return candidate;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

const QUALITY = { avif: 55, webp: 76, jpg: 80 };

async function processImage(image, opts) {
  const { sourceDir, outDir, widths } = opts;
  const inputPath = path.join(sourceDir, image.src);
  if (!existsSync(inputPath)) {
    console.warn(`  ! missing source, skipped: ${image.src}`);
    return null;
  }

  const pipeline = sharp(inputPath, { failOn: 'none' }).rotate(); // honour EXIF orientation
  const meta = await pipeline.metadata();
  // Portrait photos are never displayed as wide as landscape ones, so cap them lower.
  // Never upscale, and never exceed the cap: a 3060px-wide original still tops out at
  // the largest useful width rather than shipping a 1.7 MB derivative nobody requests.
  const isPortrait = (image.orientation ?? (meta.width >= meta.height ? 'landscape' : 'portrait')) === 'portrait';
  const cap = Math.min(meta.width, isPortrait ? 1280 : Math.max(...widths));
  const targets = [...new Set([...widths.filter((w) => w < cap), cap])].sort((a, b) => a - b);
  const sizes = [];

  for (const width of targets) {
    const height = Math.round((meta.height / meta.width) * width);
    const resized = pipeline.clone().resize({ width, withoutEnlargement: true });
    await Promise.all([
      resized.clone().avif({ quality: QUALITY.avif, effort: 5 }).toFile(path.join(outDir, `${image.slug}-${width}.avif`)),
      resized.clone().webp({ quality: QUALITY.webp }).toFile(path.join(outDir, `${image.slug}-${width}.webp`)),
      resized.clone().jpeg({ quality: QUALITY.jpg, mozjpeg: true }).toFile(path.join(outDir, `${image.slug}-${width}.jpg`)),
    ]);
    sizes.push({ width, height });
  }

  console.log(`  + ${image.slug} (${meta.width}x${meta.height}) -> ${sizes.map((s) => s.width).join(', ')}`);
  return {
    slug: image.slug,
    alt: image.alt,
    width: meta.width,
    height: meta.height,
    aspect: +(meta.width / meta.height).toFixed(4),
    orientation: image.orientation ?? (meta.width >= meta.height ? 'landscape' : 'portrait'),
    hero: image.hero === true,
    sizes,
  };
}

async function processVideo(video, opts, ffmpeg) {
  const { sourceDir, outDir } = opts;
  const inputPath = path.join(sourceDir, video.src);
  if (!existsSync(inputPath)) {
    console.warn(`  ! missing source, skipped: ${video.src}`);
    return null;
  }
  if (!ffmpeg) {
    console.warn(`  ! ffmpeg unavailable, skipped: ${video.src}`);
    return null;
  }

  const posterRaw = path.join(outDir, `${video.slug}-poster-raw.png`);
  const posterOut = path.join(outDir, `${video.slug}-poster.webp`);
  const videoOut = path.join(outDir, `${video.slug}.mp4`);

  // Grab a representative frame past any lead-in shake. `posterAt` lets a clip pick
  // its own moment: a frame full of fine detail (falling water, foliage) can encode
  // several times larger than a calmer one from the same clip, and the poster is
  // fetched eagerly even with preload="none".
  const posterAt = String(video.posterAt ?? 2);
  await execFileAsync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-ss', posterAt, '-i', inputPath, '-frames:v', '1', '-y', posterRaw]);
  const poster = sharp(posterRaw);
  const posterMeta = await poster.metadata();
  await poster.webp({ quality: 55 }).toFile(posterOut);
  // The originals are WhatsApp re-encodes at ~1.6 Mbps; re-encoding at CRF 28 cuts the
  // download by roughly two thirds with no visible loss at this resolution.
  await execFileAsync(ffmpeg, [
    '-hide_banner', '-loglevel', 'error', '-i', inputPath,
    '-c:v', 'libx264', '-crf', '28', '-preset', 'slow', '-profile:v', 'main', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '96k',
    '-movflags', '+faststart', '-y', videoOut,
  ]);
  await rm(posterRaw, { force: true });

  const { size } = await stat(videoOut);
  // Probe duration from the container so VideoObject schema is accurate.
  let seconds = null;
  try {
    const { stderr } = await execFileAsync(ffmpeg, ['-hide_banner', '-i', videoOut]).catch((e) => e);
    const m = /Duration:\s*(\d+):(\d+):(\d+)\.(\d+)/.exec(stderr ?? '');
    if (m) seconds = Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3]) + Number(`0.${m[4]}`);
  } catch {
    /* duration is optional */
  }

  console.log(`  + ${video.slug} (${posterMeta.width}x${posterMeta.height}, ${(size / 1e6).toFixed(1)} MB)`);
  return {
    slug: video.slug,
    title: video.title,
    width: posterMeta.width,
    height: posterMeta.height,
    bytes: size,
    seconds,
  };
}

async function main() {
  const manifest = JSON.parse(await readFile(path.join(root, 'src/data/media.json'), 'utf8'));
  const sourceDir = path.resolve(root, manifest.sourceDir);
  const outDir = path.resolve(root, manifest.outDir);
  const opts = { sourceDir, outDir, widths: manifest.widths };

  if (!existsSync(sourceDir)) {
    console.error(`Gallery folder not found: ${sourceDir}`);
    console.error('Point "sourceDir" in src/data/media.json at the folder holding the original photos.');
    process.exit(1);
  }
  await mkdir(outDir, { recursive: true });

  const ffmpeg = await findFfmpeg();
  if (!ffmpeg) console.warn('ffmpeg not found — videos and posters will be skipped.');

  const out = { generatedAt: new Date().toISOString(), projects: [] };
  for (const project of manifest.projects) {
    console.log(`\n${project.title}`);
    const images = [];
    for (const image of project.images ?? []) {
      const result = await processImage(image, opts);
      if (result) images.push(result);
    }
    const videos = [];
    for (const video of project.videos ?? []) {
      const result = await processVideo(video, opts, ffmpeg);
      if (result) videos.push(result);
    }
    out.projects.push({
      id: project.id,
      title: project.title,
      category: project.category,
      summary: project.summary,
      features: project.features ?? [],
      images,
      videos,
    });
  }

  await writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(out, null, 2));
  const imageCount = out.projects.reduce((n, p) => n + p.images.length, 0);
  const videoCount = out.projects.reduce((n, p) => n + p.videos.length, 0);
  console.log(`\nDone: ${imageCount} images and ${videoCount} videos across ${out.projects.length} projects.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
