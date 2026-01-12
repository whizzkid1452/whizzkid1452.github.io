import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, List, Grid3x3 } from "lucide-react";
import { calendarStyles, buttonStyles, textStyles, borderStyles, getFontStyle, getViewModeButtonStyle } from "./RetroPlanner.styles";
import type { DisplayDate, MonthDisplay } from "./RetroPlanner.types";

interface RetroPlannerDateNavigatorProps {
  viewMode: "week" | "month";
  displayDate: DisplayDate;
  monthDisplay: MonthDisplay;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onToday: () => void;
  onViewModeChange: (mode: "week" | "month") => void;
}

export function RetroPlannerDateNavigator({
  viewMode,
  displayDate,
  monthDisplay,
  onPrevPeriod,
  onNextPeriod,
  onToday,
  onViewModeChange,
}: RetroPlannerDateNavigatorProps) {
  return (
    <div className={calendarStyles.dateNavigator}>
      <div className={calendarStyles.dateNavigatorBox} style={{ imageRendering: "pixelated" }}>
        <div className="flex items-center justify-between mb-3">
          <motion.button
            whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
            whileTap={{ scale: 0.9 }}
            onClick={onPrevPeriod}
            className={buttonStyles.navButton}
            style={borderStyles.pinkBorder}
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </motion.button>

          <div className="text-center">
            <p
              className={textStyles.dateDisplay}
              style={getFontStyle("'Press Start 2P'")}
            >
              {viewMode === "week" ? displayDate.full : monthDisplay.full}
            </p>
            <p
              className={textStyles.dateSubtext}
              style={getFontStyle("'DungGeunMo'")}
            >
              {viewMode === "week" ? `${displayDate.weekdayKo}요일 • ${displayDate.weekdayEn}` : `${monthDisplay.monthKo} • ${monthDisplay.monthEn}`}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
            whileTap={{ scale: 0.9 }}
            onClick={onNextPeriod}
            className={buttonStyles.navButton}
            style={borderStyles.pinkBorder}
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        <div className="grid grid-cols-3 gap-1">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToday}
            className={buttonStyles.todayButton}
            style={getFontStyle("'Press Start 2P'")}
          >
            TODAY
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewModeChange("week")}
            className={`${buttonStyles.viewModeButton} ${getViewModeButtonStyle(viewMode === "week")}`}
            style={getFontStyle("'Press Start 2P'")}
          >
            <List className="w-3 h-3" />
            WEEK
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onViewModeChange("month")}
            className={`${buttonStyles.viewModeButton} ${getViewModeButtonStyle(viewMode === "month")}`}
            style={getFontStyle("'Press Start 2P'")}
          >
            <Grid3x3 className="w-3 h-3" />
            MONTH
          </motion.button>
        </div>
      </div>
    </div>
  );
}
