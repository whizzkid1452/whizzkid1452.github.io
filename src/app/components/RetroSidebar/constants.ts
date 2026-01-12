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

// 페이지 라벨과 경로 매핑
export const PAGE_ROUTES: Record<string, string> = {
  home: "/",
  post: "/post",
  game: "/game",
  music: "/music",
  code: "/code",
  diary: "/diary",
  about: "/about",
};

export const MENU_ITEMS: MenuItem[] = [
  { icon: Home, label: "home", color: "#e91e63", path: PAGE_ROUTES.home },
  { icon: FileText, label: "post", color: "#ff5722", path: PAGE_ROUTES.post },
  { icon: Music, label: "music", color: "#00bcd4", path: PAGE_ROUTES.music },
  { icon: BookOpen, label: "diary", color: "#ff9800", path: PAGE_ROUTES.diary },
  { icon: Gamepad2, label: "game", color: "#9c27b0", path: PAGE_ROUTES.game, disabled: true },
  { icon: Info, label: "about", color: "#607d8b", path: PAGE_ROUTES.about },
  { icon: Code, label: "code", color: "#4caf50", path: PAGE_ROUTES.code },
];