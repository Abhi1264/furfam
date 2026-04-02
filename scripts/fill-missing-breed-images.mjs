import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src/lib/breeds-data.ts");
const PUBLIC_DIR = path.join(ROOT, "public");

const text = await fs.readFile(DATA_FILE, "utf8");
const matches = [...text.matchAll(/image:\s*"([^"\n]+)"/g)].map((m) => m[1]);

const uniqueRefs = [...new Set(matches)].filter((p) => p.startsWith("/"));
const missing = [];
const MIN_EXISTING_FILE_BYTES = 1024;

for (const ref of uniqueRefs) {
  const outPath = path.join(PUBLIC_DIR, ref.slice(1));
  try {
    const st = await fs.stat(outPath);
    if (st.size < MIN_EXISTING_FILE_BYTES) {
      // Corrupted/partial downloads can leave a tiny file behind; treat it as missing.
      await fs.unlink(outPath).catch(() => {});
      missing.push(ref);
    }
  } catch {
    missing.push(ref);
  }
}

console.log(`Missing: ${missing.length}`);

const aliases = {
  "anjing-kintamani-bali": ["Kintamani dog", "Bali Dog"],
  "bayerischer-gebirgsschweisshund": ["Bavarian Mountain Hound"],
  "anglo-francais-de-petite-venerie": [
    "Anglo-Fran\u00e7ais de Petite V\u00e9nerie",
  ],
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function shouldRetry(error) {
  if (!error) return false;

  if (typeof error.status === "number") {
    return error.status === 429 || error.status >= 500;
  }

  const retryableCodes = new Set([
    "ENOTFOUND",
    "EAI_AGAIN",
    "EADDRNOTAVAIL",
    "ECONNRESET",
    "ETIMEDOUT",
    "UND_ERR_CONNECT_TIMEOUT",
    "UND_ERR_SOCKET",
  ]);

  if (typeof error.code === "string" && retryableCodes.has(error.code)) {
    return true;
  }

  if (error.name === "AbortError") {
    return true;
  }

  if (typeof error.message === "string") {
    return /fetch failed|network|timeout|socket|aborted/i.test(error.message);
  }

  return false;
}

async function withRetry(
  taskName,
  fn,
  { maxAttempts = 4, baseDelayMs = 500 } = {},
) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const computedDelay =
        typeof error.retryAfterMs === "number" && error.retryAfterMs > 0
          ? error.retryAfterMs
          : baseDelayMs * 2 ** (attempt - 1);
      console.warn(
        `[retry] ${taskName} failed (${attempt}/${maxAttempts}): ${error.message}. Retrying in ${computedDelay}ms...`,
      );
      await sleep(computedDelay);
    }
  }

  throw lastError;
}

function toExactCandidateTitles(slug) {
  const baseSlug = slug.replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase();
  const spaced = baseSlug.replace(/-/g, " ");
  const title = spaced.replace(/\b\w/g, (c) => c.toUpperCase());

  // Aliases map uses the "slug-y" keys (hyphens), not the spaced version.
  const aliasTitles = aliases[baseSlug] || [];
  return [...new Set([title, `${title} dog`, ...aliasTitles])];
}

function toSearchQueries(slug) {
  const baseSlug = slug.replace(/\.(jpg|jpeg|png|webp)$/i, "").toLowerCase();
  const spaced = baseSlug.replace(/-/g, " ");
  const spacedTitle = spaced.replace(/\b\w/g, (c) => c.toUpperCase());
  const upper = baseSlug.toUpperCase();

  // Queries aim for Wikipedia search (fuzzy), not exact titles.
  return [...new Set([baseSlug, spaced, `${spaced} dog`, spacedTitle, `${spacedTitle} dog`, upper])];
}

