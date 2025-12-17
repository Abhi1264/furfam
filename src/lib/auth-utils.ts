import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface Session {
  id: string;
  userId: string;
  expiresAt: number; // timestamp
  token: string;
}

export function hashPassword(password: string, salt?: string): string {
  const saltToUse = salt || randomBytes(16).toString("hex");
  const hash = createHash("sha256")
    .update(password + saltToUse)
    .digest("hex");
  return `${saltToUse}:${hash}`;
}

export function verifyPassword(password: string, hash: string): boolean {
  const [salt, hashPart] = hash.split(":");
  if (!salt || !hashPart) return false;
  const computedHash = hashPassword(password, salt);
  return computedHash === hash;
}

export async function readUsers(): Promise<Record<string, User>> {
  // Use environment variables for admin user
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD_HASH) {
    const adminUser: User = {
      id: "admin_env",
      email: process.env.ADMIN_EMAIL,
      passwordHash: process.env.ADMIN_PASSWORD_HASH,
      createdAt: new Date().toISOString(),
    };
    return { [adminUser.id]: adminUser };
  }

  return {};
}

async function readSessions(): Promise<Record<string, Session>> {
  // Sessions don't persist on serverless, but tokens are validated via cookie
  return {};
}

async function writeSessions(sessions: Record<string, Session>): Promise<void> {
  // Sessions are not persisted, tokens are validated via cookie only
}

export async function verifyUser(
  email: string,
  password: string,
): Promise<User | null> {
  const users = await readUsers();

  for (const user of Object.values(users)) {
    if (user.email === email && verifyPassword(password, user.passwordHash)) {
      return user;
    }
  }

  return null;
}

export async function createSession(userId: string): Promise<Session> {
  const sessions = await readSessions();
  const token = randomBytes(32).toString("hex");
  const id = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  const session: Session = {
    id,
    userId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    token,
  };

  sessions[id] = session;

  // Clean up expired sessions
  const now = Date.now();
  for (const [sessionId, sess] of Object.entries(sessions)) {
    if (sess.expiresAt < now) {
      delete sessions[sessionId];
    }
  }

  await writeSessions(sessions);
  return session;
}

export async function getSession(token: string): Promise<Session | null> {
  const sessions = await readSessions();

  for (const session of Object.values(sessions)) {
    if (session.token === token) {
      if (session.expiresAt < Date.now()) {
        // Session expired, delete it
        delete sessions[session.id];
        await writeSessions(sessions);
        return null;
      }
      return session;
    }
  }

  return null;
}

export async function deleteSession(token: string): Promise<void> {
  const sessions = await readSessions();

  for (const [id, session] of Object.entries(sessions)) {
    if (session.token === token) {
      delete sessions[id];
      await writeSessions(sessions);
      return;
    }
  }
}

export async function getCurrentUser(request?: {
  cookies: { get: (name: string) => { value: string } | undefined };
}): Promise<User | null> {
  let token: string | undefined;

  if (request) {
    // For API routes that pass request object
    token = request.cookies.get("auth-token")?.value;
  } else {
    // For server components
    const cookieStore = await cookies();
    token = cookieStore.get("auth-token")?.value;
  }

  if (!token) return null;

  const session = await getSession(token);
  if (!session) return null;

  const users = await readUsers();
  return users[session.userId] || null;
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("auth-token");
}
