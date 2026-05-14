import jwt from "jsonwebtoken";
import type { UserRole } from "./types.js";

function secret(): string {
  const s = process.env.JWT_SECRET;
  if (!s) throw new Error("JWT_SECRET is not set");
  return s;
}

export function signAccessToken(
  userId: string,
  email: string,
  role: UserRole
): string {
  return jwt.sign(
    { email, role },
    secret(),
    { subject: userId, expiresIn: "7d" }
  );
}

export function verifyAccessToken(token: string): {
  userId: string;
  email: string;
  role: UserRole;
} | null {
  try {
    const decoded = jwt.verify(token, secret()) as jwt.JwtPayload & {
      email?: string;
      role?: UserRole;
    };
    if (!decoded.sub || typeof decoded.sub !== "string") return null;
    const role = decoded.role;
    if (role !== "admin" && role !== "moderator" && role !== "user") return null;
    return {
      userId: decoded.sub,
      email: String(decoded.email ?? ""),
      role,
    };
  } catch {
    return null;
  }
}
