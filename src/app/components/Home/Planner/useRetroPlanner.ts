import { useState, useMemo, useEffect } from "react";
import type { Task, PlannerMode, ViewMode, TaskStatus } from "./RetroPlanner.types";
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
    status: "in_progress",
    date: "2026-01-02",
  },
  {
    id: 2,
    title: "React 공부하기 • Study React",
    time: "14:00",
    category: "공부 Study",
    priority: "medium",
    completed: false,
    status: "todo",
    date: "2026-01-02",
  },
  {
    id: 3,
    title: "운동 30분 • Exercise 30min",
    time: "18:00",
    category: "운동 Exercise",
    priority: "medium",
    completed: true,
    status: "done",
    date: "2026-01-02",
  },
  {
    id: 4,
    title: "일기 쓰기 • Write diary",
    time: "21:00",
    category: "개인 Personal",
    priority: "low",
    completed: false,
    status: "todo",
    date: "2026-01-02",
  },
];

export function useRetroPlanner() {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>("week");
  const [plannerMode, setPlannerMode] = useState<PlannerMode>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hoveredDate, setHoveredDate] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
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

  // 오늘 날짜에 기본 항목 추가
  useEffect(() => {
    const today = new Date();
    const todayStr = formatDate(today);
    
    // 오늘 날짜의 기존 태스크 확인
    const existingTodayTasks = tasks.filter((task) => task.date === todayStr);
    const existingTitles = new Set(existingTodayTasks.map((task) => task.title));
    
    // 기본 항목들
    const defaultTasks: Task[] = [
      {
        id: Date.now() + 1,
        title: "알고리즘",
        time: "09:00",
        category: "공부 Study",
        priority: "high",
        completed: false,
        status: "todo",
        date: todayStr,
      },
      {
        id: Date.now() + 2,
        title: "drop.ai + @",
        time: "14:00",
        category: "업무 Work",
        priority: "medium",
        completed: false,
        status: "in_progress",
        date: todayStr,
      },
      {
        id: Date.now() + 3,
        title: "react 인강",
        time: "16:00",
        category: "공부 Study",
        priority: "medium",
        completed: false,
        status: "todo",
        date: todayStr,
      },
    ];
    
    // 기본 항목 중 아직 없는 것만 추가
    const tasksToAdd = defaultTasks.filter(
      (task) => !existingTitles.has(task.title)
    );
    
    if (tasksToAdd.length > 0) {
      setTasks((prevTasks) => [...prevTasks, ...tasksToAdd]);
    }
  }, []); // 컴포넌트 마운트 시 한 번만 실행

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
  
  // 카테고리 필터링
  const filteredTasks = selectedCategory
    ? todayTasks.filter((task) => task.category === selectedCategory)
    : todayTasks;
  
  const sortedTasks = sortTasksByPriorityAndTime(filteredTasks);
  
  const completedCount = filteredTasks.filter((task) => task.completed).length;
  const totalCount = filteredTasks.length;
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
    startDate?: string;
    endDate?: string;
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
      status: "todo",
      date: taskDate,
      startDate: taskData.startDate,
      endDate: taskData.endDate,
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

  const handleStatusChange = async (id: number, newStatus: TaskStatus) => {
    const task = allTasks.find((t) => t.id === id);
    if (!task) return;

    const isCompleted = newStatus === "done";

    if (task.googleEventId) {
      setGoogleCalendarTasks(googleCalendarTasks.map((t) => 
        t.id === id ? { ...t, status: newStatus, completed: isCompleted } : t
      ));
      
      try {
        const categoryShort = getCategoryShortName(task.category);
        const priorityNumber = getPriorityNumber(task.priority);
        const completedMark = isCompleted ? "(✓)" : "";
        const newTitle = `${task.title} (${categoryShort})(${priorityNumber})${completedMark}`;
        
        await updateCalendarEvent(task.googleEventId, {
          summary: newTitle,
        });
        await refreshCalendarEvents();
      } catch (error) {
        console.error("상태 변경 실패:", error);
        alert("상태 변경에 실패했습니다.");
        setGoogleCalendarTasks(googleCalendarTasks.map((t) => 
          t.id === id ? { ...t, status: task.status, completed: task.completed } : t
        ));
      }
    } else {
      setTasks(tasks.map((t) => 
        t.id === id ? { ...t, status: newStatus, completed: isCompleted } : t
      ));
    }
  };

  const handleReorder = (taskId: number, newStatus: TaskStatus, targetIndex: number) => {
    const task = allTasks.find((t) => t.id === taskId);
    if (!task) return;

    const isCompleted = newStatus === "done";
    const currentStatus = task.status || (task.completed ? "done" : "todo");
    
    // 해당 status의 태스크들 가져오기
    const tasksInTargetColumn = allTasks
      .filter((t) => {
        const tStatus = t.status || (t.completed ? "done" : "todo");
        return tStatus === newStatus && t.id !== taskId;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    
    // 새 순서 계산
    const updatedTasksInColumn = [
      ...tasksInTargetColumn.slice(0, targetIndex),
      { ...task, status: newStatus, completed: isCompleted },
      ...tasksInTargetColumn.slice(targetIndex),
    ];
    
    // order 값 재할당
    const orderUpdates: Map<number, number> = new Map();
    updatedTasksInColumn.forEach((t, index) => {
      orderUpdates.set(t.id, index);
    });

    // 로컬 태스크 업데이트
    setTasks(tasks.map((t) => {
      if (t.id === taskId) {
        return { 
          ...t, 
          status: newStatus, 
          completed: isCompleted,
          order: orderUpdates.get(t.id) ?? t.order,
        };
      }
      const tStatus = t.status || (t.completed ? "done" : "todo");
      if (tStatus === newStatus && orderUpdates.has(t.id)) {
        return { ...t, order: orderUpdates.get(t.id) };
      }
      return t;
    }));

    // Google Calendar 태스크도 업데이트
    setGoogleCalendarTasks(googleCalendarTasks.map((t) => {
      if (t.id === taskId) {
        return { 
          ...t, 
          status: newStatus, 
          completed: isCompleted,
          order: orderUpdates.get(t.id) ?? t.order,
        };
      }
      const tStatus = t.status || (t.completed ? "done" : "todo");
      if (tStatus === newStatus && orderUpdates.has(t.id)) {
        return { ...t, order: orderUpdates.get(t.id) };
      }
      return t;
    }));
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

  const handleTimeUpdate = (taskId: number, minutes: number) => {
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setTasks(tasks.map((t) => (t.id === taskId ? { ...t, trackedTime: minutes } : t)));
    } else {
      // Google Calendar 태스크인 경우
      setGoogleCalendarTasks(
        googleCalendarTasks.map((t) => (t.id === taskId ? { ...t, trackedTime: minutes } : t))
      );
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

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
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
    selectedCategory,
    setSelectedCategory: handleCategoryChange,
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
    handleStatusChange,
    handleReorder,
    handleDeleteTask,
    handleTimeUpdate,
    handlePrevPage,
    handleNextPage,
    handleDateChange,
    handlePrevPeriod,
    handleNextPeriod,
  };
}
