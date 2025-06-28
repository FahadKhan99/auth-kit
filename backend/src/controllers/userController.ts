import { Request, Response } from "express";
import { HttpStatus } from "../config/httpsStatus";
import User from "../models/userModel";
import { IUser } from "../types/user";

export const getUserData = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized access" });
    }

    const user = await User.findById(userId)
      .select(
        "-password -resetOtp -resetOtpExpireAt -verifyOtp -verifyOtpExpireAt"
      )
      .lean<IUser>();

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    return res.status(HttpStatus.OK).json({
      success: true,
      user,
      message: "User data retrieved successfully.",
    });
  } catch (error) {
    console.error("getUserData error:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to retrieve user data.",
    });
  }
};
