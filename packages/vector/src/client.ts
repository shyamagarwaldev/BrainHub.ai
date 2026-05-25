import weaviate, { type WeaviateClient } from "weaviate-client";

const w_client: WeaviateClient = await weaviate.connectToLocal();

export default w_client;
