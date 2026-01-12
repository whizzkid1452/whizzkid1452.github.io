import { motion } from "motion/react";
import { Image as ImageIcon, X, Minimize2, Maximize2 } from "lucide-react";
import { containerStyles, buttonStyles, textStyles, getWindowBorderStyle, getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerTitleBarProps {
  isMinimized: boolean;
  onToggleMinimize: () => void;
}

export function RetroPlannerTitleBar({ isMinimized, onToggleMinimize }: RetroPlannerTitleBarProps) {
  return (
    <div className={containerStyles.titleBar}>
      <div className="flex items-center gap-2">
        <ImageIcon className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
        <span className={textStyles.title} style={getFontStyle("'Press Start 2P'")}>
          PINK PLANNER.EXE
        </span>
      </div>
      <div className="flex items-center gap-1">
        <motion.button
          whileHover={{ backgroundColor: "#ff69b4" }}
          whileTap={{ scale: 0.9 }}
          onClick={onToggleMinimize}
          className={buttonStyles.windowControl}
          style={getWindowBorderStyle()}
        >
          <Minimize2 className="w-3 h-3" />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#ff69b4" }}
          className={buttonStyles.windowControl}
          style={getWindowBorderStyle()}
        >
          <Maximize2 className="w-3 h-3" />
        </motion.button>
        <motion.button
          whileHover={{ backgroundColor: "#ff1493" }}
          className={buttonStyles.windowControl}
          style={getWindowBorderStyle()}
        >
          <X className="w-3 h-3" />
        </motion.button>
      </div>
    </div>
  );
}
