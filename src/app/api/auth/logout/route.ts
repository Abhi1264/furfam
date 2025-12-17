import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  // Clear cookie in response
  response.cookies.delete("auth-token");
  return response;
}
