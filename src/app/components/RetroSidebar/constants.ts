import { 
  Home, 
  Music, 
  FileText,
  MessageSquare,
  Info
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { MenuItem } from "./types";

// 페이지 라벨과 경로 매핑
export const PAGE_ROUTES: Record<string, string> = {
  home: "/",
  post: "/post",

  music: "/music",
  code: "https://github.com/whizzkid1452?tab=repositories",
  diary: "/diary",
  about: "/about",
};

export const MENU_ITEMS: MenuItem[] = [
  { icon: Home, label: "home", color: "#e91e63", path: PAGE_ROUTES.home },
  { icon: FileText, label: "post", color: "#ff5722", path: PAGE_ROUTES.post },
  { icon: Music, label: "music", color: "#00bcd4", path: PAGE_ROUTES.music },
  { icon: MessageSquare, label: "guestbook", color: "#ff9800", path: PAGE_ROUTES.diary },

  { icon: Info, label: "about", color: "#607d8b", path: PAGE_ROUTES.about },
  { icon: SiGithub, label: "code", color: "#4caf50", path: PAGE_ROUTES.code },
];