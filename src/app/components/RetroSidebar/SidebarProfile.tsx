import { motion } from "motion/react";
import { Heart } from "lucide-react";

export function SidebarProfile() {
  return (
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
  );
}