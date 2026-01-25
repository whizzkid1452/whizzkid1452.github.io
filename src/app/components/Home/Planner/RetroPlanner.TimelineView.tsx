import { motion } from "motion/react";
import { Clock, Star } from "lucide-react";
import { useMemo, useRef } from "react";
import { categoryColors } from "./RetroPlanner.constants";
import { getFontStyle } from "./RetroPlanner.styles";
import type { Task } from "./RetroPlanner.types";
import { formatDate } from "./RetroPlanner.utils";

type TimelineStatusStyle = { bg: string; border: string; light: string };

const timelineStatusStyles: Record<"todo" | "inprogress" | "done", TimelineStatusStyle> =
  {
    todo: { bg: "#FF8C42", border: "#FF6B35", light: "#FFE0B2" },
    inprogress: { bg: "#D946EF", border: "#C026D3", light: "#F5D0FE" },
    done: { bg: "#06B6D4", border: "#0891B2", light: "#A5F3FC" },
  };

const priorityColors: Record<Task["priority"], { bg: string; border: string }> = {
  high: { bg: "#FF1493", border: "#C2185B" },
  medium: { bg: "#FF69B4", border: "#FF1493" },
  low: { bg: "#FFB6C1", border: "#FF69B4" },
};

function getTaskTimelineStatus(task: Task): keyof typeof timelineStatusStyles {
  if (task.completed) return "done";
  if (task.priority === "high") return "inprogress";
  return "todo";
}

interface RetroPlannerTimelineViewProps {
  tasks: Task[];
  startDate: Date;
  endDate: Date;
  onTaskUpdate?: (taskId: number, startDate: string, endDate: string) => void;
}

/**
 * 날짜 범위 내의 모든 날짜를 생성
 */
