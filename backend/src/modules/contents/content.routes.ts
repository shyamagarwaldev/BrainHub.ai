import { Router } from "express";
import { addContent, checkStatus } from "./content.controllers";
import { auth } from "../../middlewares/auth.middleware";

const contentRouter = Router();
contentRouter.use(auth);
contentRouter.post("/addContent", addContent);
contentRouter.get("/checkStatus/:contentId", checkStatus);

export default contentRouter;
