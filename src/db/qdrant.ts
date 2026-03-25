import { QdrantClient } from "@qdrant/js-client-rest";

export const qdrant_client = new QdrantClient({
  host: "localhost",
  port: 6333,
});
