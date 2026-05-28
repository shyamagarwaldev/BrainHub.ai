import type { PayloadType } from "@repo/shared/types";
import type { Properties } from "weaviate-client";

// export interface IWeaviatePayload extends PayloadType, Properties {}

type Expand<T> = {
  [K in keyof T]: T[K];
};

export type WeaviatePayloadType = Expand<PayloadType & Properties>;
export interface IWeaviateVectorData {
  id: string;
  vector: number[];
  properties: WeaviatePayloadType;
}
