import { motion } from "motion/react";
import { Camera, Zap, Target, Trophy, Gift, Rocket } from "lucide-react";

export function KoreanPixelGallery() {
  const galleryItems = [
    { title: "게임", icon: Target, color: "from-red-400 to-red-600" },
    { title: "음악", icon: Zap, color: "from-blue-400 to-blue-600" },
    { title: "사진", icon: Camera, color: "from-green-400 to-green-600" },
    { title: "선물", icon: Gift, color: "from-yellow-400 to-yellow-600" },
    { title: "우주", icon: Rocket, color: "from-purple-400 to-purple-600" },
    { title: "승리", icon: Trophy, color: "from-pink-400 to-pink-600" },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8 }}
        className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-4 md:p-6"
      >
        <motion.h2
          className="text-center mb-4 md:mb-6 text-[#9c27b0] text-sm md:text-base"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          ◆ 픽셀 갤러리 ◆
        </motion.h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: 2 + i * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  zIndex: 10,
                }}
                className={`aspect-square bg-gradient-to-br ${item.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer relative overflow-hidden flex flex-col items-center justify-center gap-2 md:gap-3 p-3`}
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="w-10 h-10 md:w-12 md:h-12 bg-white/20 border-2 border-white flex items-center justify-center"
                >
                  <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </motion.div>
                <span 
                  className="text-white text-xs md:text-sm"
                  style={{ fontFamily: "'DungGeunMo', monospace" }}
                >
                  {item.title}
                </span>
              </motion.div>
            );
          })}
        </div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="mt-6 p-4 bg-[#fce4ec] border-2 border-[#ec407a]"
        >
          <p 
            className="text-center text-[#4a0066] text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            각 아이콘을 클릭하여 레트로한 세계를 탐험해보세요!
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
