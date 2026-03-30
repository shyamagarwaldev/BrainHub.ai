import { Router } from "express";
import { addContent } from "./content.controllers";

const contentRouter = Router();

contentRouter.post("/addContent", addContent);

export default contentRouter;
