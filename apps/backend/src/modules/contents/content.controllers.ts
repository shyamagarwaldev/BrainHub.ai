import { AddContentSchema } from "@repo/shared/schemas";
import { AsyncHandler } from "../../lib/AsyncHandler";
import { ZodCustomError } from "../../lib/zodError";
import { prisma } from "@repo/db";
import { ApiResponse } from "../../lib/ApiResponse";
import type { Content } from "@repo/db/types";
import { BadRequestError, NotFoundError } from "../../lib/ApiError";

export const addContent = AsyncHandler(async (req, res) => {
  const userId = req.info?.id!;
  console.log(req.body);
  const verifiedInput = AddContentSchema.safeParse({
    url: req.body?.url,
    rawText: req.body?.rawText,
    source: req.body?.source,
    title: req.body?.title,
  });
  if (!verifiedInput.success) {
    throw new ZodCustomError(verifiedInput.error);
  }

  const content = await prisma.content.create({
    data: {
      userId,
      source: verifiedInput.data.source,
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
