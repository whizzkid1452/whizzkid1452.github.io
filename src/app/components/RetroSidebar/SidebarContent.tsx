import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarContentProps } from "./types";

export function SidebarContent({ menuItems, onClose }: SidebarContentProps) {
  return (
    <div className="h-full flex flex-col">
      <SidebarHeader />
      <SidebarProfile />
      <SidebarMenu menuItems={menuItems} onItemClick={onClose} />
      <SidebarFooter />
    </div>
  );
}