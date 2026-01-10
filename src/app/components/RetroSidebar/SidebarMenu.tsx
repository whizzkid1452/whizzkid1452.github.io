import { motion } from "motion/react";
import { usePage } from "../../App";
import { MenuItem } from "./types";

interface SidebarMenuProps {
  menuItems: MenuItem[];
  onItemClick?: () => void;
}

export function SidebarMenu({ menuItems, onItemClick }: SidebarMenuProps) {
  const { currentPage, setCurrentPage } = usePage();
  const activeIndex = menuItems.findIndex(item => item.label === currentPage);

  return (
    <nav className="flex-1 overflow-y-auto p-2">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = activeIndex === index;
        
        return (
          <motion.button
            key={item.label}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 8, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentPage(item.label as any);
              if (onItemClick) onItemClick();
            }}
            className={`w-full p-3 mb-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all ${
              isActive 
                ? 'bg-[#e91e63] text-white' 
                : 'bg-white text-[#1a0033] hover:bg-[#fce4ec]'
            }`}
          >
            <div 
              className="w-8 h-8 border-2 border-current flex items-center justify-center"
              style={{ backgroundColor: isActive ? 'white' : item.color }}
            >
              <Icon 
                className="w-5 h-5" 
                style={{ 
                  color: isActive ? item.color : 'white',
                  imageRendering: "pixelated" 
                }} 
              />
            </div>
            <span 
              className="text-[10px]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {item.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}