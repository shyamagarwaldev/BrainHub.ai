import { handleZodError, type ZodError } from "@repo/shared/validation";
import { ApiError } from "./ApiError";

export class ZodCustomError<T = unknown> extends ApiError {
  constructor(error: ZodError<T>) {
    super(handleZodError(error));
  }
}
