import { prisma } from "@repo/db";
import { BadRequestError } from "../../lib/ApiError";
import { AsyncHandler } from "../../lib/AsyncHandler";
import { ApiResponse } from "../../lib/ApiResponse";
import { addToBrainQueue } from "@repo/queue/bainQueue";
export const addToBrain = AsyncHandler(async (req, res, next) => {
  const { contentId } = req.body;
  if (!contentId) throw new BadRequestError("Content Id is Required");
  const userId = req.info?.id;
  const content = await prisma.content.findUnique({
    where: { id: contentId, userId: userId },
    select: {
      isInBrain: true,
      status: true,
    },
  });
  if (content && (content.isInBrain || content?.status === "COMPLETED"))
    throw new BadRequestError("content aleady in ai brain");
  // await brainQueue.add("process-content", { contentId, userId });
  await addToBrainQueue("process-content", { contentId, userId });
  res.status(202).json(
    new ApiResponse({
      statusCode: 202,
      message: "Successfuly added content into processing queue",
      path: req.originalUrl,
    }),
  );
});
