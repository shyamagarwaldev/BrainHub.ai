import { type NextFunction, type Request, type Response } from "express";
import ApiError from "../utils/ApiError";

function ErrorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  let error: ApiError;
  if (err instanceof ApiError) {
    error = err;
  } else {
    const unknownError = err as Error;
    error = new ApiError({
      message: unknownError?.message || "Internal Server Error",
      statusCode: 500,
      errors: [],
      path: req.originalUrl,
      stack: unknownError?.stack,
    });
  }
  error.path = req.originalUrl;
  error.statusCode = error.statusCode || 500;

  console.error("ERROR:", {
    message: error.message,
    statusCode: error.statusCode,
    path: error.path,
    method: req.method,
    errors: error.errors,
    stack: error.stack,
  });
  res.status(error.statusCode).json({
    message: error.message,
    success: false,
    statusCode: error.statusCode,
    path: error.path,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
}

export default ErrorMiddleware;
