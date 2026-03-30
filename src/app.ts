import express from "express";
import brainRouter from "./modules/brains/brain.routes";
import userRouter from "./modules/users/user.routes";
import ErrorMiddleware from "./middlewares/error.middleware";
import contentRouter from "./modules/contents/content.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/brains", brainRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/contents", contentRouter);

app.use(ErrorMiddleware);

export default app;
