import {
  Role,
  type Conversation,
  type Message,
} from "../../db/generated/prisma/client";
import { prisma } from "../../db/prisma";
import { getTitle } from "../../shared/llm.service";
import ApiError, {
  BadRequestError,
  NotFoundError,
  ServerError,
} from "../../utils/ApiError";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";
import { queryBrainService } from "../brains/brain.service";

export const sendMessage = AsyncHandler(async (req, res) => {
  const { query, conversationId } = req.body;
  const userId = req.info?.id!;
  let conversation: Conversation;
  if (conversationId) {
    conversation = (await prisma.conversation.findFirst({
      where: { id: conversationId, userId },
    })) as Conversation;
    if (!conversation) throw new NotFoundError("convertion");
  } else {
    const title = await getTitle(query);
    conversation = await prisma.conversation.create({
      data: {
        userId,
        title,
      },
    });
    if (!conversation)
      throw new ApiError({
        message: "unable to create a conversation",
        statusCode: 500,
      });
  }
  const userMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: Role.USER,
      content: query.trim(),
      sources: [],
      userId,
    },
  });
  const historyMessage = await prisma.message.findMany({
    where: {
      conversationId: conversation.id,
    },
    select: {
      content: true,
      role: true,
      sources: true,
    },
    orderBy: { createdAt: "asc" },
    take: 6,
  });
  const response = await queryBrainService(query, userId, historyMessage);
  const assistantMessage = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: Role.ASSISTANT,
      content: response.answer,
      sources: response.sources,
      userId,
      metadata: {
        citedSources: response.citedSources,
      },
    },
  });

  const message: Message[] = [userMessage, assistantMessage];

  res.status(200).json(
    new ApiResponse<{ conversation: Conversation; message: Message[] }>({
      statusCode: 200,
      message: "Succesfully answerd the query",
      data: {
        conversation,
        message,
      },
    }),
  );
});

export const getAllMessages = AsyncHandler(async (req, res, next) => {
  const userId = req.info?.id!;
  const conversationId = req.params.conversationId;
  if (typeof conversationId !== "string" || !conversationId)
    throw new BadRequestError("conversation id is required");
  const messages = await prisma.message.findMany({
    where: {
      userId,
      conversationId,
    },
    select: {
      metadata: true,
      content: true,
      sources: true,
      role: true,
    },
  });
  if (!Array.isArray(messages) || messages.length === 0) {
    throw new ServerError(
      "unable to get messages for the given conversation id",
    );
  }
  res.status(200).json(
    new ApiResponse<typeof messages>({
      statusCode: 200,
      message: "successfuly got the messages",
      data: messages,
      path: req.originalUrl,
    }),
  );
});
