import { NextRequest, NextResponse } from "next/server";
import { getSession, readUsers } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const session = await getSession(token);
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const users = await readUsers();
  const user = users[session.userId];

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
  });
}
