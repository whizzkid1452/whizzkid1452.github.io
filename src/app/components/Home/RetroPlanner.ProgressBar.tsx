import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { taskStyles, textStyles, getProgressPattern, getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerProgressBarProps {
  totalCount: number;
  completedCount: number;
}

export function RetroPlannerProgressBar({ totalCount, completedCount }: RetroPlannerProgressBarProps) {
  if (totalCount === 0) {
    return null;
  }

  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="mt-4 pt-3 border-t-3 border-pink-300">
      <div className="flex items-center justify-between mb-2">
        <span className={textStyles.progressLabel} style={getFontStyle("'DungGeunMo'")}>
          진행률 • Progress
        </span>
        <span className={textStyles.progressPercent} style={getFontStyle("'Press Start 2P'")}>
          {progressPercent}%
        </span>
      </div>
      <div className={taskStyles.progressBar} style={{ imageRendering: "pixelated" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, type: "spring" }}
          className={taskStyles.progressFill}
        >
          {/* Pixel pattern overlay */}
          <div 
            className={taskStyles.progressPattern}
            style={getProgressPattern()}
          />
          {completedCount > 0 && <Heart className="w-4 h-4 text-white fill-white relative z-10" style={{ imageRendering: "pixelated" }} />}
        </motion.div>
      </div>
    </div>
  );
}
