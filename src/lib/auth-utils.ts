import { createHash, randomBytes } from "crypto";
import { cookies } from "next/headers";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");
const SESSIONS_FILE = path.join(DATA_DIR, "sessions.json");

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory might already exist
  }
}

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
  await ensureDataDir();
  try {
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeUsers(users: Record<string, User>): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

async function readSessions(): Promise<Record<string, Session>> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(SESSIONS_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return {};
  }
}

async function writeSessions(sessions: Record<string, Session>): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(SESSIONS_FILE, JSON.stringify(sessions, null, 2));
}

export async function createUser(
  email: string,
  password: string,
): Promise<User> {
  const users = await readUsers();

  // Check if user exists
  for (const user of Object.values(users)) {
    if (user.email === email) {
      throw new Error("User already exists");
    }
  }

  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const user: User = {
    id,
    email,
    passwordHash: hashPassword(password),
    createdAt: new Date().toISOString(),
  };

  users[id] = user;
  await writeUsers(users);
  return user;
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

export async function deleteUser(userId: string): Promise<boolean> {
  const users = await readUsers();

  if (!users[userId]) {
    return false;
  }

  // Delete the user
  delete users[userId];
  await writeUsers(users);

  // Also delete all sessions for this user
  const sessions = await readSessions();
  for (const [sessionId, session] of Object.entries(sessions)) {
    if (session.userId === userId) {
      delete sessions[sessionId];
    }
  }
  await writeSessions(sessions);

  return true;
}
