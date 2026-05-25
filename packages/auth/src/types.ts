import type { JwtPayload } from "jsonwebtoken";
export interface UserJwtPayload extends JwtPayload {
  id: string;
  type: "access" | "refresh";
}
