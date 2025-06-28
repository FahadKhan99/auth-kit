import { model, models, Schema } from "mongoose";
import { IUser } from "../types/user";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    verifyOtp: { type: String, default: "" },
    verifyOtpExpireAt: { type: Date, default: null },
    isAccountVerified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// this will only create this onces
const User = models.User || model("User", userSchema);
// const User = model("User", userSchema);

export default User;
