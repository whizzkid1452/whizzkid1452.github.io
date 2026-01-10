import { motion } from "motion/react";
import { useState } from "react";
import { Heart, Star, Sparkles, Coffee, Book, Palette } from "lucide-react";

export function KoreanRetroWindow() {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", delay: 0.3 }}
      className="w-full max-w-4xl mx-auto bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] border-4 border-[#ec407a]"
      style={{ imageRendering: "pixelated" }}
    >
      {/* Title Bar */}
      <div className="bg-gradient-to-r from-[#9c27b0] via-[#e91e63] to-[#9c27b0] p-2 flex items-center justify-between border-b-4 border-[#ec407a]">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <span className="text-white text-xs md:text-sm" style={{ fontFamily: "'DungGeunMo', monospace" }}>
            레트로 문서
          </span>
        </div>
        
        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="w-6 h-6 md:w-8 md:h-8 bg-yellow-300 border-2 border-black hover:bg-yellow-400 transition-colors"
          >
            <span style={{ fontFamily: "'DungGeunMo', monospace" }} className="text-xs md:text-sm">
              _
            </span>
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 bg-green-400 border-2 border-black hover:bg-green-500 transition-colors">
            <span style={{ fontFamily: "'DungGeunMo', monospace" }} className="text-xs md:text-sm">
              □
            </span>
          </button>
          <button className="w-6 h-6 md:w-8 md:h-8 bg-red-400 border-2 border-black hover:bg-red-500 transition-colors">
            <span style={{ fontFamily: "'DungGeunMo', monospace" }} className="text-xs md:text-sm">
              X
            </span>
          </button>
        </div>
      </div>

      {/* Menu Bar */}
      <div className="bg-[#f8bbd0] p-1 md:p-2 flex gap-2 md:gap-4 border-b-2 border-[#ec407a] flex-wrap">
        {["파일", "편집", "보기", "삽입", "도움말"].map((menu) => (
          <motion.button
            key={menu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-2 py-1 md:px-3 md:py-1 bg-transparent hover:bg-[#e91e63] hover:text-white transition-colors text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {menu}
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
              transition={{ delay: 0.5 }}
            >
              <h1 
                className="text-[#e91e63] mb-2 md:mb-4 text-base md:text-lg lg:text-xl"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                ★ 픽셀 세상에 오신 것을 환영합니다 ★
              </h1>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-[#fce4ec] to-[#f8bbd0] p-4 md:p-6 border-4 border-[#ec407a] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <p 
                className="text-[#1a0033] text-sm md:text-base mb-3 md:mb-4 leading-relaxed"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                안녕하세요! 여기는 90년대 감성이 가득한 레트로 픽셀 월드입니다.
              </p>
              <p 
                className="text-[#4a0066] text-xs md:text-sm leading-relaxed"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                옛날 컴퓨터의 따뜻한 추억과 감성을 담아 현대적으로 재해석했습니다.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4 md:mt-6">
              {[
                { 
                  title: "음악 감상", 
                  desc: "8비트 레트로 사운드",
                  color: "from-[#e91e63] to-[#f06292]",
                  icon: Coffee
                },
                { 
                  title: "픽셀 아트", 
                  desc: "도트 그래픽의 매력",
                  color: "from-[#9c27b0] to-[#ba68c8]",
                  icon: Palette
                },
                { 
                  title: "추억 일기", 
                  desc: "옛날 감성 그대로",
                  color: "from-[#00bcd4] to-[#4dd0e1]",
                  icon: Book
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9 + i * 0.15 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className={`p-4 md:p-5 bg-gradient-to-br ${item.color} border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer`}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 bg-white border-2 border-black flex items-center justify-center">
                        <Icon className="w-6 h-6 md:w-7 md:h-7 text-[#e91e63]" />
                      </div>
                      <h3 
                        className="text-white text-sm md:text-base"
                        style={{ fontFamily: "'DungGeunMo', monospace" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                    <p 
                      className="text-white/90 text-xs"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>

            {/* Quote Box */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-white p-4 md:p-6 border-4 border-[#9c27b0] shadow-[6px_6px_0px_0px_rgba(156,39,176,0.5)] mt-6"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  <Heart className="w-6 h-6 md:w-8 md:h-8 text-[#e91e63] fill-[#e91e63]" />
                </motion.div>
                <div className="flex-1">
                  <p 
                    className="text-[#4a0066] text-xs md:text-sm mb-2 leading-relaxed"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    "과거의 감성을 현재에 담아, 미래로 이어가는 디지털 아트"
                  </p>
                  <p 
                    className="text-[#e91e63] text-[10px] md:text-xs"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    - 레트로 픽셀 월드 -
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="flex justify-center mt-6"
            >
              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-[#9c27b0]" />
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Status Bar */}
      <div className="bg-[#f8bbd0] p-1 md:p-2 flex justify-between items-center border-t-2 border-[#ec407a] text-xs md:text-sm">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-2 h-2 md:w-3 md:h-3 bg-green-500 border border-black"
          />
          <span style={{ fontFamily: "'DungGeunMo', monospace" }}>준비됨</span>
        </div>
        <span style={{ fontFamily: "'DungGeunMo', monospace" }}>100%</span>
      </div>
    </motion.div>
  );
}
