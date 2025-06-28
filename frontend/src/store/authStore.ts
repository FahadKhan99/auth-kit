import { create } from "zustand";
import axios from "axios";

interface ValidationError {
  field: string;
  message: string;
}

interface User {
  _id: string;
  name: string;
  email: string;
  password: string;
  isAccountVerified: boolean;

  verifyOtp: string;
  verifyOtpExpireAt: Date | null;

  resetOtp: string;
  resetOtpExpireAt: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  errors?: ValidationError[]; // optional array for validation errors

  signup: (name: string, email: string, password: string) => Promise<boolean>;
  sendVerificationOtp: () => Promise<boolean>;
  verifyEmail: (otp: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (otp: string, password: string, confirmPassword: string) => Promise<boolean>;
  checkAuth: () => Promise<boolean>;
  reset: () => void;
}

const initialAuthState = {
  user: null,
  isAuthenticated: false,
  error: null,
  errors: [],
  isLoading: false,
  isCheckingAuth: false,
}

const API_URL = "http://localhost:8000/api/auth";

export const useAuthStore = create<AuthState>((set) => ({
  ...initialAuthState,

  reset: () => set(initialAuthState), 

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null, errors: [] });

    try {
      const res = await axios.post(
        `${API_URL}/signup`,
        {
          name,
          email,
          password,
        },
        { withCredentials: true } // this is must to store the cookie in the browser
      );

      if (res.data.success) {
        set({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  sendVerificationOtp: async () => {
    set({ isLoading: true, error: null, errors: [] });

    try {
      const res = await axios.post(
        `${API_URL}/send-verify-otp`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        set({
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }

      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  verifyEmail: async (otp: string) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const res = await axios.post(
        `${API_URL}/verify-email`,
        {
          otp,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        set({
          user: res.data.user,
          isAuthenticated: true,
          isLoading: false,
        });
        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null, errors: [] });
    try {
      const res = await axios.post(
        `${API_URL}/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      if (res.data) {
        set({
          isAuthenticated: true,
          user: res.data.user,
          isLoading: false,
        });

        return true;
      }

      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null, errors: [] });

    try {
      const res = await axios.post(
        `${API_URL}/logout`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        set({
          isLoading: false,
          isAuthenticated: false,
          user: null,
          error: null,
          errors: [],
        });
        return true;
      }

      return false;
    } catch (error: any) {
      // no zod validation
      set({
        error: error.response.message || "Error logging out",
        isLoading: false,
      });
      return false;
    }
  },

  forgotPassword: async (email: string) => {
    set({ isLoading: true, error: null, errors: [] });

    try {
      const res = await axios.post(`${API_URL}/send-reset-otp`, { email });

      if (res.data.success) {
        set({ isLoading: false });
        return true;
      }

      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  resetPassword: async (otp: string, password: string, confirmPassword: string) => {
    set({ isLoading: true, error: null, errors: [] });

    try {
      const res = await axios.post(`${API_URL}/reset-password/${otp}`, {
        password,
        confirmPassword
      });

      if (res.data.success) {
        set({ isLoading: false });

        return true;
      }
      return false;
    } catch (error: any) {
      const message = error.response?.data?.message;
      const errors = error.response?.data?.errors;

      set({
        error: message || "Something went wrong.",
        errors: errors || [],
        isLoading: false,
      });

      return false;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null, errors: [] });

    try {
      const res = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
      });

      if (res.data.user) {
        set({
          user: res.data.user,
          isAuthenticated: true,
          isCheckingAuth: false,
        });

        return true;
      }

      return false;
    } catch (error: any) {
      // no zod validation
      set({ error: error.response.message || "", isCheckingAuth: false });
      return false;
    }
  },
}));
