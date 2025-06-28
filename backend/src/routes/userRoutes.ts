import express from "express";
import { getUserData } from "../controllers/userController";
import userAuth from "../middleware/userAuth";

const userRouter = express.Router();

userRouter.route("/me").get(userAuth, getUserData);

export default userRouter;
