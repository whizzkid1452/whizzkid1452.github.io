import { motion } from "motion/react";
import { Heart, Star } from "lucide-react";
import { decorationStyles } from "./RetroPlanner.styles";

export function RetroPlannerCanvasDecorations() {
  return (
    <>
      {/* Floating pixel hearts in canvas */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`canvas-heart-${i}`}
          className={decorationStyles.canvasHeart}
          style={{
            top: `${5 + (i * 6)}%`,
            left: `${3 + (i * 7)}%`,
          }}
          animate={{
            y: [0, -15, 0],
            x: [0, Math.sin(i) * 10, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + (i % 4),
            repeat: Infinity,
            delay: i * 0.15,
          }}
        >
          <Heart className="w-4 h-4 md:w-6 md:h-6 fill-white/60 text-white/80" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      {/* Pixel stars decoration */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`canvas-star-${i}`}
          className={decorationStyles.canvasStar}
          style={{
            top: `${10 + (i * 9)}%`,
            right: `${5 + (i * 8)}%`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.2, 1, 0.2],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-200 text-yellow-300" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}
    </>
  );
}
