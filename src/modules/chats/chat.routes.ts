import { Router } from "express";
import { sendMessage, getAllMessages } from "./chat.controllers";
import { auth } from "../../middlewares/auth.middleware";

const chatRoute = Router();

chatRoute.use(auth);
chatRoute.post("/sendMessage", sendMessage);
chatRoute.get("/getAllMessages", getAllMessages);

export default chatRoute;
