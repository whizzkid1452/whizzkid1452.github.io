export interface Task {
  id: number;
  title: string;
  time: string;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  date: string;
}

export interface WeekDate {
  date: Date;
  dateStr: string;
  day: number;
  isToday: boolean;
  isSelected: boolean;
  taskCount: number;
}

export interface MonthDate {
  date: Date;
  dateStr: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  taskCount: number;
}

export interface DisplayDate {
  full: string;
  weekdayKo: string;
  weekdayEn: string;
}

export interface MonthDisplay {
  full: string;
  monthKo: string;
  monthEn: string;
}

import type { ComponentType, CSSProperties } from "react";

export interface Tool {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  label: string;
  color: string;
}
