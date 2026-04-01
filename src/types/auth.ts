import type { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    info?: UserJwtPayload;
  }
}
export interface UserJwtPayload extends JwtPayload {
  id: string;
  type: "access" | "refresh";
}
