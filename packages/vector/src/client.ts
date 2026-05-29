import { COLLECTION_NAME } from "@repo/shared/constants";
import weaviate, {
  reranker,
  vectors,
  type WeaviateClient,
} from "weaviate-client";
import type { WeaviatePayloadType } from "./types/weaviate";

export const w_client: WeaviateClient = await weaviate.connectToCustom({
  httpHost: "weaviate",
  grpcHost: "weaviate",
  httpPort: 8080,
  grpcPort: 50051,
});

export async function db_init() {
  const exists = await w_client.collections.exists(COLLECTION_NAME);
  if (exists) return;
  await w_client.collections.create<WeaviatePayloadType>({
    name: COLLECTION_NAME,
    vectorizers: vectors.selfProvided(),
    reranker: reranker.transformers(),
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
