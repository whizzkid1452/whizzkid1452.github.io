import { motion } from "motion/react";
import { Heart, Sparkles } from "lucide-react";
import { decorationStyles } from "./RetroPlanner.styles";

export function RetroPlannerFloatingDecorations() {
  return (
    <>
      {/* Floating pixel hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-deco-${i}`}
          className={decorationStyles.floatingHeart}
          style={{
            top: `${10 + (i * 10)}%`,
            left: i % 2 === 0 ? "auto" : `${5 + (i * 3)}%`,
            right: i % 2 === 0 ? `${5 + (i * 3)}%` : "auto",
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart className="w-3 h-3 md:w-4 md:h-4 fill-pink-400 text-pink-500 drop-shadow-[0_2px_4px_rgba(236,72,153,0.5)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      {/* Floating pixel stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-deco-${i}`}
          className={decorationStyles.floatingStar}
          style={{
            top: `${15 + (i * 15)}%`,
            left: `${10 + (i * 15)}%`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}
    </>
  );
}
