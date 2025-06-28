import transporter from "../config/nodemailer";
import { IUser } from "../types/user";
import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./emailTemplates";

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to ClearNotes",
      html,
    });
  } catch (error) {
    console.error("Error sending welcoming email:", error);
  }
};

export const sendVerificationEmail = async (
  email: string,
  verificationToken: string
) => {
  try {
    const html = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verificationToken
    );
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Verification OTP for ClearNotes",
      html,
    });
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

export const sendPasswordResetEmail = async (
  email: string,
  name: string,
  resetURL: string
) => {
  try {
    const html = PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{resetURL}",
      resetURL
    ).replace("{name}", name);

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Reset your password",
      html,
    });
  } catch (error) {
    console.log("Error sending password reset email", error);
  }
};

// this one is new
export const sendResetSuccessEmail = async (email: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
    });
  } catch (error) {
    console.log("Error sending reset success email", error);
  }
};
