import jwt from "jsonwebtoken";
import AsyncHandler from "../utils/AsyncHandler";
import type { UserJwtPayload } from "../types";
import { BadRequestError, UnauthorisedRequestError } from "../utils/ApiError";

export const auth = AsyncHandler(async (req, res, next) => {
  const token =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");

  if (!token) throw new BadRequestError("Access Token");

  let verifiedToken: UserJwtPayload;

  try {
    verifiedToken = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as UserJwtPayload;
  } catch (err) {
    throw new UnauthorisedRequestError("Inavaid or expired access token");
  }

  req.info = verifiedToken;

  next();
});
