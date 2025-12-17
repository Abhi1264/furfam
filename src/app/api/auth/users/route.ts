import { NextRequest, NextResponse } from "next/server";
import { getSession, readUsers, createUser } from "@/lib/auth-utils";

async function getCurrentUserFromRequest(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;
  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const users = await readUsers();
  return users[session.userId] || null;
}

// GET - List all users (requires auth)
export async function GET(request: NextRequest) {
  try {
    const currentUser = await getCurrentUserFromRequest(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const users = await readUsers();
    // Return users without password hashes
    const userList = Object.values(users).map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    }));

    return NextResponse.json({ users: userList });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Error fetching users:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// POST - Create a new user (requires auth)
export async function POST(request: NextRequest) {
  try {
    const currentUser = await getCurrentUserFromRequest(request);
    if (!currentUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 },
      );
    }

    const user = await createUser(email, password);

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Error creating user:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
