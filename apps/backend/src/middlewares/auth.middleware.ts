import { verifyToken } from "@repo/auth/auth";
import { AsyncHandler, UnauthorisedRequestError } from "@repo/shared/api";
export const auth = AsyncHandler(async (req, res, next) => {
  const token: string =
    req.cookies.accessToken ||
    req.headers.authorization?.replace("Bearer ", "");
  if (!token) throw new UnauthorisedRequestError("Access token missing");
  let verifiedToken = verifyToken(token);
  try {
  } catch (err: any) {
    throw new UnauthorisedRequestError("Invalid or expired access token");
  }
  if (verifiedToken.type !== "access")
    throw new UnauthorisedRequestError("Invalid token type");
  req.info = verifiedToken;
  next();
});
