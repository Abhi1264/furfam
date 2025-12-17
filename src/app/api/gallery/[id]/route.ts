import { NextRequest, NextResponse } from "next/server";
import { getSession, readUsers } from "@/lib/auth-utils";
import { deleteGalleryItem } from "@/lib/gallery-storage";

async function getCurrentUserFromRequest(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const users = await readUsers();
  return users[session.userId] || null;
}

// DELETE - Delete a gallery item (requires auth)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const user = await getCurrentUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const success = await deleteGalleryItem(id);

    if (!success) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
