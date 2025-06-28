import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import FieldError from "../components/FieldError";

const EmailVerificationPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();
  const { sendVerificationOtp, verifyEmail, isLoading, error, errors, user } =
    useAuthStore();

  const handleEmailVerification = async (e: any) => {
    e.preventDefault();
    const verificationOtp = otp.join("");

    try {
      const success = await verifyEmail(verificationOtp);
      if (success) {
        toast.success("Email Verified successfully.");
        navigate("/");
      }
    } catch (error) {
      console.log("Error in verifyEmail: ", error);
    }
  };

  const handleChange = (index: number, value: string) => {
    if (value !== "" && !/[\d]/.test(value)) return;

    const newOtp = [...otp];

    // handle paste
    if (value.length > 1) {
      const pastedOtp = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newOtp[i] = pastedOtp[i] || "";
      }
      setOtp(newOtp);

      // Focus the next input, or fallback to the last one
      const lastFilledIndex = pastedOtp.length - 1;
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 0;
      inputRefs.current[focusIndex]?.focus();

      return;
    }

    // handle typing
    newOtp[index] = value;
    setOtp(newOtp);

    // move focus to next
    if (value && index < 6) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key == "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // auto submit when all fields are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== "")) {
      handleEmailVerification(new Event("submit"));
    }
  }, [otp]);

  useEffect(() => {
    const triggerSendVerificationOtp = async () => {
      await sendVerificationOtp();
    };

    triggerSendVerificationOtp();
  }, []);

  useEffect(() => {
    if (user?.isAccountVerified) {
      navigate("/", { replace: true });
    }
  }, [user?.isAccountVerified]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // reset state
      useAuthStore.setState({ error: null });
    }
  }, [error]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>

        <div className="flex items-center justify-center mb-4">
          <span className="text-sm text-gray-200">
            Enter the 6-digit code sent to you email address.
          </span>
        </div>

        <form onSubmit={handleEmailVerification}>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-between gap-4 mb-2">
              {otp.map((digit: string, index: number) => (
                <input
                  key={index}
                  type="text"
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  maxLength={7}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-white text-lg font-bold rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ))}
            </div>
            <FieldError field="otp" errors={errors!} />
          </div>
          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader size={24} className="animate-spin mx-auto" />
            ) : (
              "Verify Email"
            )}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPage;
