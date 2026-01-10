import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, Cloud, Moon, Sun } from "lucide-react";
import clockFace from "../../assets/002dc8cbd4f552ec41b7a16c0b76dd9d24378a61.png";

interface TimeSlot {
  startHour: number;
  endHour: number;
  title: string;
  color: string;
}

export function RetroDateClock() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showTooltip, setShowTooltip] = useState(false);

  // 24시간 일정 데이터
  const [schedule] = useState<TimeSlot[]>([
    { startHour: 0, endHour: 6, title: "sleep 💤", color: "#E8F4F880" },
    { startHour: 6, endHour: 7, title: "요가", color: "#FFF9E380" },
    { startHour: 7, endHour: 8, title: "아침", color: "#E8F5E980" },
    { startHour: 8, endHour: 9, title: "산책", color: "#E3F2FD80" },
    { startHour: 9, endHour: 12, title: "업무", color: "#F3E5F580" },
    { startHour: 12, endHour: 13, title: "점심", color: "#E8F5E980" },
    { startHour: 13, endHour: 14, title: "휴식", color: "#F1F8E980" },
    { startHour: 14, endHour: 17, title: "작업", color: "#E0F2F180" },
    { startHour: 17, endHour: 18, title: "독서", color: "#E1F5FE80" },
    { startHour: 18, endHour: 19, title: "저녁", color: "#F0F4C380" },
    { startHour: 19, endHour: 20, title: "TV", color: "#FFE5B480" },
    { startHour: 20, endHour: 22, title: "취미", color: "#E8EAF680" },
    { startHour: 22, endHour: 24, title: "휴식", color: "#FFE5EC80" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate the month (1-12) and convert to clock position
  // Month 1 = 30 degrees (1 o'clock)
  // Month 2 = 60 degrees (2 o'clock)
  // Month 12 = 0 degrees (12 o'clock)
  const currentMonth = currentDate.getMonth() + 1; // 0-11 to 1-12
  const rotation = currentMonth === 12 ? 0 : currentMonth * 30;

  const formatDate = () => {
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const formatTime = () => {
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const getMonthName = () => {
    const monthsKo = [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월"
    ];
    const monthsEn = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];
    return `${monthsKo[currentDate.getMonth()]} • ${monthsEn[currentDate.getMonth()]}`;
  };

  // 파이 조각 경로 생성
  const createPieSlice = (startHour: number, endHour: number, centerX: number, centerY: number, radius: number) => {
    // 12시 방향을 0도로, 시계방향으로 회전
    const startAngle = (startHour / 24) * 360 - 90;
    const endAngle = (endHour / 24) * 360 - 90;
    
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);
    
    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  // 텍스트 위치 계산
  const getTextPosition = (startHour: number, endHour: number, centerX: number, centerY: number, textRadius: number) => {
    const midHour = (startHour + endHour) / 2;
    const angle = (midHour / 24) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    
    return {
      x: centerX + textRadius * Math.cos(rad),
      y: centerY + textRadius * Math.sin(rad),
      angle: angle + 90,
    };
  };

  return (
    <div className="flex justify-center mb-6 md:mb-8">
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className="relative w-full max-w-2xl md:max-w-4xl lg:max-w-6xl px-4"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {/* Clock Face */}
        <div className="relative w-full mx-auto">
          <motion.img
            src={clockFace}
            alt="Clock Face"
            className="w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />

          {/* 24-Hour Schedule Pie Chart Overlay */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Pie slices */}
            {schedule.map((slot, index) => {
              const centerX = 50;
              const centerY = 50;
              const radius = 38; // 시계 이미지 크기에 맞춤
              const textRadius = 28; // 텍스트 위치
              
              const textPos = getTextPosition(slot.startHour, slot.endHour, centerX, centerY, textRadius);
              
              return (
                <g key={index}>
                  <motion.path
                    d={createPieSlice(slot.startHour, slot.endHour, centerX, centerY, radius)}
                    fill={slot.color}
                    stroke="black"
                    strokeWidth="0.3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.08 }}
                  />
                  
                  {/* Activity text */}
                  <text
                    x={textPos.x}
                    y={textPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
                    style={{ 
                      fontFamily: "'DungGeunMo', monospace",
                      fontSize: slot.endHour - slot.startHour >= 2 ? "3.2px" : "2.4px",
                      fill: "#333",
                      fontWeight: "bold",
                      pointerEvents: "none",
                    }}
                  >
                    {slot.title}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Clock Hand - rotating based on month */}
          <motion.div
            className="absolute top-1/2 left-1/2 w-0 h-0"
            animate={{
              rotate: rotation,
            }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 15,
            }}
          >
            {/* Hand Container */}
            <div className="absolute bottom-0 left-0 -translate-x-1/2" style={{ transformOrigin: "bottom center" }}>
              {/* Pixel Art Clock Hand */}
              <div className="relative flex flex-col items-center">
                {/* Pixel Heart at top */}
                <svg 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  className="md:w-[30px] md:h-[30px] lg:w-[36px] lg:h-[36px] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]"
                  style={{ transform: 'translateY(2px)' }}
                >
                  {/* White Pixel heart */}
                  <rect x="6" y="6" width="3" height="3" fill="#000000"/>
                  <rect x="9" y="6" width="3" height="3" fill="#000000"/>
                  <rect x="15" y="6" width="3" height="3" fill="#000000"/>
                  <rect x="18" y="6" width="3" height="3" fill="#000000"/>
                  
                  <rect x="3" y="9" width="3" height="3" fill="#000000"/>
                  <rect x="6" y="9" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="9" y="9" width="3" height="3" fill="#F5F5F5"/>
                  <rect x="12" y="9" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="15" y="9" width="3" height="3" fill="#F5F5F5"/>
                  <rect x="18" y="9" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="21" y="9" width="3" height="3" fill="#000000"/>
                  
                  <rect x="3" y="12" width="3" height="3" fill="#000000"/>
                  <rect x="6" y="12" width="3" height="3" fill="#F5F5F5"/>
                  <rect x="9" y="12" width="3" height="3" fill="#FFFFFF"/>
                  <rect x="12" y="12" width="3" height="3" fill="#FFFFFF"/>
                  <rect x="15" y="12" width="3" height="3" fill="#FFFFFF"/>
                  <rect x="18" y="12" width="3" height="3" fill="#F5F5F5"/>
                  <rect x="21" y="12" width="3" height="3" fill="#000000"/>
                  
                  <rect x="6" y="15" width="3" height="3" fill="#000000"/>
                  <rect x="9" y="15" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="12" y="15" width="3" height="3" fill="#F5F5F5"/>
                  <rect x="15" y="15" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="18" y="15" width="3" height="3" fill="#000000"/>
                  
                  <rect x="9" y="18" width="3" height="3" fill="#000000"/>
                  <rect x="12" y="18" width="3" height="3" fill="#E0E0E0"/>
                  <rect x="15" y="18" width="3" height="3" fill="#000000"/>
                  
                  <rect x="12" y="21" width="3" height="3" fill="#000000"/>
                </svg>
                
                {/* Pixel stick body */}
                <div className="flex flex-col gap-0">
                  {/* Create pixel blocks for the hand */}
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex gap-0">
                      {/* Left border pixel */}
                      <div className="w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px] bg-black" />
                      
                      {/* White pixels with subtle shading */}
                      <div 
                        className="w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px]"
                        style={{
                          backgroundColor: '#FFFFFF'
                        }}
                      />
                      <div 
                        className="w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px]"
                        style={{
                          backgroundColor: '#E8E8E8'
                        }}
                      />
                      
                      {/* Right border pixel */}
                      <div className="w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px] bg-black" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tooltip */}
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-2 md:-top-3 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
          >
            <div className="bg-gradient-to-br from-[#e91e63] to-[#9c27b0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] px-4 md:px-6 py-2 md:py-3">
              {/* Arrow - pointing down */}
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#9c27b0] border-b-4 border-r-4 border-black rotate-45" />
              
              <div className="relative">
                <div
                  className="text-white text-center text-xs md:text-sm mb-1"
                  style={{ fontFamily: "'Press Start 2P', monospace" }}
                >
                  {formatDate()}
                </div>
                <div
                  className="text-white/90 text-center text-xs md:text-sm"
                  style={{ fontFamily: "'VT323', monospace" }}
                >
                  {formatTime()}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sparkle Effects */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 md:w-4 md:h-4 bg-yellow-300 rounded-full"
            style={{
              top: `${15 + Math.sin(i * Math.PI / 3) * 65}%`,
              left: `${15 + Math.cos(i * Math.PI / 3) * 65}%`,
            }}
            animate={{
              scale: [0, 1.2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              delay: i * 0.4,
              repeat: Infinity,
            }}
          />
        ))}

        {/* Decorative Characters - Top Left (Heart) */}
        <motion.div
          className="absolute -top-6 md:-top-8 left-4 md:left-8"
          animate={{ 
            y: [0, -15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Heart 
            className="w-10 h-10 md:w-14 md:h-14 text-pink-500 fill-pink-400 drop-shadow-lg" 
            strokeWidth={2}
          />
        </motion.div>

        {/* Decorative Characters - Top Right (Sun) */}
        <motion.div
          className="absolute -top-6 md:-top-8 right-4 md:right-8"
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <Sun 
            className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-300 drop-shadow-lg" 
            strokeWidth={2}
          />
        </motion.div>

        {/* Decorative Characters - Bottom Left (Cloud) */}
        <motion.div
          className="absolute -bottom-4 md:-bottom-6 left-8 md:left-12"
          animate={{ 
            x: [0, 10, 0],
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Cloud 
            className="w-12 h-12 md:w-16 md:h-16 text-blue-300 fill-blue-200 drop-shadow-lg" 
            strokeWidth={2}
          />
        </motion.div>

        {/* Decorative Characters - Bottom Right (Moon) */}
        <motion.div
          className="absolute -bottom-4 md:-bottom-6 right-8 md:right-12"
          animate={{ 
            rotate: [0, 20, -20, 0],
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Moon 
            className="w-10 h-10 md:w-14 md:h-14 text-purple-400 fill-purple-300 drop-shadow-lg" 
            strokeWidth={2}
          />
        </motion.div>

        {/* Cute Pixel Star Decorations */}
        <motion.div
          className="absolute top-1/4 -left-4 md:-left-6"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-md">
            <rect x="12" y="4" width="8" height="8" fill="#FFD700" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#FF69B4" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#87CEEB" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#98FB98" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-1/4 -right-4 md:-right-6"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 32 32" className="drop-shadow-md">
            <rect x="12" y="4" width="8" height="8" fill="#9370DB" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#00CED1" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#FF1493" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </motion.div>

        {/* Cute Pixel Character - Bottom Center */}
        <motion.div
          className="absolute -bottom-8 md:-bottom-12 left-1/2 -translate-x-1/2"
          animate={{ 
            y: [0, -8, 0],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg width="48" height="48" viewBox="0 0 48 48" className="drop-shadow-lg">
            {/* Pixel Cat */}
            {/* Ears */}
            <rect x="8" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="32" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            
            {/* Head */}
            <rect x="12" y="16" width="24" height="20" fill="#FFE4E1" stroke="#000" strokeWidth="2" />
            
            {/* Eyes */}
            <rect x="16" y="22" width="4" height="4" fill="#000" />
            <rect x="28" y="22" width="4" height="4" fill="#000" />
            
            {/* Nose */}
            <rect x="22" y="28" width="4" height="2" fill="#FF69B4" />
            
            {/* Whiskers */}
            <line x1="8" y1="26" x2="12" y2="26" stroke="#000" strokeWidth="2" />
            <line x1="36" y1="26" x2="40" y2="26" stroke="#000" strokeWidth="2" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}