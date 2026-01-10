import { motion } from "motion/react";
import { ReactNode } from "react";

interface Y2KTextBoxProps {
  children: ReactNode;
  variant?: "pink" | "purple" | "white" | "gradient";
  rotation?: number;
  className?: string;
}

export function Y2KTextBox({ 
  children, 
  variant = "pink", 
  rotation = 0,
  className = "" 
}: Y2KTextBoxProps) {
  const variantStyles = {
    pink: "bg-gradient-to-br from-pink-200 to-pink-300 border-pink-400",
    purple: "bg-gradient-to-br from-purple-200 to-purple-300 border-purple-400",
    white: "bg-white/90 border-gray-300",
    gradient: "bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 border-pink-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: rotation }}
      whileHover={{ scale: 1.05, rotate: rotation + 2 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`
        ${variantStyles[variant]}
        border-4 border-dashed
        shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]
        p-4
        ${className}
      `}
      style={{
        backdropFilter: "blur(8px)",
      }}
    >
      {children}
    </motion.div>
  );
}
