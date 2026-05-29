import { Router } from "express";
import { answerQuery } from "./chat.controllers";
import { auth } from "../../middlewares/auth.middleware";

const chatRouter: Router = Router();

chatRouter.use(auth);
chatRouter.post("/answer", answerQuery);
// chatRouter.post("/sendMessage", sendMessage);
// chatRouter.get("/getAllMessages", getAllMessages);

export default chatRouter;
