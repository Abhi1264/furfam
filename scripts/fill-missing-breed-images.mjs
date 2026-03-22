import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const DATA_FILE = path.join(ROOT, "src/lib/breeds-data.ts");
const PUBLIC_DIR = path.join(ROOT, "public");

const text = await fs.readFile(DATA_FILE, "utf8");
const matches = [...text.matchAll(/image:\s*"([^"\n]+)"/g)].map((m) => m[1]);

const uniqueRefs = [...new Set(matches)].filter((p) => p.startsWith("/"));
const missing = [];

for (const ref of uniqueRefs) {
  const outPath = path.join(PUBLIC_DIR, ref.slice(1));
  try {
    await fs.access(outPath);
  } catch {
    missing.push(ref);
  }
}

console.log(`Missing: ${missing.length}`);

const aliases = {
  "anjing-kintamani-bali": ["Kintamani dog", "Bali Dog"],
  "bayerischer-gebirgsschweisshund": ["Bavarian Mountain Hound"],
  "anglo-francais-de-petite-venerie": ["Anglo-Fran\u00e7ais de Petite V\u00e9nerie"],
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

  if (typeof error.message === "string") {
    return /fetch failed|network|timeout|socket/i.test(error.message);
  }

  return false;
}

async function withRetry(taskName, fn, { maxAttempts = 4, baseDelayMs = 500 } = {}) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (attempt === maxAttempts || !shouldRetry(error)) {
        throw error;
      }

      const delay = baseDelayMs * 2 ** (attempt - 1);
      console.warn(
        `[retry] ${taskName} failed (${attempt}/${maxAttempts}): ${error.message}. Retrying in ${delay}ms...`,
      );
      await sleep(delay);
    }
  }

  throw lastError;
}

function toCandidates(slug) {
  const base = slug.replace(/-/g, " ").replace(/\.(jpg|jpeg|png|webp)$/i, "");
  const title = base.replace(/\b\w/g, (c) => c.toUpperCase());
  return [...new Set([title, `${title} dog`, ...(aliases[base] || [])])];
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
        throw error;
      }

      return response;
    },
    { maxAttempts: 4, baseDelayMs: 400 },
  ).catch((error) => {
    if (typeof error.status === "number" && error.status < 500 && error.status !== 429) {
      return null;
    }
    throw error;
  });

  if (!res) return null;
  return res.json();
}

async function download(url, outPath) {
  const res = await withRetry(
    `download(${path.basename(outPath)})`,
    async () => {
      const response = await fetch(url);
      if (!response.ok) {
        const error = new Error(`Download failed: ${response.status}`);
        error.status = response.status;
        throw error;
      }
      return response;
    },
    { maxAttempts: 4, baseDelayMs: 500 },
  );

  const buf = Buffer.from(await res.arrayBuffer());
  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, buf);
}

const failed = [];
let downloaded = 0;

for (const ref of missing) {
  const filename = ref.slice(1);
  const slug = path.basename(filename);
  const candidates = toCandidates(slug);

  let imageUrl = null;

  for (const c of candidates) {
    let summary = null;
    try {
      summary = await fetchSummary(c);
    } catch (error) {
      console.warn(`[warn] Could not fetch summary for "${c}": ${error.message}`);
      continue;
    }
    const thumb = summary?.thumbnail?.source;
    if (thumb) {
      imageUrl = thumb;
      break;
    }
  }

  if (!imageUrl) {
    failed.push(ref);
    continue;
  }

  try {
    await download(imageUrl, path.join(PUBLIC_DIR, filename));
    downloaded++;
    console.log(`Downloaded: ${ref}`);
  } catch (error) {
    console.warn(`[warn] Failed to download ${ref}: ${error.message}`);
    failed.push(ref);
  }

  await sleep(250);
}

console.log(`Downloaded ${downloaded}, failed ${failed.length}`);
await fs.writeFile(
  path.join(ROOT, "missing-images-failed.json"),
  JSON.stringify(failed, null, 2),
);
