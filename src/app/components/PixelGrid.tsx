import { motion } from "motion/react";

export function PixelGrid() {
  const gridItems = Array.from({ length: 12 });

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center mb-4 md:mb-6 text-[#e91e63] text-xs md:text-sm"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      >
        ◆ PIXEL GALLERY ◆
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {gridItems.map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 1.4 + i * 0.1,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              zIndex: 10,
            }}
            className="aspect-square bg-gradient-to-br from-pink-300 to-purple-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative overflow-hidden"
          >
            <div 
              className="absolute inset-0 grid grid-cols-4 grid-rows-4"
              style={{ imageRendering: "pixelated" }}
            >
              {Array.from({ length: 16 }).map((_, j) => (
                <motion.div
                  key={j}
                  className="border border-white/20"
                  style={{
                    backgroundColor: Math.random() > 0.5 
                      ? "rgba(255,255,255,0.1)" 
                      : "rgba(0,0,0,0.1)",
                  }}
                  animate={{
                    backgroundColor: [
                      "rgba(255,255,255,0.1)",
                      "rgba(0,0,0,0.1)",
                      "rgba(255,255,255,0.1)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: j * 0.1,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
