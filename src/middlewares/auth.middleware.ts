import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/AsyncHandler";
import type { UserJwtPayload } from "../types";
import { BadRequestError, UnauthorisedRequestError } from "../utils/ApiError";

export const auth = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) throw new UnauthorisedRequestError("Access token missing");

  let verifiedToken: UserJwtPayload;

  try {
    verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as UserJwtPayload;
  } catch (err: any) {
    throw new UnauthorisedRequestError("Invalid or expired access token");
  }
  if (verifiedToken.type !== "access")
    throw new UnauthorisedRequestError("Invalid token type");

  req.info = verifiedToken;

  next();
});
