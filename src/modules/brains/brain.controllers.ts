import { prisma } from "../../db/prisma";
import ApiError, { BadRequestError, NotFoundError } from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";
import {
  Role,
  type Conversation,
  type Message,
} from "../../db/generated/prisma/client";
import { brainQueue } from "../../queues";
import { queryBrainService } from "./brain.service";

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
  await brainQueue.add("process-content", { contentId, userId });
  res.status(202).json(
    new ApiResponse({
      statusCode: 202,
      message: "Successfuly added content into processing queue",
      path: req.originalUrl,
    }),
  );
});

export const queryBrain = AsyncHandler(async (req, res) => {
  const { query, conversationId } = req.body;
  const userId = req.info?.id;
  if (!userId) throw new BadRequestError("User Id is Required");
  const response = await queryBrainService(query, userId);
  const title = await getTitle(query, response);
  let conversation: Conversation;
  if (!conversationId) {
    conversation = await prisma.conversation.create({
      data: {
        userId,
        title: title,
      },
    });
    if (!conversation)
      throw new ApiError({
        message: "unable to create a conversation",
        statusCode: 500,
      });
  } else {
    conversation = (await prisma.conversation.findUnique({
      where: { id: conversationId },
    })) as Conversation;
    if (!conversation) throw new NotFoundError("convertion");
  }

  const userMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: Role.USER,
      content: query.trim(),
      sources: [],
    },
  });

  const assistantMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: Role.ASSISTANT,
      content: response.answer,
      sources: response.sources,
      metadata: {
        citedSources: response.citedSources,
      },
    },
  });

  const msg: Message[] = [userMessage, assistantMessage];

  res.status(200).json(
    new ApiResponse<Message[]>({
      statusCode: 200,
      message: "Succesfully answerd the query",
      data: msg,
    }),
  );
});

async function getTitle(query: any, response: any): Promise<string> {
  return "Function not implemented.";
}
