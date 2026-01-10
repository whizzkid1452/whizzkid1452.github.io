import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { 
  Menu, 
  Home, 
  Gamepad2, 
  Music, 
  Palette, 
  Code, 
  Mail, 
  Settings,
  X,
  Star,
  Heart
} from "lucide-react";

export function RetroSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "홈", color: "#e91e63" },
    { icon: Gamepad2, label: "게임", color: "#9c27b0" },
    { icon: Music, label: "음악", color: "#00bcd4" },
    { icon: Palette, label: "미술", color: "#ffeb3b" },
    { icon: Code, label: "코드", color: "#4caf50" },
    { icon: Mail, label: "메일", color: "#ff5722" },
    { icon: Settings, label: "설정", color: "#607d8b" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 w-12 h-12 md:w-14 md:h-14 lg:hidden bg-[#e91e63] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Menu className="w-6 h-6 text-white" />
        )}
      </motion.button>

      {/* Desktop Sidebar - Always visible on large screens */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-[#f8bbd0] border-r-4 border-[#ec407a] shadow-[8px_0px_0px_0px_rgba(0,0,0,0.3)] z-40"
      >
        <SidebarContent menuItems={menuItems} />
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
              <SidebarContent menuItems={menuItems} onClose={() => setIsOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function SidebarContent({ 
  menuItems, 
  onClose 
}: { 
  menuItems: Array<{ icon: any; label: string; color: string }>;
  onClose?: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff69b4] via-[#e91e63] to-[#ff69b4] p-4 border-b-4 border-[#ec407a]">
        <div className="flex items-center gap-2 justify-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <h2 
            className="text-white text-xs"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            MENU
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </motion.div>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="p-4 border-b-4 border-[#ec407a] bg-white">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-gradient-to-br from-[#e91e63] to-[#9c27b0] border-4 border-black flex items-center justify-center"
          >
            <Heart className="w-8 h-8 text-white fill-white" />
          </motion.div>
          <div>
            <p 
              className="text-[#e91e63] text-[10px] mb-1"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              PLAYER
            </p>
            <p 
              className="text-[#4a0066] text-xs"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              Level 99
            </p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 8, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setActiveIndex(index);
                if (onClose) onClose();
              }}
              className={`w-full p-3 mb-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all ${
                activeIndex === index 
                  ? 'bg-[#e91e63] text-white' 
                  : 'bg-white text-[#1a0033] hover:bg-[#fce4ec]'
              }`}
            >
              <div 
                className="w-8 h-8 border-2 border-current flex items-center justify-center"
                style={{ backgroundColor: activeIndex === index ? 'white' : item.color }}
              >
                <Icon 
                  className="w-5 h-5" 
                  style={{ 
                    color: activeIndex === index ? item.color : 'white',
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

      {/* Footer Stats */}
      <div className="p-4 border-t-4 border-[#ec407a] bg-white space-y-2">
        <div className="flex justify-between items-center">
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            CPU
          </span>
          <div className="flex-1 mx-2 h-3 bg-[#fce4ec] border-2 border-[#ec407a]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#00bcd4] to-[#4dd0e1]"
              initial={{ width: "0%" }}
              animate={{ width: "73%" }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            73%
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            RAM
          </span>
          <div className="flex-1 mx-2 h-3 bg-[#fce4ec] border-2 border-[#ec407a]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#e91e63] to-[#f06292]"
              initial={{ width: "0%" }}
              animate={{ width: "45%" }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            45%
          </span>
        </div>

        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-2 mt-3 justify-center"
        >
          <div className="w-2 h-2 bg-green-500 border border-black" />
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            SYSTEM ONLINE
          </span>
        </motion.div>
      </div>
    </div>
  );
}