import { COLLECTION_NAME } from "@repo/shared/constants";
import { db_init, w_client } from "../client";
import type {
  WeaviatePayloadType,
  IWeaviateVectorData,
} from "../types/weaviate";
import type { IVectorData } from "@repo/shared/types";

export async function storeManyData(data: IVectorData[]) {
  await db_init();
  const collection =
    w_client.collections.get<WeaviatePayloadType>(COLLECTION_NAME);

  const weaviateData: IWeaviateVectorData[] = data.map((item) => ({
    id: item.id,
    vector: item.vector,
    properties: item.properties as WeaviatePayloadType,
  }));
  return collection.data.insertMany(weaviateData);
}

export async function storeData(data: IVectorData) {
  await db_init();
  const collection =
    w_client.collections.get<WeaviatePayloadType>(COLLECTION_NAME);
  const weaviateData: IWeaviateVectorData = {
    id: data.id,
    vector: data.vector,
    properties: data.properties as WeaviatePayloadType,
  };
  await collection.data.insert(weaviateData);
}
export { db_init };
