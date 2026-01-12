import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { RetroPlannerEditor } from "./RetroPlannerEditor";
import type { Task } from "./RetroPlanner.types";
import { tasksPerPage } from "./RetroPlanner.constants";
import {
  formatDate,
  formatDisplayDate,
  getWeekDates,
  getMonthDates,
  getMonthYearDisplay,
} from "./RetroPlanner.utils";
import {
  containerStyles,
  getWindowBorderStyle,
  getCanvasGradient,
  getPixelGridPattern,
  decorationStyles,
} from "./RetroPlanner.styles";
import { RetroPlannerFloatingDecorations } from "./RetroPlanner.FloatingDecorations";
import { RetroPlannerTitleBar } from "./RetroPlanner.TitleBar";
import { RetroPlannerMenuBar } from "./RetroPlanner.MenuBar";
import { RetroPlannerToolbox } from "./RetroPlanner.Toolbox";
import { RetroPlannerCanvasDecorations } from "./RetroPlanner.CanvasDecorations";
import { RetroPlannerDateNavigator } from "./RetroPlanner.DateNavigator";
import { RetroPlannerWeekView } from "./RetroPlanner.WeekView";
import { RetroPlannerMonthView } from "./RetroPlanner.MonthView";
import { RetroPlannerStats } from "./RetroPlanner.Stats";
import { RetroPlannerTaskList } from "./RetroPlanner.TaskList";
import { RetroPlannerPagination } from "./RetroPlanner.Pagination";
import { RetroPlannerProgressBar } from "./RetroPlanner.ProgressBar";
import { RetroPlannerColorPalette } from "./RetroPlanner.ColorPalette";
import { RetroPlannerStatusBar } from "./RetroPlanner.StatusBar";

export function RetroPlanner() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "픽셀 아트 작업 완료하기 • Complete pixel art work",
      time: "09:00",
      category: "업무 Work",
      priority: "high",
      completed: false,
      date: "2026-01-02",
    },
    {
      id: 2,
      title: "React 공부하기 • Study React",
      time: "14:00",
      category: "공부 Study",
      priority: "medium",
      completed: false,
      date: "2026-01-02",
    },
    {
      id: 3,
      title: "운동 30분 • Exercise 30min",
      time: "18:00",
      category: "운동 Exercise",
      priority: "medium",
      completed: true,
      date: "2026-01-02",
    },
    {
      id: 4,
      title: "일기 쓰기 • Write diary",
      time: "21:00",
      category: "개인 Personal",
      priority: "low",
      completed: false,
      date: "2026-01-02",
    },
  ]);


  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleSaveTask = (taskData: {
    title: string;
    time: string;
    category: string;
    priority: "high" | "medium" | "low";
  }) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      date: formatDate(selectedDate),
    };
    setTasks([...tasks, newTask]);
    setCurrentPage(1); // Reset to first page when adding new task
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectedDateStr = formatDate(selectedDate);
  const todayTasks = tasks.filter((task) => task.date === selectedDateStr);
  const sortedTasks = todayTasks.sort((a, b) => a.time.localeCompare(b.time));
  const completedCount = todayTasks.filter((task) => task.completed).length;
  const totalCount = todayTasks.length;
  const displayDate = formatDisplayDate(selectedDate);

  // Pagination
  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Reset to first page when date changes
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

  const weekDates = getWeekDates(selectedDate, tasks, selectedDateStr);

  const monthDates = getMonthDates(selectedDate, tasks, selectedDateStr);

  const handlePrevPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    handleDateChange(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    handleDateChange(newDate);
  };

  const monthDisplay = getMonthYearDisplay(selectedDate);

  return (
    <div className={containerStyles.wrapper}>
      <RetroPlannerFloatingDecorations />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={containerStyles.mainContainer}
        style={getWindowBorderStyle()}
      >
        <RetroPlannerTitleBar
          isMinimized={isMinimized}
          onToggleMinimize={() => setIsMinimized(!isMinimized)}
        />

        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <RetroPlannerMenuBar />

              <div className="flex">
                <RetroPlannerToolbox onAddTask={() => setShowEditor(true)} />

                <div className={containerStyles.canvas}>
                  <div className={containerStyles.canvasArea} style={{ borderColor: "#808080" }}>
                    <div 
                      className="w-full h-full relative"
                      style={getCanvasGradient()}
                    >
                      <div 
                        className={decorationStyles.pixelGrid}
                        style={getPixelGridPattern()}
                      />

                      <RetroPlannerCanvasDecorations />

                      <div className="relative z-10 p-4 min-h-[400px]">
                        <RetroPlannerDateNavigator
                          viewMode={viewMode}
                          displayDate={displayDate}
                          monthDisplay={monthDisplay}
                          onPrevPeriod={handlePrevPeriod}
                          onNextPeriod={handleNextPeriod}
                          onToday={handleToday}
                          onViewModeChange={setViewMode}
                        />

                        {viewMode === "week" && (
                          <RetroPlannerWeekView
                            weekDates={weekDates}
                            onDateChange={handleDateChange}
                          />
                        )}

                        {viewMode === "month" && (
                          <RetroPlannerMonthView
                            monthDates={monthDates}
                            tasks={tasks}
                            hoveredDate={hoveredDate}
                            onDateChange={handleDateChange}
                            onHoverDate={setHoveredDate}
                            onShowTaskDetail={() => {}}
                          />
                        )}

                        <RetroPlannerStats
                          totalCount={totalCount}
                          completedCount={completedCount}
                        />

                        <RetroPlannerTaskList
                          tasks={currentTasks}
                          onToggleTask={handleToggleTask}
                          onDeleteTask={handleDeleteTask}
                        />

                        <RetroPlannerPagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPrevPage={handlePrevPage}
                          onNextPage={handleNextPage}
                        />

                        <RetroPlannerProgressBar
                          totalCount={totalCount}
                          completedCount={completedCount}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <RetroPlannerColorPalette />

        <RetroPlannerStatusBar
          displayDate={displayDate}
          taskCount={todayTasks.length}
        />
      </motion.div>

      {/* Editor Modal */}
      <AnimatePresence>
        {showEditor && (
          <RetroPlannerEditor onClose={() => setShowEditor(false)} onSave={handleSaveTask} />
        )}
      </AnimatePresence>
    </div>
  );
}