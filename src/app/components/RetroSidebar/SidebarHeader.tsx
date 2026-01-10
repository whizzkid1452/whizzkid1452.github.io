import { motion } from "motion/react";
import { Star } from "lucide-react";

export function SidebarHeader() {
  return (
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
  );
}