import type { JsonValue } from "@repo/db/types";
import type { Role } from "@repo/db/enums";

export type ChatType = {
  role: Role;
  content: string;
  sources: JsonValue[];
}[];
