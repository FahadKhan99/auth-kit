import { motion } from "framer-motion";

interface Props {
  color: string;
  delay: number;
  left: string;
  top: string;
  size: string;
}

// const FloatingShapes = ({ color, delay, left, top, size }: Props) => {
//   return (
//     <motion.div
//       className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
//       style={{ top, left }}
//       animate={{
//         y: ["0%", "100%", "0%"],
//         x: ["0%", "100%", "0%"],
//         rotate: [0, 360],
//       }}
//       transition={{
//         duration: 20,
//         ease: "linear",
//         repeat: Infinity,
//         delay,
//       }}
//       aria-hidden="true"
//     />
//   );
// };

const FloatingShapes = ({ color, delay, left, top, size }: Props) => {
  return (
    <motion.div
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`}
      style={{ top, left }}
      animate={{
        y: ["0%", "50%", "0%", "60%", "0%"], // Move vertically in a more natural drift pattern
        x: ["0%", "-50%", "50%", "-30%", "0%"], // Randomize horizontal movement for drifting effect
        rotate: [0, 360], // Full rotation
        scale: [1, 1.2, 1], // Slightly grow and shrink for dynamic effect
        opacity: [0.2, 0.6, 0.2], // Fade in and out to create a more organic look
      }}
      transition={{
        duration: 25, // Increased duration for smoother floating effect
        ease: "easeInOut", // Easing for a more natural movement
        repeat: Infinity, // Infinite looping
        delay, // Delay based on prop
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShapes;
