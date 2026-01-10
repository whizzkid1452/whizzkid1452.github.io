import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarContentProps } from "./types";

export function SidebarContent({ menuItems, currentPage, setCurrentPage, onClose }: SidebarContentProps) {
  return (
    <div className="h-full flex flex-col">
      <SidebarHeader />
      <SidebarProfile />
      <SidebarMenu 
        menuItems={menuItems} 
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onItemClick={onClose} 
      />
      <SidebarFooter />
    </div>
  );
}