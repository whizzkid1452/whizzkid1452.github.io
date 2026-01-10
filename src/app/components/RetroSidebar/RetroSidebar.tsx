import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { MobileToggleButton } from "./MobileToggleButton";
import { SidebarContent } from "./SidebarContent";
import { MENU_ITEMS } from "./constants";

export function RetroSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MobileToggleButton 
        isOpen={isOpen} 
        onToggle={() => setIsOpen(!isOpen)} 
      />

      {/* Desktop Sidebar - Always visible on large screens */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-[#f8bbd0] border-r-4 border-[#ec407a] shadow-[8px_0px_0px_0px_rgba(0,0,0,0.3)] z-40"
      >
        <SidebarContent menuItems={MENU_ITEMS} />
      </motion.div>

      {/* Mobile/Tablet Sidebar - Toggleable */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full w-64 md:w-72 bg-[#f8bbd0] border-r-4 border-[#ec407a] shadow-[8px_0px_0px_0px_rgba(0,0,0,0.3)] z-50 lg:hidden"
            >
              <SidebarContent 
                menuItems={MENU_ITEMS} 
                onClose={() => setIsOpen(false)} 
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}