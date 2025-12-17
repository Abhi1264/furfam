import { NextRequest, NextResponse } from "next/server";
import { getSession, readUsers } from "@/lib/auth-utils";
import {
  getAllGalleryItems,
  addGalleryItem,
  saveImageFile,
} from "@/lib/gallery-storage";
import { randomBytes } from "crypto";

async function getCurrentUserFromRequest(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const users = await readUsers();
  return users[session.userId] || null;
}

// GET - Fetch all gallery items
export async function GET() {
  const items = await getAllGalleryItems();
  return NextResponse.json({ items });
}

// POST - Add a new gallery item (requires auth)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const type = formData.get("type") as string;
    const temperament =
      (formData.get("temperament") as string)
        ?.split(",")
        .map((t) => t.trim())
        .filter(Boolean) || [];
    const file = formData.get("image") as File;

    if (!name || !type || !file) {
      return NextResponse.json(
        { error: "Name, type, and image are required" },
        { status: 400 },
      );
    }

    // Save the image file
    const fileExtension = file.name.split(".").pop() || "jpg";
    const filename = `${Date.now()}_${randomBytes(8).toString("hex")}.${fileExtension}`;
    const imagePath = await saveImageFile(file, filename);

    // Add gallery item
    const item = await addGalleryItem({
      name,
      type,
      temperament: temperament.length > 0 ? temperament : ["Friendly"],
      image: imagePath,
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
