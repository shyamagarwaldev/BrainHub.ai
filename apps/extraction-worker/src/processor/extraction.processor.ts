import { Worker } from "bullmq";
import { QueueCollection } from "@repo/shared/constants";
import { redis } from "@repo/cache/redis";
import { extraction } from "../services/extraction/extraction";
console.log(process.env.BASE_URL);
console.log(process.env.OPENROUTER_API_KEY);
const extractionWorker = new Worker(
  QueueCollection.EXTRACTION,
  async (job) => {
    const { contentId } = job.data;
    console.log("🚀 Extracting:", contentId);
    await extraction(contentId);
  },
  {
    connection: redis,
  },
);

extractionWorker.on("failed", (job, err) => {
  console.log(`job #extraction-${job?.id} failed with error: ${err}`);
});

extractionWorker.on("completed", (job) => {
  console.log(`job #extraction-${job.id} completed}`);
});
