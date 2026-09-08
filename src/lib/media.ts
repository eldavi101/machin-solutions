/**
 * Typed access to the derivatives produced by `npm run media`.
 *
 * The generated manifest carries the real pixel dimensions of every file, which is what
 * lets every <img> and <video> ship explicit width/height and keep CLS at zero.
 */
import manifest from '../../public/media/manifest.json';

export interface MediaSize {
  width: number;
  height: number;
}

export interface MediaImage {
  slug: string;
  alt: string;
  width: number;
  height: number;
  aspect: number;
  orientation: 'landscape' | 'portrait';
  hero: boolean;
  sizes: MediaSize[];
}

export interface MediaVideo {
  slug: string;
  title: string;
  width: number;
  height: number;
  bytes: number;
  seconds: number | null;
}

export type ProjectCategory = 'pergolas' | 'tiki-huts' | 'outdoor-living';

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  features: string[];
  images: MediaImage[];
  videos: MediaVideo[];
}

export const projects = manifest.projects as unknown as Project[];

export const categoryLabels: Record<ProjectCategory, string> = {
  pergolas: 'Pergolas',
  'tiki-huts': 'Tiki Huts',
  'outdoor-living': 'Outdoor Living',
};

/** Every image on the site, flattened, in manifest order. */
export const allImages: Array<MediaImage & { project: Project }> = projects.flatMap((project) =>
  project.images.map((image) => ({ ...image, project })),
);

export const allVideos: Array<MediaVideo & { project: Project }> = projects.flatMap((project) =>
  project.videos.map((video) => ({ ...video, project })),
);

export function projectsIn(category: ProjectCategory): Project[] {
  return projects.filter((project) => project.category === category);
}

/** Find an image by slug; throws at build time rather than shipping a broken <img>. */
export function image(slug: string): MediaImage & { project: Project } {
  const found = allImages.find((item) => item.slug === slug);
  if (!found) {
    throw new Error(
      `Unknown image slug "${slug}". Add it to src/data/media.json and re-run "npm run media".`,
    );
  }
  return found;
}

export function video(slug: string): MediaVideo & { project: Project } {
  const found = allVideos.find((item) => item.slug === slug);
  if (!found) {
    throw new Error(
      `Unknown video slug "${slug}". Add it to src/data/media.json and re-run "npm run media".`,
    );
  }
  return found;
}

/** Build a srcset string for one of the generated formats. */
export function srcset(item: MediaImage, ext: 'avif' | 'webp' | 'jpg'): string {
  return item.sizes.map((size) => `/media/${item.slug}-${size.width}.${ext} ${size.width}w`).join(', ');
}

/** The widest generated derivative — used as the <img src> fallback. */
export function largest(item: MediaImage): MediaSize {
  return item.sizes[item.sizes.length - 1];
}

/** How many distinct projects and files the gallery actually holds. */
export const galleryStats = {
  projects: projects.length,
  images: allImages.length,
  videos: allVideos.length,
};
