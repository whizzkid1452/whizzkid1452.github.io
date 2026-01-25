export type TaskStatus = "todo" | "in_progress" | "done";

// 칸반보드 전용 카드 타입
export interface KanbanCard {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: "high" | "medium" | "low";
  category: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  startDate?: string; // 시작 날짜 (YYYY-MM-DD)
  endDate?: string; // 종료 날짜 (YYYY-MM-DD)
}

export interface Task {
  id: number;
  title: string;
  time: string;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  status: TaskStatus;
  date: string;
  order?: number; // 칸반보드 내 순서
  googleEventId?: string;
  startDate?: string; // 시작 날짜 (YYYY-MM-DD)
  endDate?: string; // 종료 날짜 (YYYY-MM-DD)
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

export type PlannerMode = "All" | "Dev" | "Art" | "CEO" | "Act" | "Exc";

export type ViewMode = "today" | "week" | "month" | "timeline" | "kanban";

export interface PlannerModeOption {
  mode: PlannerMode;
  label: string;
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  color: string;
}
