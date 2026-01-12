import type { WeekDate, MonthDate } from "./RetroPlanner.types";

export const containerStyles = {
  wrapper: "w-full max-w-6xl mx-auto mb-6 md:mb-8 relative",
  mainContainer: "bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative",
  titleBar: "bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493] px-2 py-1 flex items-center justify-between",
  menuBar: "bg-white px-2 py-1 flex gap-3 text-[11px] border-b",
  toolbox: "bg-[#f8bbd0] border-r-2 p-1 flex flex-col gap-1",
  canvas: "flex-1 flex flex-col",
  canvasArea: "bg-white p-2 flex-1 border-2",
  colorPalette: "bg-[#f8bbd0] p-2 border-t-2",
  statusBar: "bg-[#f8bbd0] border-t-2 px-2 py-1 flex justify-between items-center text-[9px]",
} as const;

export const buttonStyles = {
  windowControl: "w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center",
  menuItem: "hover:bg-pink-200 px-1 text-[9px]",
  toolButton: "w-10 h-10 bg-white border-2 flex items-center justify-center transition-colors",
  navButton: "w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-pink-400 transition-colors",
  todayButton: "px-2 py-1.5 bg-[#FFE4E1] border-2 border-[#FF69B4] hover:bg-[#FFB6C1] transition-colors text-[9px]",
  viewModeButton: "flex items-center justify-center gap-1 px-2 py-1.5 border-2 transition-colors text-[9px]",
  paginationButton: "w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-[#FFC0CB] transition-colors",
} as const;

export const textStyles = {
  title: "text-white text-xs",
  menu: "text-[11px]",
  dateDisplay: "text-[#C2185B] text-sm md:text-base mb-1",
  dateSubtext: "text-[#FF1493] text-[10px]",
  buttonText: "text-[9px]",
  statsNumber: "text-pink-600 text-lg mb-0.5",
  statsLabel: "text-pink-700 text-[9px]",
  emptyStateTitle: "text-pink-600 text-xs mb-1",
  emptyStateSubtext: "text-pink-500 text-[10px]",
  progressLabel: "text-pink-600 text-[10px]",
  progressPercent: "text-pink-600 text-[10px]",
  statusBarText: "text-pink-700",
} as const;

export const borderStyles = {
  windowBorderStyle: {
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
    imageRendering: "pixelated" as const,
  },
  pinkBorder: {
    borderColor: "#FF1493",
    imageRendering: "pixelated" as const,
  },
} as const;

export const decorationStyles = {
  floatingHeart: "absolute pointer-events-none z-20",
  floatingStar: "absolute pointer-events-none z-20",
  canvasHeart: "absolute pointer-events-none",
  canvasStar: "absolute pointer-events-none",
  pixelGrid: "absolute inset-0 opacity-10 pointer-events-none",
} as const;

export const calendarStyles = {
  dateNavigator: "w-full max-w-lg mx-auto mb-4",
  dateNavigatorBox: "bg-white border-4 border-[#FF1493] p-3 shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)]",
  weekView: "grid grid-cols-7 gap-1 mb-4",
  monthView: "mb-4",
  monthHeader: "grid grid-cols-7 gap-1 mb-1",
  monthGrid: "grid grid-cols-7 gap-1",
  monthDay: "w-full aspect-square p-1 border-2 transition-colors relative",
} as const;

export const taskStyles = {
  statsCard: "bg-gradient-to-br p-2 border-3 text-center shadow-[4px_4px_0px_0px_rgba(255,105,180,0.5)]",
  emptyState: "text-center py-8 border-4 border-dashed border-pink-300 bg-pink-50",
  progressBar: "w-full h-6 bg-white border-3 border-pink-400 overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,105,180,0.3)]",
  progressFill: "h-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 flex items-center justify-center relative overflow-hidden",
  progressPattern: "absolute inset-0 opacity-30",
} as const;

export const tooltipStyles = {
  hoverTooltip: "absolute z-50 left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full bg-white border-4 border-[#FF1493] p-3 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.8)] min-w-[220px] max-w-[250px]",
  tooltipContent: "space-y-2 max-h-48 overflow-y-auto",
} as const;

export function getWindowBorderStyle() {
  return {
    borderTopColor: "#ffffff",
    borderLeftColor: "#ffffff",
    borderRightColor: "#808080",
    borderBottomColor: "#808080",
    imageRendering: "pixelated" as const,
  };
}

export function getCanvasGradient() {
  return {
    background: "linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 25%, #FF69B4 50%, #FF1493 75%, #C2185B 100%)",
    imageRendering: "pixelated" as const,
  };
}

export function getPixelGridPattern() {
  return {
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, #000 3px, #000 4px)",
    imageRendering: "pixelated" as const,
  };
}

export function getProgressPattern() {
  return {
    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
    imageRendering: "pixelated" as const,
  };
}

export function getFontStyle(fontFamily: "'Press Start 2P'" | "'DungGeunMo'") {
  return {
    fontFamily,
    imageRendering: "pixelated" as const,
  };
}

export function getViewModeButtonStyle(isActive: boolean) {
  return isActive
    ? "bg-[#FF1493] text-white border-[#C2185B]"
    : "bg-[#FFE4E1] border-[#FF69B4] hover:bg-[#FFB6C1]";
}

export function getWeekDayStyle(day: WeekDate) {
  if (day.isSelected) {
    return "bg-[#FF1493] text-white border-[#C2185B]";
  }
  if (day.isToday) {
    return "bg-[#FFE4E1] border-[#FF69B4]";
  }
  return "bg-white border-[#FFB6C1] hover:bg-[#FFC0CB]";
}

export function getMonthDayStyle(day: MonthDate) {
  if (day.isSelected && day.isCurrentMonth) {
    return "bg-[#FF1493] text-white border-[#C2185B]";
  }
  if (day.isToday && day.isCurrentMonth) {
    return "bg-[#FFE4E1] border-[#FF69B4]";
  }
  if (day.isCurrentMonth) {
    return "bg-white border-[#FFB6C1] hover:bg-[#FFC0CB]";
  }
  return "bg-gray-200 border-gray-300 opacity-40";
}

export function getTaskPriorityStyle(priority: "high" | "medium" | "low", completed: boolean) {
  if (completed) {
    return "bg-green-100 border-green-400 text-green-700 line-through";
  }
  if (priority === "high") {
    return "bg-red-100 border-red-400 text-red-700";
  }
  if (priority === "medium") {
    return "bg-yellow-100 border-yellow-400 text-yellow-700";
  }
  return "bg-blue-100 border-blue-400 text-blue-700";
}
