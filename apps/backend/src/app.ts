import express, { type Express } from "express";
import cookieParser from "cookie-parser";
import brainRouter from "./modules/brains/brain.routes";
import userRouter from "./modules/users/user.routes";
import ErrorMiddleware from "./middlewares/error.middleware";
import contentRouter from "./modules/contents/content.routes";
import chatRouter from "./modules/chats/chat.routes";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/health", (req, res) => {
  return res.json({ status: "ok" });
});

app.use("/api/v1/brains", brainRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);
app.use("/api/v1/chats", chatRouter);

app.use(ErrorMiddleware);

export default app;
