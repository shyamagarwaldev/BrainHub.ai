import { redis } from "@repo/cache/redis";
import { QueueCollection } from "@repo/shared/constants";
import { Queue } from "bullmq";

export const extractionQueue = new Queue(QueueCollection.EXTRACTION, {
  connection: redis,
});
