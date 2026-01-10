import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function FloatingHearts() {
  const hearts = Array.from({ length: 8 });

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            bottom: "-50px",
          }}
          animate={{
            y: [0, -1000],
            x: [0, Math.sin(i) * 50],
            rotate: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "linear",
          }}
        >
          <Heart 
            className="w-4 h-4 md:w-6 md:h-6 text-pink-400 fill-pink-400" 
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
