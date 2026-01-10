import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Star, Sparkles } from "lucide-react";

export function RetroWindow() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring" }}
      className="w-full max-w-4xl mx-auto bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] border-4 border-[#ec407a]"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#ff69b4] via-[#e91e63] to-[#ff69b4] p-2 flex items-center justify-between border-b-4 border-[#ec407a]">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <span className="text-white text-xs md:text-sm" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            RETRO PIXEL
          </span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              <Heart className="w-3 h-3 md:w-4 md:h-4 text-pink-200 fill-pink-200" />
            </motion.div>
          ))}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 md:w-8 md:h-8 bg-yellow-300 border-2 border-black hover:bg-yellow-400 transition-colors ml-2"
          >
            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[8px] md:text-[10px]">
              _
            </span>
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors">
            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[8px] md:text-[10px]">
              □
            </span>
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors">
            <span style={{ fontFamily: "'Press Start 2P', monospace" }} className="text-[8px] md:text-[10px]">
              X
            </span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-[#f8bbd0] p-1 md:p-2 flex gap-1 md:gap-4 border-b-2 border-[#ec407a] flex-wrap">
        {["File", "Edit", "View", "Insert", "Help"].map((menu) => (
          <motion.button
            key={menu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-1 md:px-3 md:py-1 bg-transparent hover:bg-[#e91e63] hover:text-white transition-colors text-[8px] md:text-xs"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {menu}
          </motion.button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-[#fce4ec] p-2 border-b-2 border-[#ec407a] grid grid-cols-4 md:grid-cols-8 gap-1 md:gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.button
            key={i}
            whileHover={{ y: -2 }}
            className="w-8 h-8 md:w-10 md:h-10 bg-white border-2 border-[#ec407a] hover:bg-[#ff69b4] hover:border-black transition-colors flex items-center justify-center"
          >
            <div className="w-4 h-4 md:w-5 md:h-5 bg-gradient-to-br from-[#e91e63] to-[#9c27b0]" />
          </motion.button>
        ))}
      </div>

      {/* Content Area */}
      {!isMinimized && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="p-4 md:p-8 min-h-[300px] md:min-h-[400px]"
        >
          <div className="space-y-4 md:space-y-6">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 
                className="text-[#e91e63] mb-2 md:mb-4 text-sm md:text-base lg:text-lg"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                ★ WELCOME TO PIXEL WORLD ★
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-2 md:space-y-3"
            >
              <p 
                className="text-[#4a0066] text-[10px] md:text-xs leading-relaxed"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                ► Experience the nostalgic charm of retro computing
              </p>
              <p 
                className="text-[#4a0066] text-[10px] md:text-xs leading-relaxed"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                ► Pixel-perfect design with modern responsiveness
              </p>
              <p 
                className="text-[#4a0066] text-[10px] md:text-xs leading-relaxed"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                ► Built with love and retro vibes ♥
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mt-4 md:mt-6">
              {[
                { title: "GAME", color: "from-[#e91e63] to-[#f06292]" },
                { title: "MUSIC", color: "from-[#9c27b0] to-[#ba68c8]" },
                { title: "ART", color: "from-[#00bcd4] to-[#4dd0e1]" },
                { title: "CODE", color: "from-[#ffeb3b] to-[#fff176]" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  className={`p-3 md:p-4 bg-gradient-to-br ${item.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer`}
                >
                  <h3 
                    className="text-white text-[10px] md:text-xs mb-1 md:mb-2"
                    style={{ fontFamily: "'Press Start 2P', monospace" }}
                  >
                    {item.title}
                  </h3>
                  <div className="h-12 md:h-16 bg-white/20 border-2 border-white/50" />
                </motion.div>
              ))}
            </div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center mt-4 md:mt-6"
            >
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#e91e63]" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Status Bar */}
      <div className="bg-[#f8bbd0] p-1 md:p-2 flex justify-between items-center border-t-2 border-[#ec407a] text-[8px] md:text-xs">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 md:w-3 md:h-3 bg-green-500 border border-black"
          />
          <span style={{ fontFamily: "'VT323', monospace" }}>READY</span>
        </div>
        <span style={{ fontFamily: "'VT323', monospace" }}>100%</span>
      </div>
    </motion.div>
  );
}
