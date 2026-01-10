import { motion } from "motion/react";

export function PixelBackground() {
  const pixels = Array.from({ length: 50 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pixels.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 md:w-3 md:h-3 opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: [
              "#ff69b4",
              "#e91e63",
              "#9c27b0",
              "#00bcd4",
              "#ffeb3b"
            ][Math.floor(Math.random() * 5)],
            imageRendering: "pixelated",
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}
