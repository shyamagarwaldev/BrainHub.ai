import { Queue } from "bullmq";
import redis from "../config/redis";

export const brainQueue = new Queue("brain-queue", { connection: redis });
