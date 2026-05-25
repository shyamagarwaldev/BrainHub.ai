import jwt from "jsonwebtoken";
import type { UserJwtPayload } from "../types";
export function verifyToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as UserJwtPayload;
}
