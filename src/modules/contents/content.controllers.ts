import { type Content } from "../../db/generated/prisma/client";
import { prisma } from "../../db/prisma";
import { BadRequestError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";

export const addContent = AsyncHandler(async (req, res) => {
  const { url, type, userId } = req.body;
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
  const content = await prisma.content.findUnique({
    where: { id: contentId },
    select: {
      isInBrain: true,
      status: true,
      error: true,
    },
  });

  res.status(201).json(
    new ApiResponse<typeof content>({
      statusCode: 201,
      data: content,
      path: req.originalUrl,
      message: "successfully fetched the status of content",
    }),
  );
});
