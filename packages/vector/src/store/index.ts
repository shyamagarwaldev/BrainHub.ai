import { COLLECTION_NAME } from "@repo/shared/constants";
import { vectors } from "weaviate-client";
import w_client from "../client";
import type { IWeaviatePayload, IWeaviateVectorData } from "../types/weaviate";
import type { IVectorData } from "@repo/shared/types";

export async function db_init() {
  const exists = await w_client.collections.exists(COLLECTION_NAME);
  if (exists) return;
  await w_client.collections.create<IWeaviatePayload>({
    name: COLLECTION_NAME,
    vectorizers: vectors.selfProvided(),
    properties: [
      {
        name: "chunkIndex",
        dataType: "int",
        indexSearchable: false,
      },

      {
        name: "userId",
        dataType: "text",
        indexSearchable: false,
      },
      {
        name: "contentId",
        dataType: "text",
        indexSearchable: false,
      },
      {
        name: "text",
        dataType: "text",
      },
      {
        name: "contentSource",
        dataType: "text",
      },
      {
        name: "url",
        dataType: "text",
      },
      {
        name: "title",
        dataType: "text",
      },
    ],
  });
}

export async function storeManyData(data: IVectorData[]) {
  await db_init();
  const collection =
    w_client.collections.get<IWeaviatePayload>(COLLECTION_NAME);

  const weaviateData: IWeaviateVectorData[] = data.map((item) => ({
    id: item.id,
    vector: item.vector,
    properties: item.properties as IWeaviatePayload,
  }));
  return collection.data.insertMany(weaviateData);
}

export async function storeData(data: IVectorData) {
  await db_init();
  const collection =
    w_client.collections.get<IWeaviatePayload>(COLLECTION_NAME);
  const weaviateData: IWeaviateVectorData = {
    id: data.id,
    vector: data.vector,
    properties: data.properties as IWeaviatePayload,
  };
  await collection.data.insert(weaviateData);
}
