import { Worker } from "bullmq";
import { QueueCollection } from "@repo/shared/constants";
import { redis } from "@repo/cache/redis";
import { processContentService } from "../services/ingestion/processContent";
const worker = new Worker(
  QueueCollection.INGESTION,
  async (job) => {
    const { contentId, userId } = job.data;
    console.log("🚀 Processing:", contentId);
    await processContentService(contentId, userId);
  },
  {
    connection: redis,
    concurrency: 1,
  },
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
