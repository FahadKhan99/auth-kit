import { Request, Response } from "express";
import { HttpStatus } from "../config/httpsStatus";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  sendForgetPasswordOtpSchema,
  verifyEmailSchema,
} from "../schemas/authSchema";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel";
import { IUser } from "../types/user";
import { generateOTP } from "../helpers/generateOtp";
import {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendVerificationEmail,
  sendWelcomeEmail,
} from "../mail/emails";

import crypto from "crypto";

export const registerController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parseResult = registerSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Sign up failed.", errors });
    }

    const { name, email, password } = parseResult.data;

    // user with same email
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        message: "User with this email already exists.",
        errors: [],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Send token as secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // ⛔ can't access via JS (XSS protection)
      secure: process.env.NODE_ENV === "production", // ✅ use HTTPS in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // ⚠️ protects against CSRF (adjust if needed)
      maxAge: 24 * 60 * 60 * 1000, // 1 day in ms
    });

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.log("RegisterController error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during registration.",
      errors: [],
    });
  }
};

export const loginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parseResult = loginSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Login failed.", errors });
    }

    const { email, password } = parseResult.data;

    const user = await User.findOne({ email }).lean<IUser>();

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid email or password.",
        errors: [],
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    // Send token as secure HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "User Logged in successfully", user });
  } catch (error) {
    console.log("LoginController error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during logging in.",
      errors: [],
    });
  }
};

export const logoutController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    // dont need maxAge when clearing
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "User logged out successfully." });
  } catch (error) {
    console.log("LogoutContoller error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong during logging in.",
    });
  }
};

export const sendVerifyOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const userId = req.userId;

    console.log({ userId });
    console.log("req.userId", req.userId);

    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized access.", errors: [] });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found.", errors: [] });
    }

    if (user.isAccountVerified) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Account is already verified.",
        errors: [],
      });
    }

    // save this otp in the user object
    user.verifyOtp = generateOTP();
    user.verifyOtpExpireAt = new Date(Date.now() + 10 * 60 * 1000); // 10 seconds

    await user.save();

    sendVerificationEmail(user.email, user.verifyOtp);

    return res
      .status(HttpStatus.OK)
      .json({ success: true, message: "Verification OTP sent successfully." });
  } catch (error) {
    console.log("sendVerifyOtp error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
      errors: [],
    });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { otp } = req.body;

    const parseResult = verifyEmailSchema.safeParse({ otp });

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Verification failed.", errors });
    }

    const userId = req.userId;

    if (!userId) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: "Unauthorized access", errors: [] });
    }

    const user = await User.findById(userId).lean<IUser>();

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found", errors: [] });
    }

    if (user.isAccountVerified) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Account is already verified.",
        errors: [],
      });
    }

    if (
      user.verifyOtp === "" ||
      user.verifyOtpExpireAt === null ||
      otp !== user.verifyOtp
    ) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid OTP provided.",
        errors: [],
        user: {
          ...user,
          password: "",
        },
      });
    }

    // otp expired
    const now = new Date();
    if (user.verifyOtpExpireAt && user.verifyOtpExpireAt < now) {
      const expiredBy = Math.floor(
        (now.getTime() - user.verifyOtpExpireAt.getTime()) / 1000
      );
      console.log(`OTP expired ${expiredBy} seconds ago`);

      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
        errors: [],
      });
    }

    await User.findByIdAndUpdate(user._id, {
      isAccountVerified: true,
      verifyOtp: "",
      verifyOtpExpireAt: null,
    });

    sendWelcomeEmail(user.email, user.name);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Account verified successfully.",
      user
    });
  } catch (error) {
    console.log("verifyEmail error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to verify Email. Please try again.",
      errors: [],
    });
  }
};

export const sendForgetPasswordOtp = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parseResult = sendForgetPasswordOtpSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Failed to sent OTP", errors });
    }

    const { email } = parseResult.data;

    const user = await User.findOne({ email }).lean<IUser>();

    if (!user) {
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "If this email is registered, an OTP has been sent.",
        errors: [],
      });
    }

    // Prevent repeated OTP requests
    if (user.resetOtpExpireAt && user.resetOtpExpireAt > new Date()) {
      return res.status(HttpStatus.CONFLICT).json({
        success: false,
        message:
          "An OTP has already been sent. Please wait a few minutes before requesting a new one.",
        errors: [],
      });
    }

    const otp = crypto.randomBytes(20).toString("hex");
    await User.updateOne(
      { _id: user._id },
      {
        resetOtp: otp,
        resetOtpExpireAt: new Date(Date.now() + 30 * 1000), // 30 sec
      }
    );

    sendPasswordResetEmail(
      user.email,
      user.name,
      `${process.env.CLIENT_URL}/reset-password/${otp}` // resetURL
    );

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Reset password otp send successfully.",
    });
  } catch (error) {
    console.log("sendForgetPasswordOtp error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to send a forget password OTP. Please try again.",
      errors: [],
    });
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const parseResult = resetPasswordSchema.safeParse(req.body);

    if (!parseResult.success) {
      const errors = parseResult.error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Password Reset Failed.", errors });
    }

    const { password } = parseResult.data;
    const { otp } = req.params;

    const user = await User.findOne({ resetOtp: otp }).lean<IUser>();

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found", errors: [] });
    }

    if (!user.resetOtp || user.resetOtp !== otp) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid OTP provided.",
        errors: [],
      });
    }

    // expire check
    if (user.resetOtpExpireAt && user.resetOtpExpireAt < new Date()) {
      console.log("under expire check user-> ", user);
      return res.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: "OTP has expired. Please request a new one.",
        errors: [],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.updateOne(
      { _id: user._id },
      {
        password: hashedPassword,
        resetOtp: "",
        resetOtpExpireAt: null,
      }
    );

    sendResetSuccessEmail(user.email);

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log("resetPassword error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to reset your password. Please try again.",
      errors: [],
    });
  }
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .lean<IUser>();

    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .json({ success: false, message: "User not found" });
    }

    console.log({ user });
    return res.status(HttpStatus.OK).json({
      success: true,
      message: "User authenticated successfully",
      user,
    });
  } catch (error) {
    console.log("checkAuth error: ", error);
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to check auth. Please try again.",
    });
  }
};
