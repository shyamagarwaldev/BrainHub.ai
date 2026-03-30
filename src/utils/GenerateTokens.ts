import { JsonWebTokenError } from "jsonwebtoken";
import type { User } from "../db/generated/prisma/client";
import ApiError, { ServerError } from "./ApiError";
import jwt from "jsonwebtoken";
import { prisma } from "../db/postgres";

export function generateAccessToken(id: string) {
  const accessToken = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: 60 * 60 * 24,
    },
  );
  if (!accessToken) {
    throw new ServerError("Unable to create access token");
  }
  return accessToken;
}

export function generateRefreshToken(id: string) {
  const refreshToken = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: 60 * 60 * 24 * 3,
    },
  );
  if (!refreshToken) {
    throw new ServerError("unable to create refresh token");
  }
  return refreshToken;
}
