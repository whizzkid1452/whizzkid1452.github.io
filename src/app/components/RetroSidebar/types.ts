import { LucideIcon } from "lucide-react";

export interface MenuItem {
  icon: LucideIcon;
  label: string;
  color: string;
}

export interface SidebarContentProps {
  menuItems: MenuItem[];
  onClose?: () => void;
}