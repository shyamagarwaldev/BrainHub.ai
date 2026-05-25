import type { PayloadType } from "@repo/shared/types";
import type { Properties } from "weaviate-client";

export interface IWeaviatePayload extends PayloadType, Properties {}
export interface IWeaviateVectorData {
  id: string;
  vector: number[];
  properties: IWeaviatePayload;
}
