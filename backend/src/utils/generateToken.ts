import jwt from "jsonwebtoken";

export function generateAccessToken(id: string) {
  return jwt.sign(
    {
      id,
      type: "access",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1d",
    },
  );
}

export function generateRefreshToken(id: string) {
  return jwt.sign(
    {
      id,
      type: "refresh",
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1m",
    },
  );
}
