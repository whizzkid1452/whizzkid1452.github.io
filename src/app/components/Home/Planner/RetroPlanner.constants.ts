import { 
  Pencil, Brush, Square, Circle as CircleIcon, Eraser, 
  Droplet, Type, Plus
} from "lucide-react";
import { Tool } from "./RetroPlanner.types";

export const paletteColors = [
  "#FF1493", "#FF69B4", "#FFB6C1", "#FFC0CB", "#FFE4E1", 
  "#FADADD", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A",
  "#E91E63", "#C2185B", "#AD1457", "#880E4F", "#FF4081",
  "#F50057", "#C51162", "#D5006D", "#E91E8C", "#FF6EC7",
  "#FF85D7", "#FF9CE7", "#FFB3F7", "#FFC9FF", "#FFE0FF",
  "#EE82EE", "#DA70D6", "#DDA0DD", "#EE82EE", "#FF00FF",
] as const;

export const tools: Tool[] = [
  { icon: Pencil, label: "Pencil", color: "#FF69B4" },
  { icon: Brush, label: "Brush", color: "#FF1493" },
  { icon: Eraser, label: "Eraser", color: "#FFB6C1" },
  { icon: Droplet, label: "Fill", color: "#F06292" },
  { icon: Type, label: "Text", color: "#E91E63" },
  { icon: Square, label: "Rectangle", color: "#EC407A" },
  { icon: CircleIcon, label: "Circle", color: "#FF4081" },
  { icon: Plus, label: "Add Task", color: "#C2185B" },
] as const;

export const tasksPerPage = 4;

export const weekdays = ["일", "월", "화", "수", "목", "금", "토"] as const;
export const weekdaysEn = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"] as const;

export const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"] as const;
export const monthNamesEn = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"] as const;

export const menuItems = ["File", "Edit", "View", "Image", "Colors", "Help"] as const;
