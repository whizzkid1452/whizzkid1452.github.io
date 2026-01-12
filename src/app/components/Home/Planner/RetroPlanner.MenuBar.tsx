import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { containerStyles, buttonStyles, getFontStyle } from "./RetroPlanner.styles";
import type { DisplayDate, MonthDisplay } from "./RetroPlanner.types";
import { RetroPlannerDatePicker } from "./RetroPlanner.DatePicker";

interface RetroPlannerMenuBarProps {
  viewMode: "today" | "week" | "month";
  onViewModeChange: (mode: "today" | "week" | "month") => void;
  displayDate: DisplayDate;
  monthDisplay: MonthDisplay;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onToday: () => void;
}

export function RetroPlannerMenuBar({ viewMode, onViewModeChange, displayDate, monthDisplay, selectedDate, onDateChange, onToday }: RetroPlannerMenuBarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
      }
    };

    if (showDatePicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker]);

  return (
    <>
      <div ref={menuBarRef} className={`${containerStyles.menuBar} relative`} style={{ ...getFontStyle("'Press Start 2P'"), borderBottomColor: "#808080" }}>
        <motion.button
          whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
          onClick={() => setShowDatePicker(!showDatePicker)}
          className={buttonStyles.menuItem}
        >
          {displayDate.full} {displayDate.weekdayEn}
        </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => {
          onToday();
          onViewModeChange("week");
        }}
        className={buttonStyles.menuItem}
        style={viewMode === "week" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Today
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("week")}
        className={buttonStyles.menuItem}
        style={viewMode === "week" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Week
      </motion.button>
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("month")}
        className={buttonStyles.menuItem}
        style={viewMode === "month" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Month
      </motion.button>
        {showDatePicker && (
          <RetroPlannerDatePicker
            selectedDate={selectedDate}
            onDateSelect={(date) => {
              onDateChange(date);
              setShowDatePicker(false);
            }}
            onClose={() => setShowDatePicker(false)}
          />
        )}
      </div>
    </>
  );
}
