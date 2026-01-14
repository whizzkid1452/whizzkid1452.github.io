import { useState, useMemo, useEffect } from "react";
import type { Task, PlannerMode } from "./RetroPlanner.types";
import { tasksPerPage, DAYS_IN_WEEK } from "./RetroPlanner.constants";
import {
  formatDate,
  formatDisplayDate,
  getWeekDates,
  getMonthDates,
  getMonthYearDisplay,
  convertGoogleCalendarEventToTask,
  getDateRangeForViewMode,
  sortTasksByPriorityAndTime,
  getPriorityNumber,
  getCategoryShortName,
} from "./RetroPlanner.utils";
import { useGoogleCalendar } from "../../../hooks/useGoogleCalendar";
import { createCalendarEvent, deleteCalendarEvent, updateCalendarEvent } from "../../../../lib/googleCalendar";

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
  const [viewMode, setViewMode] = useState<"today" | "week" | "month">("week");
  const [plannerMode, setPlannerMode] = useState<PlannerMode>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [googleCalendarTasks, setGoogleCalendarTasks] = useState<Task[]>([]);

  const { timeMin, timeMax } = getDateRangeForViewMode(selectedDate, viewMode);
  const {
    calendarEvents,
    isLoadingEvents: isLoadingCalendar,
    isAuthenticated,
    errorMessage,
    refreshCalendarEvents,
  } = useGoogleCalendar({
    timeMin,
    timeMax,
    maxResults: 250,
    autoLoad: true,
  });

  useEffect(() => {
    const convertedTasks = calendarEvents.map(convertGoogleCalendarEventToTask);
    setGoogleCalendarTasks(convertedTasks);
  }, [calendarEvents]);

  const allTasks = useMemo(() => {
    if (!isAuthenticated) {
      return tasks;
    }
    const googleTaskIds = new Set(googleCalendarTasks.map((task) => task.id));
    const localTasksWithoutDuplicates = tasks.filter((task) => !googleTaskIds.has(task.id));
    return [...localTasksWithoutDuplicates, ...googleCalendarTasks];
  }, [tasks, googleCalendarTasks, isAuthenticated]);

  const selectedDateStr = formatDate(selectedDate);
  const todayTasks = allTasks.filter((task) => task.date === selectedDateStr);
  
  const sortedTasks = sortTasksByPriorityAndTime(todayTasks);
  
  const completedCount = todayTasks.filter((task) => task.completed).length;
  const totalCount = todayTasks.length;
  const displayDate = formatDisplayDate(selectedDate);

  const totalPages = Math.ceil(sortedTasks.length / tasksPerPage);
  const startIndex = (currentPage - 1) * tasksPerPage;
  const endIndex = startIndex + tasksPerPage;
  const currentTasks = sortedTasks.slice(startIndex, endIndex);

  const weekDates = getWeekDates(selectedDate, allTasks, selectedDateStr);
  const monthDates = getMonthDates(selectedDate, allTasks, selectedDateStr);
  const monthDisplay = getMonthYearDisplay(selectedDate);

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleSaveTask = async (taskData: {
    title: string;
    time: string;
    category: string;
    priority: "high" | "medium" | "low";
  }) => {
    const taskDate = formatDate(selectedDate);
    const [hours, minutes] = taskData.time.split(':').map(Number);
    const startDateTime = new Date(selectedDate);
    startDateTime.setHours(hours, minutes, 0, 0);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(hours + 1, minutes, 0, 0);

    const categoryShort = getCategoryShortName(taskData.category);
    const priorityNumber = getPriorityNumber(taskData.priority);
    const titleWithMetadata = `${taskData.title} (${categoryShort})(${priorityNumber})`;

    if (isAuthenticated) {
      try {
        const createdEvent = await createCalendarEvent({
          summary: titleWithMetadata,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
          end: {
            dateTime: endDateTime.toISOString(),
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        });
        await refreshCalendarEvents();
        setCurrentPage(1);
        return;
      } catch (error) {
        console.error("구글 캘린더 이벤트 생성 실패:", error);
        alert("구글 캘린더에 일정 추가에 실패했습니다. 로컬에만 저장됩니다.");
      }
    }

    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false,
      date: taskDate,
    };
    setTasks([...tasks, newTask]);
    setCurrentPage(1);
  };

  const handleToggleTask = async (id: number) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;

    if (task.googleEventId) {
      const newCompletedState = !task.completed;
      
      setGoogleCalendarTasks(googleCalendarTasks.map((task) => 
        task.id === id ? { ...task, completed: newCompletedState } : task
      ));
      
      try {
        const categoryShort = getCategoryShortName(task.category);
        const priorityNumber = getPriorityNumber(task.priority);
        const completedMark = newCompletedState ? "(✓)" : "";
        const newTitle = `${task.title} (${categoryShort})(${priorityNumber})${completedMark}`;
        
        await updateCalendarEvent(task.googleEventId, {
          summary: newTitle,
        });
        await refreshCalendarEvents();
      } catch (error) {
        console.error("완료 상태 저장 실패:", error);
        alert("완료 상태 저장에 실패했습니다.");
        setGoogleCalendarTasks(googleCalendarTasks.map((task) => 
          task.id === id ? { ...task, completed: !newCompletedState } : task
        ));
      }
    } else {
      setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    }
  };

  const handleDeleteTask = async (id: number) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;

    if (task.googleEventId) {
      if (!confirm("구글 캘린더에서 이 일정을 삭제하시겠습니까?")) {
        return;
      }
      try {
        await deleteCalendarEvent(task.googleEventId);
        await refreshCalendarEvents();
      } catch (error) {
        console.error("구글 캘린더 이벤트 삭제 실패:", error);
        alert("구글 캘린더 이벤트 삭제에 실패했습니다.");
      }
    } else {
      setTasks(tasks.filter((task) => task.id !== id));
    }
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
    if (viewMode === "today") {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() - DAYS_IN_WEEK);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    handleDateChange(newDate);
  };

  const handleNextPeriod = () => {
    const newDate = new Date(selectedDate);
    if (viewMode === "today") {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + DAYS_IN_WEEK);
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
    tasks: allTasks,
    todayTasks,
    currentTasks,
    completedCount,
    totalCount,
    displayDate,
    totalPages,
    weekDates,
    monthDates,
    monthDisplay,
    selectedDate,
    isLoadingCalendar,
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
