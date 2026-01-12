import { motion, AnimatePresence } from "motion/react";
import { RetroPlannerEditor } from "./RetroPlannerEditor";
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
import { useRetroPlanner } from "./useRetroPlanner";

export function RetroPlanner() {
  const {
    showEditor,
    setShowEditor,
    viewMode,
    setViewMode,
    plannerMode,
    setPlannerMode,
    currentPage,
    isMinimized,
    setIsMinimized,
    hoveredDate,
    setHoveredDate,
    tasks,
    currentTasks,
    completedCount,
    totalCount,
    displayDate,
    totalPages,
    weekDates,
    monthDates,
    monthDisplay,
    handleToday,
    handleSaveTask,
    handleToggleTask,
    handleDeleteTask,
    handlePrevPage,
    handleNextPage,
    handleDateChange,
    handlePrevPeriod,
    handleNextPeriod,
    todayTasks,
  } = useRetroPlanner();

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
                <RetroPlannerToolbox 
                  onAddTask={() => setShowEditor(true)}
                  plannerMode={plannerMode}
                  onPlannerModeChange={setPlannerMode}
                />

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