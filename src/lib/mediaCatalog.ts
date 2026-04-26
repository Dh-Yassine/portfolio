import fs from "node:fs";
import path from "node:path";
import type { MediaItem } from "@/content/site-content";

const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".gif",
  ".avif",
  ".svg",
]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov", ".m4v"]);

function toPublicUrl(folder: string, fileName: string) {
  return `/${encodeURIComponent(folder)}/${encodeURIComponent(fileName)}`;
}

/**
 * Loads every image/video from `public/{folder}`.
 * If folder does not exist or is empty, returns [].
 */
export function getMediaFromPublicFolder(folder?: string): MediaItem[] {
  if (!folder) return [];

  const absolute = path.join(process.cwd(), "public", folder);
  if (!fs.existsSync(absolute)) return [];

  const entries = fs
    .readdirSync(absolute, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));

  const media: MediaItem[] = [];
  for (const fileName of entries) {
    const ext = path.extname(fileName).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      media.push({ type: "image", src: toPublicUrl(folder, fileName) });
      continue;
    }
    if (VIDEO_EXTENSIONS.has(ext)) {
      media.push({ type: "video", src: toPublicUrl(folder, fileName) });
    }
  }
  return media;
}

export function resolveMedia(
  folder: string | undefined,
  fallback: MediaItem[],
): MediaItem[] {
  const fromFolder = getMediaFromPublicFolder(folder);
  return fromFolder.length > 0 ? fromFolder : fallback;
}

