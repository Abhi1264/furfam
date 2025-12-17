import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth-utils";
import {
  getAllGalleryItems,
  addGalleryItem,
  saveImageFile,
} from "@/lib/gallery-storage";
import { randomBytes } from "crypto";

// GET - Fetch all gallery items
export async function GET() {
  const items = await getAllGalleryItems();
  return NextResponse.json({ items });
}

// POST - Add a new gallery item (requires auth)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
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
  } catch (error) {
    console.error("Error adding gallery item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
