import { type Content } from "../../db/generated/prisma/client";
import { prisma } from "../../db/prisma";
import { AddContentSchema } from "../../schemas/content.zod.schema";
import {
  BadRequestError,
  NotFoundError,
  ZodCustomError,
} from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";

export const addContent = AsyncHandler(async (req, res) => {
  const userId = req.info?.id!;
  console.log(req.body);

  const verifiedInput = AddContentSchema.safeParse({
    url: req.body?.url,
    rawText: req.body?.rawText,
    type: req.body?.type,
    title: req.body?.title,
  });
  if (!verifiedInput.success) {
    throw new ZodCustomError(verifiedInput.error);
  }

  const content = await prisma.content.create({
    data: {
      userId,
      type: verifiedInput.data.type,
      url: verifiedInput.data.url || null,
      rawContent: verifiedInput.data.rawContent || null,
      title: verifiedInput.data.title,
    },
  });

  res.status(200).json(
    new ApiResponse<Content>({
      message: "Succesfuly added content",
      data: content,
      statusCode: 200,
    }),
  );
});

export const checkStatus = AsyncHandler(async (req, res) => {
  const { contentId } = req.params;

  if (typeof contentId !== "string")
    throw new BadRequestError("contendId must be string only");
  const content = await prisma.content.findFirst({
    where: { id: contentId },
    select: {
      isInBrain: true,
      status: true,
      error: true,
    },
  });
  if (!content) throw new NotFoundError(`content with id:${contentId}`);

  res.status(201).json(
    new ApiResponse<typeof content>({
      statusCode: 201,
      data: content,
      path: req.originalUrl,
      message: "successfully fetched the status of content",
    }),
  );
});
