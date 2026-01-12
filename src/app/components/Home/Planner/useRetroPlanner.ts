import { useState } from "react";
import type { Task, PlannerMode } from "./RetroPlanner.types";
import { tasksPerPage } from "./RetroPlanner.constants";
import {
  formatDate,
  formatDisplayDate,
  getWeekDates,
  getMonthDates,
  getMonthYearDisplay,
} from "./RetroPlanner.utils";

const initialTasks: Task[] = [
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
];

export function useRetroPlanner() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "month">("week");
  const [plannerMode, setPlannerMode] = useState<PlannerMode>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const selectedDateStr = formatDate(selectedDate);
  const todayTasks = tasks.filter((task) => task.date === selectedDateStr);
  const sortedTasks = todayTasks.sort((a, b) => a.time.localeCompare(b.time));
  const completedCount = todayTasks.filter((task) => task.completed).length;
  const totalCount = todayTasks.length;
  const displayDate = formatDisplayDate(selectedDate);

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

  const weekDates = getWeekDates(selectedDate, tasks, selectedDateStr);
  const monthDates = getMonthDates(selectedDate, tasks, selectedDateStr);
  const monthDisplay = getMonthYearDisplay(selectedDate);

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
    setCurrentPage(1);
  };

  const handleToggleTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

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

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setCurrentPage(1);
  };

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

  return {
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
    todayTasks,
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
  };
}
