import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { containerStyles, buttonStyles, getFontStyle } from "./RetroPlanner.styles";
import type { DisplayDate, MonthDisplay } from "./RetroPlanner.types";
import { RetroPlannerDatePicker } from "./RetroPlanner.DatePicker";
import { categoryColors } from "./RetroPlanner.constants";

interface RetroPlannerMenuBarProps {
  viewMode: "today" | "week" | "month" | "timeline";
  onViewModeChange: (mode: "today" | "week" | "month" | "timeline") => void;
  displayDate: DisplayDate;
  monthDisplay: MonthDisplay;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onToday: () => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function RetroPlannerMenuBar({ 
  viewMode, 
  onViewModeChange, 
  displayDate, 
  monthDisplay, 
  selectedDate, 
  onDateChange, 
  onToday,
  selectedCategory,
  onCategoryChange,
}: RetroPlannerMenuBarProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const menuBarRef = useRef<HTMLDivElement>(null);
  
  const categories = [
    "업무 Work",
    "공부 Study",
    "개인 Personal",
    "운동 Exercise",
    "기타 Other",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(event.target as Node)) {
        setShowDatePicker(false);
        setShowCategoryFilter(false);
      }
    };

    if (showDatePicker || showCategoryFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDatePicker, showCategoryFilter]);

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
      
      <motion.button
        whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
        onClick={() => onViewModeChange("timeline")}
        className={buttonStyles.menuItem}
        style={viewMode === "timeline" ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
      >
        Timeline
      </motion.button>
      
      {/* Category Filter */}
      <div className="relative">
        <motion.button
          whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          className={buttonStyles.menuItem}
          style={selectedCategory ? { backgroundColor: "#FFB6C1", color: "#C2185B" } : {}}
        >
          {selectedCategory ? selectedCategory.split(" ")[0] : "Category"}
        </motion.button>
        
        {showCategoryFilter && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-1 bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] z-50 min-w-[150px]"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            <motion.button
              whileHover={{ backgroundColor: "#f0f0f0" }}
              onClick={() => {
                onCategoryChange(null);
                setShowCategoryFilter(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs border-b-2 border-gray-200 ${
                selectedCategory === null ? "bg-[#FFB6C1]" : ""
              }`}
            >
              전체 • All
            </motion.button>
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ backgroundColor: "#f0f0f0" }}
                onClick={() => {
                  onCategoryChange(category);
                  setShowCategoryFilter(false);
                }}
                className={`w-full text-left px-3 py-2 text-xs border-b-2 border-gray-200 flex items-center gap-2 ${
                  selectedCategory === category ? "bg-[#FFB6C1]" : ""
                }`}
              >
                <span
                  className={`w-3 h-3 border-2 border-black ${categoryColors[category] || categoryColors["기타 Other"]}`}
                />
                {category.split(" ")[0]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </div>
      
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
