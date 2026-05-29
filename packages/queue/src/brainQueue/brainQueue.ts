import { Queue } from "bullmq";
import { QueueCollection } from "@repo/shared/constants";
import { redis } from "@repo/cache/redis";
export const brainQueue = new Queue(QueueCollection.INGESTION, {
  connection: redis as any,
});
