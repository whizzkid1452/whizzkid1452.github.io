import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Rocket, Star, Globe } from "lucide-react";
import clockFace from "../../assets/002dc8cbd4f552ec41b7a16c0b76dd9d24378a61.png";
import clockHands from "../../assets/6fbec32352ad5303a91422d16828415111459df1.png";

interface TimeSlot {
  startHour: number;
  endHour: number;
  title: string;
  color: string;
}

export function RetroClockSchedule() {
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 24시간 일정 데이터 (파이 조각으로 표시)
  const [schedule] = useState<TimeSlot[]>([
    { startHour: 0, endHour: 5, title: "sleep 💤", color: "#FFB6E1" },
    { startHour: 5, endHour: 6, title: "wake up", color: "#FFD4E8" },
    { startHour: 6, endHour: 7, title: "요가", color: "#E9AAFF" },
    { startHour: 7, endHour: 8, title: "아침", color: "#FFC9E0" },
    { startHour: 8, endHour: 9, title: "산책", color: "#D4A5FF" },
    { startHour: 9, endHour: 10, title: "업무", color: "#FFB8D4" },
    { startHour: 10, endHour: 11, title: "zoom", color: "#C9A0F0" },
    { startHour: 11, endHour: 12, title: "과제", color: "#FFD1E5" },
    { startHour: 12, endHour: 13, title: "점심", color: "#EAB6FF" },
    { startHour: 13, endHour: 14, title: "휴식", color: "#FFCCE0" },
    { startHour: 14, endHour: 15, title: "작업", color: "#DDB5FF" },
    { startHour: 15, endHour: 16, title: "회의", color: "#FFBDDB" },
    { startHour: 16, endHour: 17, title: "운동", color: "#D0AAFF" },
    { startHour: 17, endHour: 18, title: "독서", color: "#FFD9EA" },
    { startHour: 18, endHour: 19, title: "저녁", color: "#E5BBFF" },
    { startHour: 19, endHour: 20, title: "TV", color: "#FFC4E1" },
    { startHour: 20, endHour: 21, title: "취미", color: "#D9B0FF" },
    { startHour: 21, endHour: 22, title: "정리", color: "#FFD8E6" },
    { startHour: 22, endHour: 24, title: "휴식", color: "#E0B8FF" },
  ]);

  const [checklist] = useState([
    { time: "10:00", task: "Zoom 수업", done: false },
    { time: "14:00", task: "과제 제출", done: false },
    { time: "16:00", task: "운동하기", done: true },
    { time: "", task: "독서", done: true },
  ]);

  // 파이 조각 경로 생성
  const createPieSlice = (startHour: number, endHour: number) => {
    const centerX = 200;
    const centerY = 200;
    const radius = 160;
    
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
  const getTextPosition = (startHour: number, endHour: number) => {
    const centerX = 200;
    const centerY = 200;
    const textRadius = 100;
    
    const midHour = (startHour + endHour) / 2;
    const angle = (midHour / 24) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    
    return {
      x: centerX + textRadius * Math.cos(rad),
      y: centerY + textRadius * Math.sin(rad),
      angle: angle + 90,
    };
  };

  // 시간 마커 위치
  const getHourMarkerPosition = (hour: number) => {
    const centerX = 200;
    const centerY = 200;
    const radius = 175;
    
    const angle = (hour / 24) * 360 - 90;
    const rad = (angle * Math.PI) / 180;
    
    return {
      x: centerX + radius * Math.cos(rad),
      y: centerY + radius * Math.sin(rad),
    };
  };

  return (
    <div className="flex justify-center mb-8 px-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.3 }}
        className="relative w-full max-w-2xl"
      >
        {/* Title */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
        >
          <div
            className="text-2xl md:text-3xl text-purple-900 mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            TODAY'S PLANNER
          </div>
          <div className="h-1 w-32 md:w-48 bg-black mx-auto" />
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          className="absolute -top-8 left-4 md:left-8"
          animate={{ y: [0, -10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Rocket className="w-12 h-12 md:w-16 md:h-16 text-purple-600" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute -top-4 right-4 md:right-12"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <div className="relative w-12 h-12 md:w-16 md:h-16">
            <div className="absolute inset-0 rounded-full border-4 border-pink-400" />
            <div className="absolute top-1/2 left-1/2 w-20 h-2 bg-pink-400 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-24 md:bottom-32 right-2 md:right-8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-400 fill-yellow-400" />
        </motion.div>

        {/* Clock Circle Container */}
        <div className="relative mx-auto" style={{ width: "min(90vw, 500px)", height: "min(90vw, 500px)" }}>
          {/* Background Clock Image - Fill the container */}
          <motion.img
            src={clockFace}
            alt="Clock Background"
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              width: "120%",
              height: "120%",
              left: "-10%",
              top: "-10%",
              objectFit: "cover"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />
          
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full relative z-10"
          >
            {/* No outer circle - fully transparent background */}
            
            {/* Pie slices */}
            {schedule.map((slot, index) => {
              const textPos = getTextPosition(slot.startHour, slot.endHour);
              
              return (
                <g key={index}>
                  <motion.path
                    d={createPieSlice(slot.startHour, slot.endHour)}
                    fill={slot.color}
                    stroke="black"
                    strokeWidth="2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    whileHover={{ opacity: 0.8 }}
                    style={{ cursor: "pointer" }}
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
                      fontSize: slot.endHour - slot.startHour >= 3 ? "14px" : "11px",
                      fill: "#333",
                      pointerEvents: "none"
                    }}
                  >
                    {slot.title}
                  </text>
                </g>
              );
            })}

            {/* Hour markers (1-12 twice for 24 hours) */}
            {[...Array(24)].map((_, i) => {
              const pos = getHourMarkerPosition(i);
              const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i;
              
              return (
                <g key={i}>
                  <circle cx={pos.x} cy={pos.y} r="8" fill="white" stroke="black" strokeWidth="2" />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    style={{
                      fontFamily: "'Press Start 2P', monospace",
                      fontSize: "8px",
                      fill: "#333",
                      pointerEvents: "none"
                    }}
                  >
                    {displayHour}
                  </text>
                </g>
              );
            })}

            {/* Center dot */}
            <circle cx="200" cy="200" r="10" fill="white" stroke="black" strokeWidth="3" />
            <circle cx="200" cy="200" r="6" fill="black" />
          </svg>

          {/* Clock Hands Image Overlay */}
          <motion.img
            src={clockHands}
            alt="Clock Hands"
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{
              width: "80%",
              height: "80%",
              transform: "translate(-50%, -50%)",
              objectFit: "contain",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          />
        </div>

        {/* Decorative character and globe */}
        <motion.div
          className="absolute bottom-24 md:bottom-32 left-2 md:left-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <Globe className="w-10 h-10 md:w-12 md:h-12 text-blue-500" strokeWidth={1.5} />
        </motion.div>

        <motion.div
          className="absolute bottom-8 md:bottom-12 left-8 md:left-16"
          animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="relative">
            {/* Cute ghost character */}
            <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-lg">
              {/* Body */}
              <path
                d="M 10 30 Q 10 10, 30 10 Q 50 10, 50 30 L 50 60 Q 45 55, 40 60 Q 35 65, 30 60 Q 25 55, 20 60 Q 15 65, 10 60 Z"
                fill="white"
                stroke="black"
                strokeWidth="2"
              />
              {/* Eyes */}
              <circle cx="22" cy="28" r="4" fill="black" />
              <circle cx="38" cy="28" r="4" fill="black" />
              {/* Mouth */}
              <path d="M 24 38 Q 30 42, 36 38" stroke="black" strokeWidth="2" fill="none" />
              {/* Blush */}
              <circle cx="15" cy="35" r="3" fill="#FFB6C1" opacity="0.6" />
              <circle cx="45" cy="35" r="3" fill="#FFB6C1" opacity="0.6" />
              {/* Hand waving */}
              <ellipse cx="55" cy="35" rx="8" ry="12" fill="white" stroke="black" strokeWidth="2" />
            </svg>
          </div>
        </motion.div>

        {/* Today's Checklist */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 bg-gradient-to-br from-pink-100 to-purple-100 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-6"
        >
          <div
            className="text-center text-xl md:text-2xl mb-6 text-purple-900"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            TODAY'S CHECKLIST
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {checklist.map((item, index) => (
              <motion.div
                key={index}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-3 bg-white border-3 border-black p-3"
                whileHover={{ x: 4 }}
              >
                <div
                  className={`w-6 h-6 border-3 border-black flex items-center justify-center cursor-pointer ${
                    item.done ? "bg-pink-400" : "bg-white"
                  }`}
                >
                  {item.done && (
                    <svg viewBox="0 0 24 24" className="w-4 h-4">
                      <path
                        d="M 4 12 L 10 18 L 20 6"
                        stroke="white"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="square"
                      />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  {item.time && (
                    <span
                      className="text-xs text-purple-600 mr-2"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      {item.time}
                    </span>
                  )}
                  <span
                    className={`text-sm md:text-base ${item.done ? "line-through opacity-60" : ""}`}
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    {item.task}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}