function getDatesInRange(startDate: Date, endDate: Date): Date[] {
  const dates: Date[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return dates;
}

/**
 * 날짜를 픽셀 위치로 변환
 */
function getDatePosition(date: Date, startDate: Date, endDate: Date, totalWidth: number): number {
  const totalDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const daysFromStart = Math.ceil((date.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, Math.min(totalWidth, (daysFromStart / totalDays) * totalWidth));
}

/**
 * 태스크의 시작 위치와 너비 계산 (px)
 */
function getTaskBarPosition(
  task: Task,
  startDate: Date,
  endDate: Date,
  totalWidth: number
): { left: number; width: number } {
  const taskStartDate = task.startDate ? new Date(task.startDate) : new Date(task.date);
  const taskEndDate = task.endDate ? new Date(task.endDate) : new Date(task.date);
  
  // 날짜를 자정으로 정규화
  taskStartDate.setHours(0, 0, 0, 0);
  taskEndDate.setHours(23, 59, 59, 999);
  
  // 범위를 벗어나면 조정
  const actualStartDate = taskStartDate < startDate ? new Date(startDate) : new Date(taskStartDate);
  const actualEndDate = taskEndDate > endDate ? new Date(endDate) : new Date(taskEndDate);
  
  const left = getDatePosition(actualStartDate, startDate, endDate, totalWidth);
  const right = getDatePosition(actualEndDate, startDate, endDate, totalWidth);
  const width = Math.max(right - left, 40); // 최소 너비 40px
  
  return { left, width };
}

export function RetroPlannerTimelineView({
  tasks,
  startDate,
  endDate,
  onTaskUpdate,
}: RetroPlannerTimelineViewProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const dates = useMemo(() => getDatesInRange(startDate, endDate), [startDate, endDate]);
  const dayColumnWidth = dates.length > 14 ? 40 : 80;
  const totalWidth = dates.length * dayColumnWidth;
  
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        const taskStart = task.startDate ? new Date(task.startDate) : new Date(task.date);
        const taskEnd = task.endDate ? new Date(task.endDate) : new Date(task.date);
        return taskStart <= endDate && taskEnd >= startDate;
      })
      .sort((a, b) => {
        // 완료되지 않은 것 우선, 그 다음 priority, 그 다음 id
        if (a.completed !== b.completed) return a.completed ? 1 : -1;
        const priorityOrder: Record<Task["priority"], number> = { high: 0, medium: 1, low: 2 };
        const byPriority = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (byPriority !== 0) return byPriority;
        return a.id - b.id;
      });
  }, [tasks, startDate, endDate]);

  const handleScrollToToday = () => {
    const today = new Date();
    if (!(today >= startDate && today <= endDate)) return;
    const todayPosition = getDatePosition(today, startDate, endDate, totalWidth);
    const container = scrollContainerRef.current;
    if (!container) return;
    const targetLeft = Math.max(0, todayPosition - container.clientWidth / 2);
    container.scrollTo({ left: targetLeft, behavior: "smooth" });
  };

  return (
    <div className="w-full relative" style={{ minWidth: "max-content" }}>
      {/* Floating decorations (레퍼런스 스타일) */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`timeline-star-${i}`}
          className="absolute pointer-events-none z-10"
          style={{
            top: `${15 + i * 18}%`,
            left: i % 2 === 0 ? `${3 + i * 8}%` : "auto",
            right: i % 2 === 0 ? "auto" : `${3 + i * 8}%`,
          }}
          animate={{
            y: [0, -8, 0],
            rotate: [0, 180, 360],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Star
            className="w-3 h-3 fill-yellow-300 text-yellow-400"
            style={{ imageRendering: "pixelated" }}
          />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#f8bbd0] border-4 border-[#FF1493] p-4 relative"
        style={{
          imageRendering: "pixelated",
          boxShadow: "8px 8px 0px 0px rgba(255,20,147,0.3)",
          width: "100%",
          maxWidth: "100%",
        }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4 gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <Clock
              className="w-5 h-5 md:w-6 md:h-6 text-[#FF1493]"
              style={{ imageRendering: "pixelated" }}
            />
            <div>
              <h2
                className="text-[10px] md:text-sm"
                style={{
                  ...getFontStyle("'Press Start 2P'"),
                  color: "#FF1493",
                }}
              >
                TIMELINE GANTT
              </h2>
              <p
                className="text-sm md:text-base mt-1"
                style={{
                  ...getFontStyle("'DungGeunMo'"),
                  color: "#C2185B",
                }}
              >
                타임라인 간트 차트
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleScrollToToday}
              className="px-3 py-2 bg-[#FF1493] border-3 border-[#C2185B] text-white text-[9px] md:text-[10px]"
              style={{
                ...getFontStyle("'Press Start 2P'"),
              }}
            >
              TODAY
            </motion.button>
            <div className="px-2 py-1 bg-white border-3 border-[#FF69B4] text-[9px] md:text-[10px] text-[#C2185B]"
              style={getFontStyle("'Press Start 2P'")}
            >
              {startDate.toLocaleDateString("ko-KR", { month: "short" })} ~{" "}
              {endDate.toLocaleDateString("ko-KR", { month: "short" })}
            </div>
          </div>
        </div>

        {/* Timeline Grid */}
        <div
          ref={scrollContainerRef}
          className="bg-white border-4 border-[#FF1493] overflow-x-auto overflow-y-visible"
          style={{ 
            imageRendering: "pixelated",
            width: "100%",
            maxWidth: "100%",
            WebkitOverflowScrolling: "touch",
            overflowX: "auto",
            overflowY: "visible",
          }}
        >
          <div style={{ width: `${totalWidth + 224}px`, minWidth: `${totalWidth + 224}px` }}>
            {/* Date Header */}
            <div className="flex border-b-3 border-[#FFB6C1] bg-gradient-to-r from-[#FFE4E1] to-[#FFB6C1]">
              {/* Task Name Column */}
              <div
                className="w-56 flex-shrink-0 border-r-3 border-[#FFB6C1] p-2 sticky left-0 bg-[#FFE4E1] z-10"
                style={{ imageRendering: "pixelated" }}
              >
                <p
                  className="text-[9px] md:text-[10px]"
                  style={{
                    ...getFontStyle("'Press Start 2P'"),
                    color: "#FF1493",
                  }}
                >
                  TASK NAME
                </p>
              </div>

              {/* Date Columns */}
              <div className="flex">
                {dates.map((date, index) => {
                  const isToday = formatDate(date) === formatDate(new Date());
                  const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
                  return (
                    <div
                      key={index}
                      className={`border-r border-[#FFB6C1] p-2 text-center ${
                        isToday ? "bg-[#FF69B4]/20" : ""
                      }`}
                      style={{
                        width: `${dayColumnWidth}px`,
                        minWidth: `${dayColumnWidth}px`,
                      }}
                    >
                      <p
                        className="text-[8px] md:text-[9px] mb-1"
                        style={{
                          ...getFontStyle("'Press Start 2P'"),
                          color: isToday ? "#FF1493" : "#C2185B",
                        }}
                      >
                        {date.getDate()}
                      </p>
                      <p
                        className="text-[9px] md:text-[10px]"
                        style={{
                          ...getFontStyle("'DungGeunMo'"),
                          color: isToday ? "#FF1493" : "#666",
                        }}
                      >
                        {weekdays[date.getDay()]}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Task Rows */}
            <div className="relative">
              {visibleTasks.length === 0 ? (
                <div className="p-8 text-center">
                  <p
                    className="text-sm md:text-base"
                    style={{
                      ...getFontStyle("'DungGeunMo'"),
                      color: "#C2185B",
                    }}
                  >
                    이 기간에 표시할 태스크가 없습니다
                  </p>
                </div>
              ) : (
                visibleTasks.map((task, taskIndex) => {
                  const status = getTaskTimelineStatus(task);
                  const statusStyle = timelineStatusStyles[status];
                  const priorityStyle = priorityColors[task.priority];

                  const { left, width } = getTaskBarPosition(task, startDate, endDate, totalWidth);
                  const leftByColumns = Math.round(left / dayColumnWidth) * dayColumnWidth;
                  const widthByColumns = Math.max(
                    dayColumnWidth,
                    Math.round(width / dayColumnWidth) * dayColumnWidth
                  );

                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: taskIndex * 0.05 }}
                      className="flex border-b border-[#FFB6C1] hover:bg-[#FFF0F5] transition-colors relative"
                      style={{ minHeight: "60px" }}
                    >
                      {/* Task Name Column */}
                      <div
                        className="w-56 flex-shrink-0 border-r-3 border-[#FFB6C1] p-2 sticky left-0 bg-white z-10 flex items-center"
                        style={{ imageRendering: "pixelated" }}
                      >
                        <div className="w-full">
                          <div className="flex items-center gap-1 mb-1">
                            <div
                              className="w-2 h-2"
                              style={{
                                backgroundColor: priorityStyle.bg,
                                imageRendering: "pixelated",
                              }}
                            />
                            <p
                              className={`text-[10px] md:text-xs truncate flex-1 ${
                                task.completed ? "line-through opacity-70" : ""
                              }`}
                              style={{
                                ...getFontStyle("'DungGeunMo'"),
                                color: "#333",
                              }}
                              title={task.title}
                            >
                              {task.title}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-2">
                            <span
                              className="text-[9px] text-gray-500 truncate"
                              style={getFontStyle("'DungGeunMo'")}
                              title={task.category}
                            >
                              {task.category}
                            </span>
                            <span
                              className="text-[8px] text-gray-400"
                              style={getFontStyle("'Press Start 2P'")}
                            >
                              {task.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Timeline Bar Area */}
                      <div className="flex-1 relative" style={{ minHeight: "60px" }}>
                        {/* Grid lines */}
                        <div className="absolute inset-0 flex">
                          {dates.map((date, index) => {
                            const isToday = formatDate(date) === formatDate(new Date());
                            return (
                              <div
                                key={index}
                                className={`border-r border-[#FFB6C1]/30 ${
                                  isToday ? "bg-[#FF69B4]/10" : ""
                                }`}
                                style={{
                                  width: `${dayColumnWidth}px`,
                                  minWidth: `${dayColumnWidth}px`,
                                }}
                              />
                            );
                          })}
                        </div>

                        {/* Task Bar */}
                        <motion.div
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: taskIndex * 0.08 }}
                          className="absolute top-1/2 -translate-y-1/2 h-8 border-2 overflow-hidden group"
                          style={{
                            left: `${leftByColumns}px`,
                            width: `${widthByColumns}px`,
                            backgroundColor: statusStyle.light,
                            borderColor: statusStyle.border,
                            borderLeftWidth: "6px",
                            borderLeftColor: statusStyle.bg,
                            imageRendering: "pixelated",
                            cursor: "pointer",
                            opacity: task.completed ? 0.85 : 1,
                          }}
                        >
                          {/* Progress fill for in-progress */}
                          {status === "inprogress" && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: "50%" }}
                              transition={{ duration: 1, delay: taskIndex * 0.08 + 0.2 }}
                              className="absolute inset-0 opacity-40"
                              style={{
                                backgroundColor: statusStyle.bg,
                                imageRendering: "pixelated",
                              }}
                            />
                          )}

                          {/* Done pattern */}
                          {status === "done" && (
                            <div
                              className="absolute inset-0 opacity-20"
                              style={{
                                background: `repeating-linear-gradient(
                                  45deg,
                                  ${statusStyle.bg},
                                  ${statusStyle.bg} 4px,
                                  transparent 4px,
                                  transparent 8px
                                )`,
                                imageRendering: "pixelated",
                              }}
                            />
                          )}

                          {/* Task info */}
                          <div className="relative z-10 h-full flex items-center px-2 gap-2">
                            <div
                              className="px-1.5 py-0.5 text-[7px] md:text-[8px] border whitespace-nowrap"
                              style={{
                                backgroundColor: statusStyle.bg,
                                borderColor: statusStyle.border,
                                color: "white",
                                ...getFontStyle("'Press Start 2P'"),
                              }}
                            >
                              {status === "todo" ? "할일" : status === "inprogress" ? "진행중" : "완료"}
                            </div>

                            {dayColumnWidth === 80 && (
                              <div
                                className="px-1.5 py-0.5 bg-white/80 border text-[7px] md:text-[8px] whitespace-nowrap"
                                style={{
                                  borderColor: statusStyle.border,
                                  ...getFontStyle("'DungGeunMo'"),
                                  color: "#666",
                                }}
                              >
                                {task.category.split(" ")[0]}
                              </div>
                            )}
                          </div>

                          {/* Tooltip */}
                          <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block z-50 pointer-events-none">
                            <div
                              className="bg-white border-3 border-[#FF1493] p-3 shadow-lg whitespace-nowrap"
                              style={{ imageRendering: "pixelated" }}
                            >
                              <p
                                className="text-xs md:text-sm mb-2"
                                style={{
                                  ...getFontStyle("'DungGeunMo'"),
                                  color: "#C2185B",
                                }}
                              >
                                {task.title}
                              </p>
                              <div className="flex items-center gap-2 text-[8px] md:text-[9px]">
                                <span style={getFontStyle("'Press Start 2P'")}>{task.priority.toUpperCase()}</span>
                                <span style={getFontStyle("'DungGeunMo'")}>
                                  {task.startDate && task.endDate
                                    ? `${task.startDate} ~ ${task.endDate}`
                                    : task.date}
                                </span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-3 justify-center">
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-3 border-2"
              style={{
                backgroundColor: timelineStatusStyles.todo.light,
                borderColor: timelineStatusStyles.todo.border,
                borderLeftWidth: "4px",
                borderLeftColor: timelineStatusStyles.todo.bg,
              }}
            />
            <span className="text-[8px] md:text-[9px]" style={getFontStyle("'DungGeunMo'")}>
              할 일
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-3 border-2"
              style={{
                backgroundColor: timelineStatusStyles.inprogress.light,
                borderColor: timelineStatusStyles.inprogress.border,
                borderLeftWidth: "4px",
                borderLeftColor: timelineStatusStyles.inprogress.bg,
              }}
            />
            <span className="text-[8px] md:text-[9px]" style={getFontStyle("'DungGeunMo'")}>
              진행중
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-3 border-2"
              style={{
                backgroundColor: timelineStatusStyles.done.light,
                borderColor: timelineStatusStyles.done.border,
                borderLeftWidth: "4px",
                borderLeftColor: timelineStatusStyles.done.bg,
              }}
            />
            <span className="text-[8px] md:text-[9px]" style={getFontStyle("'DungGeunMo'")}>
              완료
            </span>
          </div>
        </div>

        {/* Category legend (기존 범례 유지) */}
        <div className="mt-3 p-3 bg-white border-3 border-[#FF1493]" style={{ imageRendering: "pixelated" }}>
          <div className="text-xs mb-2 text-[#C2185B]" style={getFontStyle("'DungGeunMo'")}>
            카테고리 • Category
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.keys(categoryColors).map((category) => (
              <div key={category} className="flex items-center gap-1">
                <div className={`w-4 h-4 border-2 border-[#FF1493] ${categoryColors[category]}`} />
                <span className="text-[10px] text-[#4a0066]" style={getFontStyle("'DungGeunMo'")}>
                  {category.split(" ")[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
