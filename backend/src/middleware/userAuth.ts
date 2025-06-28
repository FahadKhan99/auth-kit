import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpStatus } from "../config/httpsStatus";
import { IJwtPayload } from "../types/jwtPayload";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "NO_AUTH_TOKEN",
        message: "Access denied. No token provided.",
      });
    }

    // here verify the jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as IJwtPayload;
    if (!decoded.userId) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        error: "INVALID_TOKEN",
        message: "Invalid token provided.",
      });
    }

    (req as any).userId = decoded.userId;

    next();
  } catch (error) {
    console.log("UserAuth middleware error:", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: "AUTH_MIDDLEWARE_ERROR",
      message:
        "An unexpected error occurred during authentication. Please try again.",
    });
  }
};

export default userAuth;