async function fetchSummary(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  const res = await withRetry(
    `fetchSummary(${title})`,
    async () => {
      const response = await fetch(url, {
        headers: { "User-Agent": "furfam-image-fetcher/1.0" },
      });

      if (!response.ok) {
        const error = new Error(`Summary request failed: ${response.status}`);
        error.status = response.status;
        if (response.status === 429) {
          const retryAfter = response.headers.get("retry-after");
          const asSeconds = retryAfter ? Number(retryAfter) : NaN;
          if (Number.isFinite(asSeconds)) {
            error.retryAfterMs = asSeconds * 1000;
          }
        }
        throw error;
      }

      return response;
    },
    { maxAttempts: 4, baseDelayMs: 400 },
  ).catch((error) => {
    if (
      typeof error.status === "number" &&
      error.status < 500 &&
      error.status !== 429
    ) {
      return null;
    }
    if (typeof error.status === "number" && error.status === 429) {
      // If we're still rate-limited after retries, treat this title as a miss
      // rather than crashing the entire run.
      console.warn(
        `[warn] fetchSummary rate-limited for "${title}" (429); skipping for now.`,
      );
      return null;
    }
    throw error;
  });

  if (!res) return null;
  return res.json();
}

async function searchWikipedia(query, { limit = 5 } = {}) {
  // Using the MediaWiki API search endpoint (fuzzy) so we can resolve
  // transliterations / abbreviations / capitalization differences.
  const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&utf8=1&origin=*&srlimit=${limit}&namespace=0`;
  const res = await withRetry(
    `searchWikipedia(${query})`,
    async () => {
      const response = await fetch(url, {
        headers: { "User-Agent": "furfam-image-fetcher/1.0" },
      });

      if (!response.ok) {
        const error = new Error(`Search request failed: ${response.status}`);
        error.status = response.status;
        throw error;
      }

      return response;
    },
    { maxAttempts: 3, baseDelayMs: 400 },
  ).catch((error) => {
    // For common client-side errors (e.g. 429/5xx are retried above), return empty.
    console.warn(`[warn] searchWikipedia failed for "${query}": ${error.message}`);
    return null;
  });

  if (!res) return [];
  const json = await res.json();
  const results = json?.query?.search;
  if (!Array.isArray(results)) return [];
  return results.map((r) => r.title).filter(Boolean).slice(0, limit);
}

function getExpectedContentTypeByExtension(outPath) {
  const ext = path.extname(outPath).toLowerCase();
  if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
  if (ext === ".png") return "image/png";
  if (ext === ".webp") return "image/webp";
  return null;
}

function getExpectedUrlExt(url) {
  try {
    const u = new URL(url);
    return path.extname(u.pathname).toLowerCase();
  } catch {
    return "";
  }
}

function pickBestImageUrl(summary, expectedOutPath) {
  const expectedContentType = getExpectedContentTypeByExtension(expectedOutPath);
  const expectedOutExt = path.extname(expectedOutPath).toLowerCase();

  const urls = [
    summary?.thumbnail?.source,
    // Some pages provide a hi-res original image instead of (or in addition to)
    // a small thumbnail.
    summary?.originalimage?.source,
    summary?.thumbnail?.original?.source,
  ].filter(Boolean);

  if (urls.length === 0) return null;

  // Prefer URLs that already match the expected extension (most likely to serve correctly).
  const matchingExt = urls.find((u) => getExpectedUrlExt(u) === expectedOutExt);
  if (matchingExt) return matchingExt;

  // Otherwise return the first one; download() will still validate content-type.
  return urls[0];
}

async function download(url, outPath) {
  const expectedContentType = getExpectedContentTypeByExtension(outPath);
  const minBytes = 6 * 1024; // avoid saving HTML/error pages or tiny corrupted responses

  const res = await withRetry(
    `download(${path.basename(outPath)})`,
    async () => {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 30000);

      try {
        const response = await fetch(url, {
          headers: { "User-Agent": "furfam-image-fetcher/1.0" },
          signal: controller.signal,
        });

        if (!response.ok) {
          const error = new Error(`Download failed: ${response.status}`);
          error.status = response.status;
          if (response.status === 429) {
            const retryAfter = response.headers.get("retry-after");
            // `Retry-After` can be seconds or a HTTP-date. We only parse seconds here.
            const asSeconds = retryAfter ? Number(retryAfter) : NaN;
            if (Number.isFinite(asSeconds)) {
              error.retryAfterMs = asSeconds * 1000;
            }
          }
          throw error;
        }

        // Block non-images, but allow image types that don't match the expected extension
        // (e.g. a GIF served for a ".jpg" path).
        const ct = (response.headers.get("content-type") || "").toLowerCase();
        if (ct && !ct.startsWith("image/")) {
          const error = new Error(`Non-image content-type: ${ct || "unknown"}`);
          error.status = 415;
          throw error;
        }
        if (expectedContentType && ct && !ct.startsWith(expectedContentType)) {
          console.warn(
            `[warn] Content-type differs from expected (${expectedContentType} vs ${ct}); saving anyway.`,
          );
        }

        const buf = Buffer.from(await response.arrayBuffer());
        if (buf.byteLength < minBytes) {
          const error = new Error(
            `Downloaded content too small (${buf.byteLength} bytes)`,
          );
          error.status = 422;
          throw error;
        }

        return buf;
      } finally {
        clearTimeout(timeout);
      }
    },
    { maxAttempts: 4, baseDelayMs: 500 },
  );

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, res);
}

const failed = [];
const failedDetails = [];
let downloaded = 0;

// Caches to reduce repeated Wikipedia calls during a single run.
const summaryCache = new Map();
const searchCache = new Map();

const getSummary = async (title) => {
  if (summaryCache.has(title)) return summaryCache.get(title);
  const s = await fetchSummary(title);
  summaryCache.set(title, s);
  return s;
};

const getSearchResults = async (query) => {
  if (searchCache.has(query)) return searchCache.get(query);
  const titles = await searchWikipedia(query);
  searchCache.set(query, titles);
  return titles;
};

try {
  for (const ref of missing) {
    const filename = ref.slice(1);
    const slug = path.basename(filename);
    const exactTitles = toExactCandidateTitles(slug);
    const searchQueries = toSearchQueries(slug);

    let imageUrl = null;

    // 1) Try exact-ish titles first (fast path).
    for (const title of exactTitles) {
      const summary = await getSummary(title);
      const url = pickBestImageUrl(summary, path.join(PUBLIC_DIR, filename));
      if (url) {
        imageUrl = url;
        break;
      }
    }

    try {
      // 2) If exact titles didn't work, do fuzzy search (robust path).
      if (!imageUrl) {
        for (const q of searchQueries) {
          const candidateTitles = await getSearchResults(q);
          for (const t of candidateTitles) {
            const summary = await getSummary(t);
            const url = pickBestImageUrl(
              summary,
              path.join(PUBLIC_DIR, filename),
            );
            if (url) {
              imageUrl = url;
              break;
            }
          }
          if (imageUrl) break;
        }
      }

      if (!imageUrl) {
        failed.push(ref);
        failedDetails.push({ ref, reason: "no_wikipedia_image" });
        continue;
      }

      await download(imageUrl, path.join(PUBLIC_DIR, filename));
      downloaded++;
      console.log(`Downloaded: ${ref}`);
    } catch (error) {
      console.warn(`[warn] Failed to download ${ref}: ${error.message}`);
      failed.push(ref);
      failedDetails.push({ ref, reason: error?.message || "download_failed" });
    }

    await sleep(250);
  }
} finally {
  console.log(`Downloaded ${downloaded}, failed ${failed.length}`);
  await fs.writeFile(
    path.join(ROOT, "missing-images-failed.json"),
    JSON.stringify(failed, null, 2),
  );

  await fs.writeFile(
    path.join(ROOT, "missing-images-failed-details.json"),
    JSON.stringify(failedDetails, null, 2),
  );
}
