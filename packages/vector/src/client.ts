import weaviate, { type WeaviateClient } from "weaviate-client";

const w_client: WeaviateClient = await weaviate.connectToCustom({
  httpHost: process.env.WEAVIATE_HTTP_HOST,
  grpcHost: process.env.WEAVIATE_GRPC_HOST,
  httpPort: Number(process.env.WEAVIATE_HTTP_PORT),
  grpcPort: Number(process.env.WEAVIATE_HTTP_HOST),
});

export default w_client;
