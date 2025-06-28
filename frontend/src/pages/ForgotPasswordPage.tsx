import { motion } from "framer-motion";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import MailAnimation from "../components/MailAnimation";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { isLoading, forgotPassword, error, errors } = useAuthStore();

  const handleSendLink = async (e: any) => {
    e.preventDefault();
    try {
      const success = await forgotPassword(email);

      if (success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.log("Error in handleSendLink: ", error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);

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
          Forgot Password
        </h2>

        {!isSubmitted ? (
          <form onSubmit={handleSendLink}>
            <p className="text-gray-300 text-center">
              Enter you email address and we'll send you a link to reset your
              password.
            </p>

            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              field="email"
              errors={errors!}
            />

            <motion.button
              className="mt-6 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
            >
              {isLoading ? (
                <Loader size={24} className="mx-auto animate-spin" />
              ) : (
                "Send Reset Link"
              )}
            </motion.button>
          </form>
        ) : (
          <div className="text-center">
            <MailAnimation />

            <p className="text-gray-300">
              If an account exists for {email}, you will receive a password
              reset link shortly.
            </p>
          </div>
        )}
      </div>

      <div className="px-8 py-4 bg-gray-900 bg-opacity-70 flex justify-center items-center">
        <p className="text-sm text-gray-400 ">
          <Link
            to={"/login"}
            className="text-green-400 hover:underline flex gap-1 items-center"
          >
            <ArrowLeft size={17} className="text-green-400" />
            Back to Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
