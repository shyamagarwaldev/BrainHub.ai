import { Router } from "express";
import { addToBrain } from "./brain.controllers";
import { auth } from "../../middlewares/auth.middleware";

const brainRouter = Router();

brainRouter.use(auth);
brainRouter.post("/addToBrain", addToBrain);

export default brainRouter;
