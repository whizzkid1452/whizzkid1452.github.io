import React from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router-dom";
import { MenuItem } from "./types";

interface SidebarMenuProps {
  menuItems: MenuItem[];
  onItemClick?: () => void;
}

export function SidebarMenu({ menuItems, onItemClick }: SidebarMenuProps) {
  const location = useLocation();

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden p-2">
      {menuItems.map((item, index) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        const isDisabled = item.disabled;
        
        return (
          <motion.div
            key={item.label}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: isDisabled ? 0.5 : 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={isDisabled ? {} : { x: 8, scale: 1.05 }}
            whileTap={isDisabled ? {} : { scale: 0.95 }}
          >
            {isDisabled ? (
              <div
                className="w-full p-3 mb-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all block bg-gray-200 text-gray-500 cursor-not-allowed"
                title="개발 중입니다"
              >
                <div 
                  className="w-8 h-8 border-2 border-current flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ 
                      color: 'white',
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
              </div>
            ) : (
              (() => {
                const isExternalLink = item.path.startsWith('http://') || item.path.startsWith('https://');
                const linkClassName = `w-full p-3 mb-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 transition-all block ${
                  isActive 
                    ? 'bg-[#e91e63] text-white' 
                    : 'bg-white text-[#1a0033] hover:bg-[#fce4ec]'
                }`;
                
                if (isExternalLink) {
                  return (
                    <a
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={onItemClick}
                      className={linkClassName}
                    >
                      <div 
                        className="w-8 h-8 border-2 border-current flex items-center justify-center"
                        style={{ backgroundColor: item.color }}
                      >
                        <Icon 
                          className="w-5 h-5" 
                          style={{ 
                            color: 'white',
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
                    </a>
                  );
                }
                
                return (
                  <Link
                    to={item.path}
                    onClick={onItemClick}
                    className={linkClassName}
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
                  </Link>
                );
              })()
            )}
          </motion.div>
        );
      })}
    </nav>
  );
}