import { 
  Home, 
  Gamepad2, 
  Music, 
  Code, 
  FileText,
  BookOpen,
  Info
} from "lucide-react";
import { MenuItem } from "./types";

export const MENU_ITEMS: MenuItem[] = [
  { icon: Home, label: "home", color: "#e91e63" },
  { icon: FileText, label: "post", color: "#ff5722" },
  { icon: Gamepad2, label: "game", color: "#9c27b0" },
  { icon: Music, label: "music", color: "#00bcd4" },
  { icon: Code, label: "code", color: "#4caf50" },
  { icon: BookOpen, label: "diary", color: "#ff9800" },
  { icon: Info, label: "about", color: "#607d8b" },
];