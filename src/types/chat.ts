import type { JsonValue } from "@prisma/client/runtime/client";
import type { Role } from "../db/generated/prisma/client";

export type ChatType = {
  role: Role;
  content: string;
  sources: JsonValue[];
}[];
