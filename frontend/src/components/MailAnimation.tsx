import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const MailAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="relative w-32 h-32 flex items-center justify-center mx-auto mb-4"
    >
      {/* Outer Layer - Darker green with opacity */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 15, -15, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 3,
          ease: "easeInOut",
        }}
        className="absolute w-32 h-32 rounded-full bg-green-800/40 blur-sm"
      />

      {/* Middle Layer - Medium green with opacity */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, -10, 10, 0],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2.5,
          ease: "easeInOut",
        }}
        className="absolute w-24 h-24 rounded-full bg-green-600/50 blur-sm"
      />

      {/* Inner Layer - Bright green */}
      <motion.div
        animate={{
          y: [0, -5, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 2,
          ease: "easeInOut",
        }}
        className="absolute w-16 h-16 rounded-full bg-green-500 flex items-center justify-center shadow-lg"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.8,
            ease: "easeInOut",
          }}
        >
          <Mail className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MailAnimation;
