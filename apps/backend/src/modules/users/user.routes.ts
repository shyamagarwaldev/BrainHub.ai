import { Router } from "express";
import { signUp, logIn } from "./user.controllers";

const userRouter: Router = Router();

userRouter.post("/signup", signUp);
userRouter.post("/login", logIn);

export default userRouter;
