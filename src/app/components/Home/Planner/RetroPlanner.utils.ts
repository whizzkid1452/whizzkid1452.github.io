import { Task, WeekDate, MonthDate, DisplayDate, MonthDisplay } from "./RetroPlanner.types";
import { weekdays, weekdaysEn, monthNames, monthNamesEn } from "./RetroPlanner.constants";

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDisplayDate(date: Date): DisplayDate {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dayOfWeek = date.getDay();

  return {
    full: `${year}.${month}.${day}`,
    weekdayKo: weekdays[dayOfWeek],
    weekdayEn: weekdaysEn[dayOfWeek],
  };
}

export function getWeekDates(selectedDate: Date, tasks: Task[], selectedDateStr: string): WeekDate[] {
  const week: WeekDate[] = [];
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
    });
  }
  return week;
}

export function getMonthDates(selectedDate: Date, tasks: Task[], selectedDateStr: string): MonthDate[] {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startDay = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  const dates: MonthDate[] = [];
  
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
    });
  }

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
    });
  }

  return dates;
}

export function getMonthYearDisplay(selectedDate: Date): MonthDisplay {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  return {
    full: `${year}.${String(month).padStart(2, "0")}`,
    monthKo: monthNames[selectedDate.getMonth()],
    monthEn: monthNamesEn[selectedDate.getMonth()],
  };
}
