import { Router } from "express";
import { addContent, getQuery } from "./brain.controllers";

const brainRouter = Router();

brainRouter.post("/processContent", addContent);
brainRouter.post("/processQuery", getQuery);

export default brainRouter;
