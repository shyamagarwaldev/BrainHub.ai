import { Worker } from "bullmq";
import { QueueCollection } from "@repo/shared/constants";
import { redis } from "@repo/cache/redis";
import { embedding } from "../service/embedding";
console.log(process.env.BASE_URL);
console.log(process.env.OPENROUTER_API_KEY);
const embeddingWorker = new Worker(
  QueueCollection.EMBEDDING,
  async (job) => {
    const { contentId } = job.data;
    console.log("🚀 Embedding:", contentId);
    await embedding(contentId);
  },
  {
    connection: redis,
  },
);

embeddingWorker.on("failed", (job, err) => {
  console.log(`job #embedding-${job?.id} failed with error: ${err}`);
});

embeddingWorker.on("completed", (job) => {
  console.log(`job #embedding-${job.id} completed}`);
});
