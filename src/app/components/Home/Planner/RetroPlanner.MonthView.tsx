import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import { calendarStyles, tooltipStyles, getMonthDayStyle, getTaskPriorityStyle, getFontStyle } from "./RetroPlanner.styles";
import { weekdays } from "./RetroPlanner.constants";
import type { MonthDate, Task } from "./RetroPlanner.types";

interface RetroPlannerMonthViewProps {
  monthDates: MonthDate[];
  tasks: Task[];
  hoveredDate: string | null;
  onDateChange: (date: Date) => void;
  onHoverDate: (dateStr: string | null) => void;
}

export function RetroPlannerMonthView({
  monthDates,
  tasks,
  hoveredDate,
  onDateChange,
  onHoverDate,
}: RetroPlannerMonthViewProps) {
  const hoveredDayRef = useRef<{ [key: string]: HTMLDivElement | null }>({});

  return (
    <div className={calendarStyles.monthView} style={{ position: "relative", zIndex: 1 }}>
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
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const dayTasks = tasks.filter((t) => t.date === day.dateStr).sort((a, b) => {
            if (a.completed !== b.completed) {
              return a.completed ? 1 : -1;
            }
            if (a.priority !== b.priority) {
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return a.time.localeCompare(b.time);
          });
          return (
            <div 
              key={index} 
              className="relative z-0"
              ref={(el) => {
                if (el) {
                  hoveredDayRef.current[day.dateStr] = el;
                }
              }}
            >
              <motion.button
                whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (day.isCurrentMonth) {
                    onDateChange(day.date);
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
                  {day.isCurrentMonth && dayTasks.length > 0 && (
                    <div className="w-full space-y-0.5 mt-1">
                      {dayTasks.slice(0, 4).map((task) => {
                        return (
                          <div
                            key={task.id}
                            className={`text-[8px] px-1 py-0.5 truncate border ${getTaskPriorityStyle(task.priority, task.completed)} ${day.isSelected ? "opacity-90" : ""}`}
                            style={{ ...getFontStyle("'DungGeunMo'"), imageRendering: "pixelated" }}
                            title={task.title}
                          >
                            <span className="truncate">
                              {task.time} {task.title.length > 10 ? task.title.substring(0, 10) + "..." : task.title}
                            </span>
                          </div>
                        );
                      })}
                      {dayTasks.length > 4 && (
                        <div
                          className={`text-[8px] px-1 text-center ${
                            day.isSelected ? "text-white" : "text-[#FF1493]"
                          }`}
                          style={getFontStyle("'Press Start 2P'")}
                        >
                          +{dayTasks.length - 4}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </motion.button>

            </div>
          );
        })}
      </div>
      
      <AnimatePresence>
        {hoveredDate && hoveredDayRef.current[hoveredDate] && (() => {
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          const dayTasks = tasks.filter((t) => t.date === hoveredDate).sort((a, b) => {
            if (a.completed !== b.completed) {
              return a.completed ? 1 : -1;
            }
            if (a.priority !== b.priority) {
              return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return a.time.localeCompare(b.time);
          });
          if (dayTasks.length === 0) return null;
          
          const rect = hoveredDayRef.current[hoveredDate]!.getBoundingClientRect();
          const tooltipTop = rect.top - 10;
          const tooltipLeft = rect.left + rect.width / 2;
          
          return (
            <motion.div
              key={hoveredDate}
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.2 }}
              className={tooltipStyles.hoverTooltip}
              style={{ 
                imageRendering: "pixelated", 
                pointerEvents: "none",
                top: `${tooltipTop}px`,
                left: `${tooltipLeft}px`,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div className={tooltipStyles.tooltipContent}>
                {dayTasks.map((task) => {
                  return (
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
                          className={`text-[10px] ${
                            task.completed 
                              ? "line-through text-gray-500" 
                              : "text-gray-800"
                          } truncate`}
                          style={getFontStyle("'DungGeunMo'")}
                        >
                          <span className="text-[#FF1493]" style={getFontStyle("'Press Start 2P'")}>
                            {task.time}
                          </span>
                          {" "}{task.title}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
