import { LucideIcon } from "lucide-react";

export type Page = "home" | "post" | "game" | "music" | "code" | "diary" | "about";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface SidebarContentProps {
  menuItems: MenuItem[];
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  onClose?: () => void;
}

export interface RetroSidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}