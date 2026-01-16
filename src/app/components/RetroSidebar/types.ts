import { LucideIcon } from "lucide-react";
import { IconType } from "react-icons";

export interface MenuItem {
  icon: LucideIcon | IconType;
  label: string;
  color: string;
  path: string;
  disabled?: boolean;
}

export interface SidebarContentProps {
  menuItems: MenuItem[];
  onClose?: () => void;
}

export interface RetroSidebarProps {
  // React Router를 사용하므로 props가 필요 없습니다
}