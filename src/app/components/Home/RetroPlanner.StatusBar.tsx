import { Heart } from "lucide-react";
import { containerStyles, textStyles, getFontStyle } from "./RetroPlanner.styles";
import type { DisplayDate } from "./RetroPlanner.types";

interface RetroPlannerStatusBarProps {
  displayDate: DisplayDate;
  taskCount: number;
}

export function RetroPlannerStatusBar({ displayDate, taskCount }: RetroPlannerStatusBarProps) {
  return (
    <div className={containerStyles.statusBar} style={{ ...getFontStyle("'Press Start 2P'"), borderTopColor: "#ffffff" }}>
      <div className="flex items-center gap-2">
        <Heart className="w-3 h-3 fill-pink-600 text-pink-600" style={{ imageRendering: "pixelated" }} />
        <span className={textStyles.statusBarText}>PINK PIXEL PLANNER v1.0</span>
      </div>
      <div className={`flex gap-4 ${textStyles.statusBarText}`}>
        <span>{displayDate.full}</span>
        <span>{taskCount} TASKS</span>
      </div>
    </div>
  );
}
