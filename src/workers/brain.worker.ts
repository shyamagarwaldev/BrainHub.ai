import { Worker } from "bullmq";
import redis from "../config/redis";
import { processContentService } from "../modules/brains/brain.service";
const worker = new Worker(
  "brain-queue",
  async (job) => {
    const { contentId, userId } = job.data;
    console.log("🚀 Processing:", contentId);
    await processContentService(contentId, userId);
  },
  {
    connection: redis,
    concurrency: 3,
  },
);

worker.on("completed", (job) => {
  console.log(`✅ Job ${job.id} completed`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err.message);
});
