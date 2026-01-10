import { motion, AnimatePresence } from "motion/react";
import { RetroPlannerTask } from "./RetroPlannerTask";
import { RetroPlannerEditor } from "./RetroPlannerEditor";
import { 
  Calendar, Plus, ChevronLeft, ChevronRight, CheckCircle2, Star, Grid3x3, List,
  Pencil, Brush, Square, Circle as CircleIcon, Eraser, 
  Droplet, Type, Image as ImageIcon,
  Heart, X, Minimize2, Maximize2, Sparkles
} from "lucide-react";
import { useState } from "react";

interface Task {
  id: number;
  title: string;
  time: string;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  date: string;
}

export function RetroPlanner() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [showTaskDetail, setShowTaskDetail] = useState(false);
  const tasksPerPage = 4;
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

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const weekdays = ["일", "월", "화", "수", "목", "금", "토"];
    const weekdaysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const dayOfWeek = date.getDay();

    return {
      full: `${year}.${month}.${day}`,
      weekdayKo: weekdays[dayOfWeek],
      weekdayEn: weekdaysEn[dayOfWeek],
    };
  };

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

  // Get week dates
  const getWeekDates = () => {
    const week = [];
    const today = new Date(selectedDate);
    const dayOfWeek = today.getDay();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - dayOfWeek);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateStr = formatDate(date);
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      week.push({
        date,
        dateStr,
        day: date.getDate(),
        isToday: dateStr === formatDate(new Date()),
        isSelected: dateStr === selectedDateStr,
        taskCount: dayTasks.length,
        completedCount: dayTasks.filter((t) => t.completed).length,
      });
    }
    return week;
  };

  const weekDates = getWeekDates();

  // Get month dates
  const getMonthDates = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const dates = [];
    
    // Previous month's trailing days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, prevMonthLastDay - i);
      dates.push({
        date,
        dateStr: formatDate(date),
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: formatDate(date) === formatDate(new Date()),
        isSelected: formatDate(date) === selectedDateStr,
        taskCount: 0,
        completedCount: 0,
      });
    }

    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = formatDate(date);
      const dayTasks = tasks.filter((t) => t.date === dateStr);
      dates.push({
        date,
        dateStr,
        day,
        isCurrentMonth: true,
        isToday: dateStr === formatDate(new Date()),
        isSelected: dateStr === selectedDateStr,
        taskCount: dayTasks.length,
        completedCount: dayTasks.filter((t) => t.completed).length,
      });
    }

    // Next month's leading days
    const remainingDays = 42 - dates.length;
    for (let day = 1; day <= remainingDays; day++) {
      const date = new Date(year, month + 1, day);
      dates.push({
        date,
        dateStr: formatDate(date),
        day: date.getDate(),
        isCurrentMonth: false,
        isToday: formatDate(date) === formatDate(new Date()),
        isSelected: formatDate(date) === selectedDateStr,
        taskCount: 0,
        completedCount: 0,
      });
    }

    return dates;
  };

  const monthDates = getMonthDates();

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

  const getMonthYearDisplay = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1;
    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return {
      full: `${year}.${String(month).padStart(2, "0")}`,
      monthKo: monthNames[selectedDate.getMonth()],
      monthEn: monthNamesEn[selectedDate.getMonth()],
    };
  };

  const monthDisplay = getMonthYearDisplay();

  // Pink palette colors
  const paletteColors = [
    "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1", 
    "#FADADD", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A",
    "#E91E63", "#C2185B", "#AD1457", "#880E4F", "#FF4081",
    "#F50057", "#C51162", "#D5006D", "#E91E8C", "#FF6EC7",
    "#FF85D7", "#FF9CE7", "#FFB3F7", "#FFC9FF", "#FFE0FF",
    "#EE82EE", "#DA70D6", "#DDA0DD", "#EE82EE", "#FF00FF",
  ];

  // Tool icons
  const tools = [
    { icon: Pencil, label: "Pencil", color: "#FF69B4" },
    { icon: Brush, label: "Brush", color: "#FF1493" },
    { icon: Eraser, label: "Eraser", color: "#FFB6C1" },
    { icon: Droplet, label: "Fill", color: "#F06292" },
    { icon: Type, label: "Text", color: "#E91E63" },
    { icon: Square, label: "Rectangle", color: "#EC407A" },
    { icon: CircleIcon, label: "Circle", color: "#FF4081" },
    { icon: Plus, label: "Add Task", color: "#C2185B" },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto mb-6 md:mb-8 relative">
      {/* Floating pixel hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-deco-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${10 + (i * 10)}%`,
            left: i % 2 === 0 ? "auto" : `${5 + (i * 3)}%`,
            right: i % 2 === 0 ? `${5 + (i * 3)}%` : "auto",
          }}
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.15, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 2.5 + (i % 3),
            repeat: Infinity,
            delay: i * 0.2,
          }}
        >
          <Heart className="w-3 h-3 md:w-4 md:h-4 fill-pink-400 text-pink-500 drop-shadow-[0_2px_4px_rgba(236,72,153,0.5)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      {/* Floating pixel stars */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`star-deco-${i}`}
          className="absolute pointer-events-none z-20"
          style={{
            top: `${15 + (i * 15)}%`,
            left: `${10 + (i * 15)}%`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.3, 0.8],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 3 + (i % 2),
            repeat: Infinity,
            delay: i * 0.3,
          }}
        >
          <Sparkles className="w-2 h-2 md:w-3 md:h-3 text-yellow-300 fill-yellow-200 drop-shadow-[0_0_4px_rgba(255,215,0,0.8)]" style={{ imageRendering: "pixelated" }} />
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#c0c0c0] border-2 border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] relative"
        style={{ 
          borderTopColor: "#ffffff", 
          borderLeftColor: "#ffffff", 
          borderRightColor: "#808080", 
          borderBottomColor: "#808080",
          imageRendering: "pixelated"
        }}
      >
        {/* Title Bar - Pink Pixel Style */}
        <div className="bg-gradient-to-r from-[#FF1493] via-[#FF69B4] to-[#FF1493] px-2 py-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-white" style={{ imageRendering: "pixelated" }} />
            <span className="text-white text-xs" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
              PINK PLANNER.EXE
            </span>
          </div>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ backgroundColor: "#ff69b4" }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <Minimize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff69b4" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <Maximize2 className="w-3 h-3" />
            </motion.button>
            <motion.button
              whileHover={{ backgroundColor: "#ff1493" }}
              className="w-5 h-5 bg-[#c0c0c0] border flex items-center justify-center"
              style={{ borderTopColor: "#ffffff", borderLeftColor: "#ffffff", borderRightColor: "#808080", borderBottomColor: "#808080", imageRendering: "pixelated" }}
            >
              <X className="w-3 h-3" />
            </motion.button>
          </div>
        </div>

        {/* Collapsible Content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              {/* Menu Bar */}
              <div className="bg-white px-2 py-1 flex gap-3 text-[11px] border-b" style={{ fontFamily: "'Press Start 2P', monospace", borderBottomColor: "#808080", imageRendering: "pixelated" }}>
                {["File", "Edit", "View", "Image", "Colors", "Help"].map((menu) => (
                  <motion.button
                    key={menu}
                    whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
                    className="hover:bg-pink-200 px-1 text-[9px]"
                  >
                    {menu}
                  </motion.button>
                ))}
              </div>

              {/* Main Area with Toolbox */}
              <div className="flex">
                {/* Toolbox */}
                <div className="bg-[#f8bbd0] border-r-2 p-1 flex flex-col gap-1" style={{ borderRightColor: "#808080" }}>
                  {tools.map((tool, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.1, backgroundColor: tool.color }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => tool.label === "Add Task" && setShowEditor(true)}
                      className="w-10 h-10 bg-white border-2 flex items-center justify-center transition-colors"
                      style={{ 
                        borderTopColor: "#ffffff", 
                        borderLeftColor: "#ffffff", 
                        borderRightColor: "#808080", 
                        borderBottomColor: "#808080",
                        imageRendering: "pixelated"
                      }}
                      title={tool.label}
                    >
                      <tool.icon className="w-5 h-5 text-gray-700" style={{ imageRendering: "pixelated" }} />
                    </motion.button>
                  ))}
                  
                  {/* Color Preview - Pink Theme */}
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="w-10 h-5 border-2 border-black bg-[#FF1493]" style={{ imageRendering: "pixelated" }} />
                    <div className="w-10 h-5 border-2 border-black bg-[#FFB6C1]" style={{ imageRendering: "pixelated" }} />
                  </div>

                  {/* Pixel Heart Decoration */}
                  <motion.div
                    className="mt-2"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-10 h-10 fill-pink-400 text-pink-500" style={{ imageRendering: "pixelated" }} />
                  </motion.div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 flex flex-col">
                  {/* Canvas with pink gradient background */}
                  <div className="bg-white p-2 flex-1 border-2" style={{ borderColor: "#808080" }}>
                    <div 
                      className="w-full h-full relative"
                      style={{
                        background: "linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 25%, #FF69B4 50%, #FF1493 75%, #C2185B 100%)",
                        imageRendering: "pixelated"
                      }}
                    >
                      {/* Pixel Grid Pattern Overlay */}
                      <div 
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, #000 3px, #000 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, #000 3px, #000 4px)",
                          imageRendering: "pixelated"
                        }}
                      />

                      {/* Floating pixel hearts in canvas */}
                      {[...Array(15)].map((_, i) => (
                        <motion.div
                          key={`canvas-heart-${i}`}
                          className="absolute pointer-events-none"
                          style={{
                            top: `${5 + (i * 6)}%`,
                            left: `${3 + (i * 7)}%`,
                          }}
                          animate={{
                            y: [0, -15, 0],
                            x: [0, Math.sin(i) * 10, 0],
                            rotate: [0, 10, -10, 0],
                            opacity: [0.3, 0.8, 0.3],
                          }}
                          transition={{
                            duration: 3 + (i % 4),
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        >
                          <Heart className="w-4 h-4 md:w-6 md:h-6 fill-white/60 text-white/80" style={{ imageRendering: "pixelated" }} />
                        </motion.div>
                      ))}

                      {/* Pixel stars decoration */}
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={`canvas-star-${i}`}
                          className="absolute pointer-events-none"
                          style={{
                            top: `${10 + (i * 9)}%`,
                            right: `${5 + (i * 8)}%`,
                          }}
                          animate={{
                            scale: [0.5, 1.5, 0.5],
                            opacity: [0.2, 1, 0.2],
                            rotate: [0, 180, 360],
                          }}
                          transition={{
                            duration: 2.5 + (i % 3),
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        >
                          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-200 text-yellow-300" style={{ imageRendering: "pixelated" }} />
                        </motion.div>
                      ))}

                      {/* Content wrapper with padding for decorations */}
                      <div className="relative z-10 p-4 min-h-[400px]">
                        {/* Date Navigator */}
                        <div className="w-full max-w-lg mx-auto mb-4">
                          <div className="bg-white border-4 border-[#FF1493] p-3 shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)]" style={{ imageRendering: "pixelated" }}>
                            <div className="flex items-center justify-between mb-3">
                              <motion.button
                                whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handlePrevPeriod}
                                className="w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-pink-400 transition-colors"
                                style={{ borderColor: "#FF1493", imageRendering: "pixelated" }}
                              >
                                <ChevronLeft className="w-5 h-5 text-white" />
                              </motion.button>

                              <div className="text-center">
                                <p
                                  className="text-[#C2185B] text-sm md:text-base mb-1"
                                  style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
                                >
                                  {viewMode === "week" ? displayDate.full : monthDisplay.full}
                                </p>
                                <p
                                  className="text-[#FF1493] text-[10px]"
                                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                                >
                                  {viewMode === "week" ? `${displayDate.weekdayKo}요일 • ${displayDate.weekdayEn}` : `${monthDisplay.monthKo} • ${monthDisplay.monthEn}`}
                                </p>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.15, backgroundColor: "#FF69B4" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleNextPeriod}
                                className="w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-pink-400 transition-colors"
                                style={{ borderColor: "#FF1493", imageRendering: "pixelated" }}
                              >
                                <ChevronRight className="w-5 h-5 text-white" />
                              </motion.button>
                            </div>

                            <div className="grid grid-cols-3 gap-1">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleToday}
                                className="px-2 py-1.5 bg-[#FFE4E1] border-2 border-[#FF69B4] hover:bg-[#FFB6C1] transition-colors text-[9px]"
                                style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
                              >
                                TODAY
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("week")}
                                className={`flex items-center justify-center gap-1 px-2 py-1.5 border-2 transition-colors text-[9px] ${
                                  viewMode === "week"
                                    ? "bg-[#FF1493] text-white border-[#C2185B]"
                                    : "bg-[#FFE4E1] border-[#FF69B4] hover:bg-[#FFB6C1]"
                                }`}
                                style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
                              >
                                <List className="w-3 h-3" />
                                WEEK
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setViewMode("month")}
                                className={`flex items-center justify-center gap-1 px-2 py-1.5 border-2 transition-colors text-[9px] ${
                                  viewMode === "month"
                                    ? "bg-[#FF1493] text-white border-[#C2185B]"
                                    : "bg-[#FFE4E1] border-[#FF69B4] hover:bg-[#FFB6C1]"
                                }`}
                                style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}
                              >
                                <Grid3x3 className="w-3 h-3" />
                                MONTH
                              </motion.button>
                            </div>
                          </div>
                        </div>

                        {/* Week View */}
                        {viewMode === "week" && (
                          <div className="grid grid-cols-7 gap-1 mb-4">
                            {weekDates.map((day, index) => (
                              <motion.button
                                key={index}
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDateChange(day.date)}
                                className={`p-2 border-3 transition-colors ${
                                  day.isSelected
                                    ? "bg-[#FF1493] text-white border-[#C2185B]"
                                    : day.isToday
                                    ? "bg-[#FFE4E1] border-[#FF69B4]"
                                    : "bg-white border-[#FFB6C1] hover:bg-[#FFC0CB]"
                                }`}
                                style={{ imageRendering: "pixelated" }}
                              >
                                <div
                                  className={`text-[10px] mb-1 ${day.isSelected ? "text-white" : "text-[#C2185B]"}`}
                                  style={{ fontFamily: "'Press Start 2P', monospace" }}
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
                        )}

                        {/* Month View */}
                        {viewMode === "month" && (
                          <div className="mb-4">
                            <div className="grid grid-cols-7 gap-1 mb-1">
                              {["일", "월", "화", "수", "목", "금", "토"].map((day, i) => (
                                <div
                                  key={i}
                                  className={`p-1 text-center text-[10px] bg-[#FFB6C1] border-2 border-[#FF1493] ${
                                    i === 0 ? "text-red-600" : i === 6 ? "text-blue-600" : "text-[#C2185B]"
                                  }`}
                                  style={{ fontFamily: "'DungGeunMo', monospace", imageRendering: "pixelated" }}
                                >
                                  {day}
                                </div>
                              ))}
                            </div>
                            <div className="grid grid-cols-7 gap-1">
                              {monthDates.map((day, index) => {
                                const dayTasks = tasks.filter((t) => t.date === day.dateStr).sort((a, b) => a.time.localeCompare(b.time));
                                return (
                                  <div key={index} className="relative">
                                    <motion.button
                                      whileHover={day.isCurrentMonth ? { scale: 1.05 } : {}}
                                      whileTap={day.isCurrentMonth ? { scale: 0.95 } : {}}
                                      onClick={() => {
                                        if (day.isCurrentMonth) {
                                          handleDateChange(day.date);
                                          if (dayTasks.length > 0) {
                                            setShowTaskDetail(true);
                                          }
                                        }
                                      }}
                                      onMouseEnter={() => day.isCurrentMonth && setHoveredDate(day.dateStr)}
                                      onMouseLeave={() => setHoveredDate(null)}
                                      className={`w-full aspect-square p-1 border-2 transition-colors relative ${
                                        day.isSelected && day.isCurrentMonth
                                          ? "bg-[#FF1493] text-white border-[#C2185B]"
                                          : day.isToday && day.isCurrentMonth
                                          ? "bg-[#FFE4E1] border-[#FF69B4]"
                                          : day.isCurrentMonth
                                          ? "bg-white border-[#FFB6C1] hover:bg-[#FFC0CB]"
                                          : "bg-gray-200 border-gray-300 opacity-40"
                                      }`}
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
                                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                                        >
                                          {day.day}
                                        </div>
                                        
                                        {/* Show mini task list */}
                                        {day.isCurrentMonth && dayTasks.length > 0 && (
                                          <div className="w-full space-y-0.5 mt-1">
                                            {dayTasks.slice(0, 2).map((task) => (
                                              <div
                                                key={task.id}
                                                className={`text-[6px] px-1 py-0.5 truncate border ${
                                                  task.completed
                                                    ? "bg-green-100 border-green-400 text-green-700 line-through"
                                                    : task.priority === "high"
                                                    ? "bg-red-100 border-red-400 text-red-700"
                                                    : task.priority === "medium"
                                                    ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                                                    : "bg-blue-100 border-blue-400 text-blue-700"
                                                } ${day.isSelected ? "opacity-90" : ""}`}
                                                style={{ fontFamily: "'DungGeunMo', monospace", imageRendering: "pixelated" }}
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
                                                style={{ fontFamily: "'Press Start 2P', monospace" }}
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
                                          className="absolute z-50 left-1/2 -translate-x-1/2 -top-2 transform -translate-y-full bg-white border-4 border-[#FF1493] p-3 shadow-[4px_4px_0px_0px_rgba(255,20,147,0.8)] min-w-[220px] max-w-[250px]"
                                          style={{ imageRendering: "pixelated", pointerEvents: "none" }}
                                        >
                                          <div className="space-y-2 max-h-48 overflow-y-auto">
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
                                                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                                                  >
                                                    <span className="text-[#FF1493]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
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
                        )}

                        {/* Stats - Pink Pixel Style */}
                        <div className="grid grid-cols-3 gap-2 mb-4">
                          <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-2 border-3 border-pink-400 text-center shadow-[4px_4px_0px_0px_rgba(255,105,180,0.5)]" style={{ imageRendering: "pixelated" }}>
                            <div
                              className="text-pink-600 text-lg mb-0.5"
                              style={{ fontFamily: "'Press Start 2P', monospace" }}
                            >
                              {totalCount}
                            </div>
                            <div className="text-pink-700 text-[9px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                              전체 • Total
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-green-100 to-green-200 p-2 border-3 border-green-400 text-center shadow-[4px_4px_0px_0px_rgba(0,255,127,0.5)]" style={{ imageRendering: "pixelated" }}>
                            <div
                              className="text-green-600 text-lg mb-0.5"
                              style={{ fontFamily: "'Press Start 2P', monospace" }}
                            >
                              {completedCount}
                            </div>
                            <div className="text-green-700 text-[9px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                              완료 • Done
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-yellow-100 to-yellow-200 p-2 border-3 border-yellow-400 text-center shadow-[4px_4px_0px_0px_rgba(255,215,0,0.5)]" style={{ imageRendering: "pixelated" }}>
                            <div
                              className="text-yellow-600 text-lg mb-0.5"
                              style={{ fontFamily: "'Press Start 2P', monospace" }}
                            >
                              {totalCount - completedCount}
                            </div>
                            <div className="text-yellow-700 text-[9px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                              남음 • Left
                            </div>
                          </div>
                        </div>

                        {/* Task List */}
                        <div className="space-y-2">
                          {currentTasks.length > 0 ? (
                            currentTasks.map((task, index) => (
                              <RetroPlannerTask
                                key={task.id}
                                {...task}
                                delay={index * 0.1}
                                onToggle={handleToggleTask}
                                onDelete={handleDeleteTask}
                              />
                            ))
                          ) : (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="text-center py-8 border-4 border-dashed border-pink-300 bg-pink-50"
                              style={{ imageRendering: "pixelated" }}
                            >
                              <Star className="w-10 h-10 text-pink-400 mx-auto mb-3 fill-pink-200" style={{ imageRendering: "pixelated" }} />
                              <p
                                className="text-pink-600 text-xs mb-1"
                                style={{ fontFamily: "'Press Start 2P', monospace" }}
                              >
                                NO TASKS
                              </p>
                              <p className="text-pink-500 text-[10px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                                할 일을 추가해보세요! • Add your first task!
                              </p>
                            </motion.div>
                          )}
                        </div>

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                          <div className="flex justify-center mt-4">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handlePrevPage}
                              className="w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-[#FFC0CB] transition-colors"
                              style={{ borderColor: "#FF1493", imageRendering: "pixelated" }}
                              disabled={currentPage === 1}
                            >
                              <ChevronLeft className="w-5 h-5 text-white" />
                            </motion.button>
                            <div className="mx-2 text-pink-600 text-[10px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                              {currentPage} / {totalPages}
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={handleNextPage}
                              className="w-8 h-8 bg-[#FFB6C1] border-2 flex items-center justify-center hover:bg-[#FFC0CB] transition-colors"
                              style={{ borderColor: "#FF1493", imageRendering: "pixelated" }}
                              disabled={currentPage === totalPages}
                            >
                              <ChevronRight className="w-5 h-5 text-white" />
                            </motion.button>
                          </div>
                        )}

                        {/* Progress Bar - Pixel Style */}
                        {totalCount > 0 && (
                          <div className="mt-4 pt-3 border-t-3 border-pink-300">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-pink-600 text-[10px]" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                                진행률 • Progress
                              </span>
                              <span className="text-pink-600 text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                                {Math.round((completedCount / totalCount) * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-6 bg-white border-3 border-pink-400 overflow-hidden shadow-[4px_4px_0px_0px_rgba(255,105,180,0.3)]" style={{ imageRendering: "pixelated" }}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(completedCount / totalCount) * 100}%` }}
                                transition={{ duration: 0.5, type: "spring" }}
                                className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 flex items-center justify-center relative overflow-hidden"
                              >
                                {/* Pixel pattern overlay */}
                                <div 
                                  className="absolute inset-0 opacity-30"
                                  style={{
                                    backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 4px)",
                                    imageRendering: "pixelated"
                                  }}
                                />
                                {completedCount > 0 && <Heart className="w-4 h-4 text-white fill-white relative z-10" style={{ imageRendering: "pixelated" }} />}
                              </motion.div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Color Palette - Pink Themed */}
        <div className="bg-[#f8bbd0] p-2 border-t-2" style={{ borderTopColor: "#808080" }}>
          <div className="grid grid-cols-15 gap-0.5 max-w-xl">
            {paletteColors.map((color, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.3, zIndex: 10, boxShadow: "0 0 8px rgba(255,20,147,0.8)" }}
                whileTap={{ scale: 0.9 }}
                className="w-4 h-4 border-2 border-pink-600"
                style={{ backgroundColor: color, imageRendering: "pixelated" }}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Status Bar - Pixel Style */}
        <div className="bg-[#f8bbd0] border-t-2 px-2 py-1 flex justify-between items-center text-[9px]" style={{ fontFamily: "'Press Start 2P', monospace", borderTopColor: "#ffffff", imageRendering: "pixelated" }}>
          <div className="flex items-center gap-2">
            <Heart className="w-3 h-3 fill-pink-600 text-pink-600" style={{ imageRendering: "pixelated" }} />
            <span className="text-pink-700">PINK PIXEL PLANNER v1.0</span>
          </div>
          <div className="flex gap-4 text-pink-700">
            <span>{displayDate.full}</span>
            <span>{todayTasks.length} TASKS</span>
          </div>
        </div>
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