import { NextRequest, NextResponse } from "next/server";
import { verifyUser, createSession, setAuthCookie } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await verifyUser(email, password);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const session = await createSession(user.id);
    await setAuthCookie(session.token);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    console.error("Login error:", errorMessage);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
