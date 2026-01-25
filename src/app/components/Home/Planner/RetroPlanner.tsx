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
import { RetroPlannerWeekView } from "./RetroPlanner.WeekView";
import { RetroPlannerMonthView } from "./RetroPlanner.MonthView";
import { RetroPlannerTimelineView } from "./RetroPlanner.TimelineView";
import { RetroPlannerStats } from "./RetroPlanner.Stats";
import { RetroPlannerTaskList } from "./RetroPlanner.TaskList";
import { RetroPlannerPagination } from "./RetroPlanner.Pagination";
import { RetroPlannerProgressBar } from "./RetroPlanner.ProgressBar";
import { RetroPlannerColorPalette } from "./RetroPlanner.ColorPalette";
import { RetroPlannerStatusBar } from "./RetroPlanner.StatusBar";
import { RetroPlannerCategoryStats } from "./RetroPlanner.CategoryStats";
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
    selectedCategory,
    setSelectedCategory,
    tasks,
    currentTasks,
    completedCount,
    totalCount,
    displayDate,
    totalPages,
    weekDates,
    monthDates,
    monthDisplay,
    selectedDate,
    handleToday,
    handleSaveTask,
    handleToggleTask,
    handleDeleteTask,
    handleTimeUpdate,
    handlePrevPage,
    handleNextPage,
    handleDateChange,
    handlePrevPeriod,
    handleNextPeriod,
    todayTasks,
  } = useRetroPlanner();

  return (
    <div className={`${containerStyles.wrapper} ${viewMode === "timeline" ? "overflow-x-auto" : ""}`}>
      <RetroPlannerFloatingDecorations />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`${containerStyles.mainContainer} ${viewMode === "timeline" ? "overflow-x-visible" : ""}`}
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
              <RetroPlannerMenuBar 
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                displayDate={displayDate}
                monthDisplay={monthDisplay}
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
                onToday={handleToday}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <div className={`flex ${viewMode === "timeline" ? "overflow-x-visible" : ""}`}>
                <RetroPlannerToolbox 
                  onAddTask={() => setShowEditor(true)}
                  plannerMode={plannerMode}
                  onPlannerModeChange={setPlannerMode}
                />

                <div className={`${containerStyles.canvas} ${viewMode === "timeline" ? "overflow-x-visible min-w-0" : ""}`}>
                  <div className={`${containerStyles.canvasArea} ${viewMode === "timeline" ? "overflow-x-visible" : ""}`} style={{ borderColor: "#808080" }}>
                    <div 
                      className={`w-full h-full relative ${viewMode === "timeline" ? "overflow-x-visible" : ""}`}
                      style={getCanvasGradient()}
                    >
                      <div 
                        className={decorationStyles.pixelGrid}
                        style={getPixelGridPattern()}
                      />

                      <RetroPlannerCanvasDecorations />

                      <div className={`relative z-10 p-4 min-h-[400px] ${viewMode === "timeline" ? "overflow-x-visible w-auto" : ""}`}>
                        {viewMode === "timeline" && (
                          <RetroPlannerTimelineView
                            tasks={tasks}
                            startDate={new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)}
                            endDate={new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)}
                          />
                        )}

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

                        {viewMode !== "timeline" && (
                          <>
                            <RetroPlannerStats
                              totalCount={totalCount}
                              completedCount={completedCount}
                            />

                            <RetroPlannerCategoryStats tasks={todayTasks} />

                            <RetroPlannerTaskList
                              tasks={currentTasks}
                              onToggleTask={handleToggleTask}
                              onDeleteTask={handleDeleteTask}
                              selectedCategory={selectedCategory}
                              onTimeUpdate={handleTimeUpdate}
                            />
                          </>
                        )}

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