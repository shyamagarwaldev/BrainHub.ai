import { redis } from "@repo/cache/redis";
import { QueueCollection } from "@repo/shared/constants";
import { Queue } from "bullmq";

export const embeddingQueue = new Queue(QueueCollection.EMBEDDING, {
  connection: redis,
});
