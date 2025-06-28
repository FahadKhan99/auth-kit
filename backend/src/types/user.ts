export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAccountVerified: boolean;

  verifyOtp: string;
  verifyOtpExpireAt: Date | null;

  resetOtp: string;
  resetOtpExpireAt: Date | null;
}
