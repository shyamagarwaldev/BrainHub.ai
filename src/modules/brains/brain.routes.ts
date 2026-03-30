import { Router } from "express";
import { addToBrain, queryBrain } from "./brain.controllers";
import { auth } from "../../middlewares/auth.middleware";

const brainRouter = Router();

brainRouter.use(auth);
brainRouter.post("/addToBrain", addToBrain);
brainRouter.post("/queryBrain", queryBrain);

export default brainRouter;
