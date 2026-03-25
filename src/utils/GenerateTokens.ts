import type { User } from "../db/generated/prisma/client";
import ApiError from "./ApiError";

export function generateAccessToken(user: User) {
  const accessToken = undefined;
  if (!accessToken) {
    throw new ApiError({
      statusCode: 500,
      message: "Unable to Create the Access Token",
    });
  }
  return accessToken;
}

export async function generateRefreshToken(user: User) {
  const refreshToken = undefined;
  if (!refreshToken) {
    throw new ApiError({
      message: "Unable to Create the Refresh Token",
      statusCode: 500,
    });
  }
  user.refreshToken = refreshToken;

  return refreshToken;
}
