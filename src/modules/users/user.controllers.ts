import * as bcrypt from "bcrypt";
import { prisma } from "../../db/postgres";
import ApiResponse from "../../utils/ApiResponse";
import AsyncHandler from "../../utils/AsyncHandler";
import ApiError, {
  UnauthorisedRequestError,
  ZodCustomError,
} from "../../utils/ApiError";
import {
  LogInSchema,
  SignUpSchema,
  type SignUpSchemaType,
} from "../../schemas/user.zod.schema";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/GenerateTokens";

export const signUp = AsyncHandler(async (req, res) => {
  const { email, username, password }: SignUpSchemaType = req.body;

  const {
    data: verifiedInput,
    success,
    error,
  } = SignUpSchema.safeParse({ email, username, password });

  if (!success) {
    throw new ZodCustomError(error);
  }

  const [existingEmailUser, existingUsernameUser] = await Promise.all([
    prisma.user.findUnique({ where: { email } }),
    prisma.user.findUnique({ where: { username } }),
  ]);

  if (existingEmailUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Email is already in use",
      path: req.originalUrl,
    });
  }

  if (existingUsernameUser) {
    throw new ApiError({
      statusCode: 409,
      message: "Username is already in use",
      path: req.originalUrl,
    });
  }

  const hashedPassword = await bcrypt.hash(verifiedInput.password, 10);

  const user = await prisma.user.create({
    data: {
      email: verifiedInput.email,
      username: verifiedInput.username,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.status(201).json(
    new ApiResponse<typeof user>({
      statusCode: 201,
      message: "User created successfully",
      data: user,
      path: req.originalUrl,
    }),
  );
});

export const loginIn = AsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const parsedInput = LogInSchema.safeParse({ email, password });

  if (!parsedInput.success) {
    throw new ZodCustomError(parsedInput.error);
  }

  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  const comparePassword = await bcrypt.compare(password, user?.password!);

  if (!comparePassword)
    throw new UnauthorisedRequestError("Incorrect Password");

  const accessToken = generateAccessToken(user?.id!);

  const refreshToken = generateRefreshToken(user?.id!);

  await prisma.user.update({
    where: { id: user?.id },
    data: { refreshToken: refreshToken },
  });

  res
    .status(200)
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24,
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 1000 * 60 * 24 * 3,
    });
});
