import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser, deleteUser, readUsers } from "@/lib/auth-utils";

// DELETE - Delete a user (requires auth)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Prevent users from deleting themselves
    if (currentUser.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    // Check if it's the last user
    const users = await readUsers();
    if (Object.keys(users).length <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last remaining user" },
        { status: 400 },
      );
    }

    const success = await deleteUser(id);

    if (!success) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Error deleting user:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
