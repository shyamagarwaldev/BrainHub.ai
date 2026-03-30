import { Router } from "express";
import { signUp, loginIn } from "./user.controllers";

const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", loginIn);

export default userRouter;
