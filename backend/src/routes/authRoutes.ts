import { Router } from "express";
import {
  checkAuth,
  loginController,
  logoutController,
  registerController,
  resetPassword,
  sendForgetPasswordOtp,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController";
import userAuth from "../middleware/userAuth";

// custom Request save it directly in "express-serve-static-core" where all the types are stored
declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

const authRouter = Router();

authRouter.route("/check-auth").get(userAuth, checkAuth);

// another syntax router.post(<route>, <middleware>, <controler>)
authRouter.route("/signup").post(registerController);
authRouter.route("/login").post(loginController);
authRouter.route("/logout").post(logoutController);

// authRouter.use(userAuth);  // this applies userAuth for all routes below
authRouter.route("/send-verify-otp").post(userAuth, sendVerifyOtp);
authRouter.route("/verify-email").post(userAuth, verifyEmail);

authRouter.route("/send-reset-otp").post(sendForgetPasswordOtp);
authRouter.route("/reset-password/:otp").post(resetPassword);

export default authRouter;
