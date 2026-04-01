import { type Content } from "../../db/generated/prisma/client";
import { prisma } from "../../db/prisma";
import { BadRequestError, NotFoundError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";

export const addContent = AsyncHandler(async (req, res) => {
  const { url, type } = req.body;
  const userId = req.info?.id!;
  const content = await prisma.content.create({
    data: {
      userId,
      type,
      url,
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
