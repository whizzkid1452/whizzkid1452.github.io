import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { calendarStyles, tooltipStyles, getMonthDayStyle, getTaskPriorityStyle, getFontStyle } from "./RetroPlanner.styles";
import { weekdays } from "./RetroPlanner.constants";
import type { MonthDate, Task } from "./RetroPlanner.types";

interface RetroPlannerMonthViewProps {
  monthDates: MonthDate[];
  tasks: Task[];
  hoveredDate: string | null;
  onDateChange: (date: Date) => void;
  onHoverDate: (dateStr: string | null) => void;
  onShowTaskDetail: () => void;
}

export function RetroPlannerMonthView({
  monthDates,
  tasks,
  hoveredDate,
  onDateChange,
  onHoverDate,
  onShowTaskDetail,
}: RetroPlannerMonthViewProps) {
  return (
    <div className={calendarStyles.monthView}>
      <div className={calendarStyles.monthHeader}>
        {weekdays.map((day, i) => (
          <div
            key={i}
            className={`p-1 text-center text-[10px] bg-[#FFB6C1] border-2 border-[#FF1493] ${
              i === 0 ? "text-red-600" : i === 6 ? "text-blue-600" : "text-[#C2185B]"
            }`}
            style={{ ...getFontStyle("'DungGeunMo'"), imageRendering: "pixelated" }}
          >
            {day}
          </div>
        ))}
      </div>
      <div className={calendarStyles.monthGrid}>
        {monthDates.map((day, index) => {
          const dayTasks = tasks.filter((t) => t.date === day.dateStr).sort((a, b) => a.time.localeCompare(b.time));
          return (
            <div key={index} className="relative">
              <motion.button
                whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (day.isCurrentMonth) {
                    onDateChange(day.date);
                    if (dayTasks.length > 0) {
                      onShowTaskDetail();
                    }
                  }
                }}
                onMouseEnter={() => day.isCurrentMonth && onHoverDate(day.dateStr)}
                onMouseLeave={() => onHoverDate(null)}
                className={`${calendarStyles.monthDay} ${getMonthDayStyle(day)}`}
                style={{ imageRendering: "pixelated" }}
                disabled={!day.isCurrentMonth}
              >
                <div className="flex flex-col items-start justify-start h-full overflow-hidden">
                  <div
                    className={`text-[9px] mb-0.5 ${
                      day.isSelected && day.isCurrentMonth
                        ? "text-white"
                        : !day.isCurrentMonth
                        ? "text-gray-400"
                        : index % 7 === 0
                        ? "text-red-500"
                        : index % 7 === 6
                        ? "text-blue-500"
                        : "text-[#C2185B]"
                    }`}
                    style={getFontStyle("'Press Start 2P'")}
                  >
                    {day.day}
                  </div>
                  
                  {/* Show mini task list */}
                  {day.isCurrentMonth && dayTasks.length > 0 && (
                    <div className="w-full space-y-0.5 mt-1">
                      {dayTasks.slice(0, 2).map((task) => (
                        <div
                          key={task.id}
                          className={`text-[6px] px-1 py-0.5 truncate border ${getTaskPriorityStyle(task.priority, task.completed)} ${day.isSelected ? "opacity-90" : ""}`}
                          style={{ ...getFontStyle("'DungGeunMo'"), imageRendering: "pixelated" }}
                          title={task.title}
                        >
                          {task.time} {task.title.length > 8 ? task.title.substring(0, 8) + "..." : task.title}
                        </div>
                      ))}
                      {dayTasks.length > 2 && (
                        <div
                          className={`text-[6px] px-1 text-center ${
                            day.isSelected ? "text-white" : "text-[#FF1493]"
                          }`}
                          style={getFontStyle("'Press Start 2P'")}
                        >
                          +{dayTasks.length - 2}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>

              {/* Hover Tooltip */}
              <AnimatePresence>
                {hoveredDate === day.dateStr && dayTasks.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={tooltipStyles.hoverTooltip}
                    style={{ imageRendering: "pixelated", pointerEvents: "none" }}
                  >
                    <div className={tooltipStyles.tooltipContent}>
                      {dayTasks.map((task) => (
                        <div
                          key={task.id}
                          className="flex items-start gap-2"
                        >
                          {task.completed ? (
                            <CheckCircle2 className="w-3 h-3 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : task.priority === "high" ? (
                            <div className="w-3 h-3 rounded-full bg-red-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                          ) : task.priority === "medium" ? (
                            <div className="w-3 h-3 rounded-full bg-yellow-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                          ) : (
                            <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0 mt-0.5" style={{ imageRendering: "pixelated" }} />
                          )}
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-[10px] ${task.completed ? "line-through text-gray-500" : "text-gray-800"} truncate`}
                              style={getFontStyle("'DungGeunMo'")}
                            >
                              <span className="text-[#FF1493]" style={getFontStyle("'Press Start 2P'")}>
                                {task.time}
                              </span>
                              {" "}{task.title}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
