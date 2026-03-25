import type { ApiResponseOptions } from "../types";

export default class ApiResponse<T = unknown> {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  path?: string;
  metadata?: Record<string, unknown>;
  constructor({
    statusCode,
    data,
    message = "Success",
    path,
    ...metadata
  }: ApiResponseOptions<T>) {
    this.statusCode = statusCode;
    this.data = data as T;
    this.message = message;
    this.success = statusCode < 400;
    this.path = path;
    this.metadata = metadata;
  }
}
