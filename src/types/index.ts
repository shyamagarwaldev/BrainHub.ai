import { ContentType } from "../db/generated/prisma/enums";
import type { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
export interface PayloadType extends Record<string, unknown> {
  userId: string;
  contentId: string;
  chunkIndex: number;
  text: string;
  type: ContentType;
}

export type VectorDataType = {
  id: string;
  vector: number[];
  payload: PayloadType;
};

export type InsertStatusType = "acknowledged" | "completed" | "wait_timeout";

export type ContextType = { type: string; text: string }[];
export interface ApiErrorOptions {
  message?: string;
  statusCode: number;
  stack?: string;
  errors?: any[];
  path?: string;
}
export interface ApiResponseOptions<T = unknown> {
  statusCode: number;
  data?: T;
  message?: string;
  path?: string;
  metadata: Record<string, unknown>;
}

declare module "express-serve-static-core" {
  interface Request {
    info?: UserJwtPayload;
  }
}

export type ApiResponseReturnType = {
  statusCode: number;
  success: boolean;
  data: any | any[];
  message: string;
  path?: string;
};

export type AsyncHandlerPropsType = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

// export interface NewRequestObjectType extends Request {
//   info: UserJwtPayload;
// }

export interface UserJwtPayload extends JwtPayload {
  id: string;
}

export type ErrorDetail = {
  field?: string;
  message: string;
};
