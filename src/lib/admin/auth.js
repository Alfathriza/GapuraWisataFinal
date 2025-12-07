// src/lib/admin/auth.js
// Authentication utilities untuk admin panel

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

const SESSION_COOKIE_NAME = "admin_session";
const SESSION_SECRET = process.env.SESSION_SECRET || "default-secret-change-in-production";

/**
 * Hash password menggunakan bcrypt
 */
export async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

/**
 * Verify password dengan hash
 */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

/**
 * Create session token (simple implementation)
 * In production, consider using JWT or proper session store
 */
export function createSessionToken(userId) {
  // Simple token: base64 encoded userId + timestamp
  const payload = `${userId}:${Date.now()}`;
  return Buffer.from(payload).toString("base64");
}

/**
 * Verify session token
 */
export function verifySessionToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [userId] = decoded.split(":");
    return userId;
  } catch {
    return null;
  }
}

/**
 * Create session cookie
 */
export async function createSession(userId) {
  const token = createSessionToken(userId);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
  });
  return token;
}

/**
 * Get current session
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  
  if (!token) {
    return null;
  }

  const userId = verifySessionToken(token);
  if (!userId) {
    return null;
  }

  // Verify user still exists
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });

  return user;
}

/**
 * Clear session (logout)
 */
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Require authentication middleware
 * Use in server components or API routes
 */
export async function requireAuth() {
  const session = await getSession();
  
  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}

/**
 * Login user dengan email dan password
 */
export async function loginUser(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  await createSession(user.id);
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role } };
}

