import { motion } from "motion/react";
import { calendarStyles, textStyles, getWeekDayStyle, getFontStyle } from "./RetroPlanner.styles";
import type { WeekDate } from "./RetroPlanner.types";

interface RetroPlannerWeekViewProps {
  weekDates: WeekDate[];
  onDateChange: (date: Date) => void;
}

export function RetroPlannerWeekView({ weekDates, onDateChange }: RetroPlannerWeekViewProps) {
  return (
    <div className={calendarStyles.weekView}>
      {weekDates.map((day, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDateChange(day.date)}
          className={`p-2 border-3 transition-colors ${getWeekDayStyle(day)}`}
          style={{ imageRendering: "pixelated" }}
        >
          <div
            className={`text-[10px] mb-1 ${day.isSelected ? "text-white" : "text-[#C2185B]"}`}
            style={getFontStyle("'Press Start 2P'")}
          >
            {day.day}
          </div>
          {day.taskCount > 0 && (
            <div className="flex justify-center">
              <div
                className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 ${
                  day.isSelected
                    ? "bg-white text-[#FF1493] border-white"
                    : "bg-[#FF69B4] text-white border-[#FF1493]"
                }`}
                style={{ imageRendering: "pixelated" }}
              >
                <span className="text-[8px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                  {day.taskCount}
                </span>
              </div>
            </div>
          )}
        </motion.button>
      ))}
    </div>
  );
}
