import { type Content } from "../../db/generated/prisma/client";
import { prisma } from "../../db/postgres";
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
