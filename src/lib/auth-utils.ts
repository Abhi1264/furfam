import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

// JWT secret - should be in environment variable
const JWT_SECRET = process.env.JWT_SECRET || "change-this-secret-in-production";

export function hashPassword(password: string): string {
  // For generating password hashes (use bcrypt)
  // This is a synchronous wrapper - in real usage, we hash on user creation
  return bcrypt.hashSync(password, 10);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
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

export async function verifyUser(
  email: string,
  password: string,
): Promise<User | null> {
  const users = await readUsers();

  for (const user of Object.values(users)) {
    if (user.email === email) {
      const isValid = await verifyPassword(password, user.passwordHash);
      if (isValid) {
        return user;
      }
    }
  }

  return null;
}

export function createToken(userId: string): string {
  // Create JWT token (stateless, no storage needed)
  return jwt.sign(
    { userId, type: "auth" },
    JWT_SECRET,
    { expiresIn: "24h" }, // Token expires in 24 hours
  );
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; type: string };
    if (decoded.type === "auth" && decoded.userId) {
      return { userId: decoded.userId };
    }
    return null;
  } catch {
    return null;
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

  const tokenData = verifyToken(token);
  if (!tokenData) return null;

  const users = await readUsers();
  return users[tokenData.userId] || null;
}
