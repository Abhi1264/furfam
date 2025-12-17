import { promises as fs } from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";

const DATA_DIR = path.join(process.cwd(), "data");
const GALLERY_FILE = path.join(DATA_DIR, "gallery.json");

// Initialize Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface GalleryItem {
  id: string;
  name: string;
  image: string; // Cloudinary URL
  type: string;
  temperament: string[];
  createdAt: string;
  updatedAt: string;
}

async function ensureDirs() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

async function readGallery(): Promise<GalleryItem[]> {
  await ensureDirs();
  try {
    const data = await fs.readFile(GALLERY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeGallery(items: GalleryItem[]): Promise<void> {
  await ensureDirs();
  await fs.writeFile(GALLERY_FILE, JSON.stringify(items, null, 2));
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return await readGallery();
}

export async function addGalleryItem(
  item: Omit<GalleryItem, "id" | "createdAt" | "updatedAt">,
): Promise<GalleryItem> {
  const items = await readGallery();
  const id = `gallery_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  const newItem: GalleryItem = {
    id,
    ...item,
    createdAt: now,
    updatedAt: now,
  };

  items.push(newItem);
  await writeGallery(items);
  return newItem;
}

export async function deleteGalleryItem(id: string): Promise<boolean> {
  const items = await readGallery();
  const item = items.find((i) => i.id === id);

  if (!item) return false;

  // Delete the image from Cloudinary
  try {
    // Extract public_id from Cloudinary URL
    // URLs format: https://res.cloudinary.com/{cloud_name}/image/upload/{version}/{folder}/{public_id}.{ext}
    // or: https://res.cloudinary.com/{cloud_name}/image/upload/{folder}/{public_id}.{ext}
    const url = new URL(item.image);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const uploadIndex = pathParts.indexOf("upload");

    if (uploadIndex !== -1 && uploadIndex < pathParts.length - 1) {
      // Get everything after "upload"
      const afterUpload = pathParts.slice(uploadIndex + 1);

      // Skip version number if present (starts with "v" followed by digits)
      const startIndex = afterUpload[0]?.match(/^v\d+$/) ? 1 : 0;
      const publicIdParts = afterUpload.slice(startIndex);

      if (publicIdParts.length > 0) {
        // Join parts and remove file extension
        const publicId = publicIdParts.join("/").replace(/\.[^/.]+$/, "");
        await cloudinary.uploader.destroy(publicId);
      }
    }
  } catch {
    // Continue with deletion even if Cloudinary deletion fails
  }

  const filtered = items.filter((i) => i.id !== id);
  await writeGallery(filtered);
  return true;
}

export async function saveImageFile(
  file: File,
  filename: string,
): Promise<string> {
  // Convert File to buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Upload to Cloudinary
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "furfam/gallery",
        public_id: filename.replace(/\.[^/.]+$/, ""), // Remove extension for public_id
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else if (result) {
          resolve(result.secure_url);
        } else {
          reject(new Error("Upload failed: No result from Cloudinary"));
        }
      },
    );

    uploadStream.end(buffer);
  });
}
