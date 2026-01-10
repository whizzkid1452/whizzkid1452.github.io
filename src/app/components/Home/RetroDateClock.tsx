import { motion } from "motion/react";
import { useState, useEffect, memo } from "react";
import { Heart, Cloud, Moon, Sun } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import clockFace from "../../../assets/clock.svg";

interface TimeSlot {
  startHour: number;
  endHour: number;
  title: string;
  color: string;
}

const SCHEDULE: TimeSlot[] = [
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
];

// 파이 조각 경로 생성
function createPieSlice(
  startHour: number,
  endHour: number,
  centerX: number,
  centerY: number,
  radius: number
): string {
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
}

// 텍스트 위치 계산
function getTextPosition(
  startHour: number,
  endHour: number,
  centerX: number,
  centerY: number,
  textRadius: number
) {
  const midHour = (startHour + endHour) / 2;
  const angle = (midHour / 24) * 360 - 90;
  const rad = (angle * Math.PI) / 180;

  return {
    x: centerX + textRadius * Math.cos(rad),
    y: centerY + textRadius * Math.sin(rad),
    angle: angle + 90,
  };
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

function formatTime(date: Date): string {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function calculateMonthRotation(month: number): number {
  return month === 12 ? 0 : month * 30;
}

// 시계바늘 컴포넌트
const ClockHand = memo(function ClockHand({ rotation }: { rotation: number }) {
  const [handLength, setHandLength] = useState(20);

  useEffect(() => {
    const updateHandLength = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setHandLength(15);
      } else if (width < 1024) {
        setHandLength(18);
      } else {
        setHandLength(20);
      }
    };

    updateHandLength();
    window.addEventListener("resize", updateHandLength);

    return () => window.removeEventListener("resize", updateHandLength);
  }, []);

  return (
    <div
      className="absolute top-1/2 left-1/2 w-0 h-0"
      style={{
        transform: `rotate(${rotation}deg)`,
        transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
    >
      <div className="absolute bottom-0 left-0 -translate-x-1/2 origin-bottom">
        <div className="relative flex flex-col items-center">
          {/* Pixel Heart at top */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 md:w-[30px] md:h-[30px] lg:w-9 lg:h-9 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] drop-shadow-[0_0_8px_rgba(255,105,180,0.6)] translate-y-[2px] transition-all duration-300 animate-[heartPulse_1.5s_ease-in-out_infinite]"
            style={{
              animation: "heartPulse 1.5s ease-in-out infinite",
            }}
          >
            <defs>
              <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="50%" stopColor="#FF1493" />
                <stop offset="100%" stopColor="#FF69B4" />
              </linearGradient>
              <filter id="heartGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Glow effect */}
            <rect x="6" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="9" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="15" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            <rect x="18" y="6" width="3" height="3" fill="#FF69B4" opacity="0.3" filter="url(#heartGlow)" />
            {/* Main heart */}
            <rect x="6" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="9" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="15" y="6" width="3" height="3" fill="#9c27b0" />
            <rect x="18" y="6" width="3" height="3" fill="#9c27b0" />

            <rect x="3" y="9" width="3" height="3" fill="#9c27b0" />
            <rect x="6" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="9" y="9" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="12" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="15" y="9" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="18" y="9" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="21" y="9" width="3" height="3" fill="#9c27b0" />

            <rect x="3" y="12" width="3" height="3" fill="#9c27b0" />
            <rect x="6" y="12" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="9" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="12" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="15" y="12" width="3" height="3" fill="url(#heartGradient)" />
            <rect x="18" y="12" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="21" y="12" width="3" height="3" fill="#9c27b0" />

            <rect x="6" y="15" width="3" height="3" fill="#9c27b0" />
            <rect x="9" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="12" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.9" />
            <rect x="15" y="15" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="18" y="15" width="3" height="3" fill="#9c27b0" />

            <rect x="9" y="18" width="3" height="3" fill="#9c27b0" />
            <rect x="12" y="18" width="3" height="3" fill="url(#heartGradient)" opacity="0.8" />
            <rect x="15" y="18" width="3" height="3" fill="#9c27b0" />

            <rect x="12" y="21" width="3" height="3" fill="#9c27b0" />
          </svg>

          {/* Pixel stick body */}
          <div className="flex flex-col gap-0 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.3)]">
            {[...Array(handLength)].map((_, i) => {
              const opacity = 1 - (i / handLength) * 0.3;
              return (
                <div key={i} className="flex gap-0">
                  {/* Left border pixel */}
                  <div
                    className="w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px]"
                    style={{
                      background: "linear-gradient(to bottom, #FF1493, #9c27b0)",
                      boxShadow: "0 0 2px rgba(255, 20, 147, 0.5)",
                    }}
                  />
                  {/* White pixel with gradient */}
                  <div
                    className="w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px] transition-colors duration-200"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 105, 180, ${opacity * 0.1}), rgba(255, 255, 255, ${opacity}))`,
                    }}
                  />
                  {/* Gray pixel with gradient */}
                  <div
                    className="w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px] transition-colors duration-200"
                    style={{
                      background: `linear-gradient(to bottom, rgba(255, 20, 147, ${opacity * 0.15}), rgba(232, 232, 232, ${opacity}))`,
                    }}
                  />
                  {/* Right border pixel */}
                  <div
                    className="w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px]"
                    style={{
                      background: "linear-gradient(to bottom, #FF1493, #9c27b0)",
                      boxShadow: "0 0 2px rgba(255, 20, 147, 0.5)",
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

// 파이 차트 컴포넌트
const SchedulePieChart = memo(function SchedulePieChart() {
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 42; // 참고 파일과 동일
  const textRadius = 32; // 참고 파일과 동일

  return (
    <svg
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none block"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {SCHEDULE.map((slot, index) => {
        const textPos = getTextPosition(
          slot.startHour,
          slot.endHour,
          centerX,
          centerY,
          textRadius
        );

        return (
          <g key={index}>
            <path
              className="opacity-0 animate-[fadeInPie_0.6s_ease-out_forwards]"
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startHour, slot.endHour, centerX, centerY, radius)}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
            />
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
              className="fill-[#333] font-bold pointer-events-none"
              style={{
                fontFamily: "'DungGeunMo', monospace",
                fontSize: slot.endHour - slot.startHour >= 2 ? "3.2px" : "2.4px",
              }}
            >
              {slot.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
});

// 툴팁 컴포넌트
function ClockTooltip({ date, children }: { date: Date; children: React.ReactNode }) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-gradient-to-br from-[#e91e63] to-[#9c27b0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] px-4 py-2 md:px-6 md:py-3 relative z-50 animate-[tooltipFadeIn_0.2s_ease-out]"
            side="bottom"
            sideOffset={8}
          >
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#9c27b0] border-b-4 border-r-4 border-black rotate-45" />
            <div>
              <div
                className="text-white text-center text-xs md:text-sm mb-1"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {formatDate(date)}
              </div>
              <div
                className="text-white/90 text-center text-xs md:text-sm"
                style={{ fontFamily: "'VT323', monospace" }}
              >
                {formatTime(date)}
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export function RetroDateClock() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentMonth = currentDate.getMonth() + 1;
  const rotation = calculateMonthRotation(currentMonth);

  return (
    <div className="flex justify-center mb-10 mt-4 md:mb-12 md:mt-6">
      <ClockTooltip date={currentDate}>
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
          className="relative w-full max-w-[20rem] px-4 mx-auto md:max-w-[43rem]"
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
            <SchedulePieChart />

            {/* Clock Hand - rotating based on month */}
            <ClockHand rotation={rotation} />
          </div>

        {/* Sparkle Effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute w-3 h-3 md:w-4 md:h-4 bg-[#fde047] rounded-full animate-[sparkle_2.5s_ease-in-out_infinite]"
            style={{
              top: `${15 + Math.sin(i * Math.PI / 3) * 65}%`,
              left: `${15 + Math.cos(i * Math.PI / 3) * 65}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}

        {/* Decorative Characters - Top Left (Heart) */}
        <div className="absolute -top-6 left-4 md:-top-8 md:left-8 animate-[floatUpDown_3s_ease-in-out_infinite,floatScale_3s_ease-in-out_infinite]">
          <Heart
            className="w-10 h-10 md:w-14 md:h-14 text-pink-500 fill-pink-400 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Top Right (Sun) */}
        <div className="absolute -top-6 right-4 md:-top-8 md:right-8 animate-[rotate_15s_linear_infinite]">
          <Sun
            className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-300 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Bottom Left (Cloud) */}
        <div className="absolute -bottom-4 left-8 md:-bottom-6 md:left-12 animate-[floatLeftRight_4s_ease-in-out_infinite]">
          <Cloud
            className="w-12 h-12 md:w-16 md:h-16 text-blue-300 fill-blue-200 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Bottom Right (Moon) */}
        <div className="absolute -bottom-4 right-8 md:-bottom-6 md:right-12 animate-[rotateSwing_5s_ease-in-out_infinite]">
          <Moon
            className="w-10 h-10 md:w-14 md:h-14 text-purple-400 fill-purple-300 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Cute Pixel Star Decorations */}
        <div className="absolute top-1/4 -left-4 md:-left-6 drop-shadow-md animate-[starScaleRotate_4s_ease-in-out_infinite]">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="12" y="4" width="8" height="8" fill="#FFD700" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#FF69B4" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#87CEEB" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#98FB98" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        <div className="absolute top-1/4 -right-4 md:-right-6 drop-shadow-md animate-[starScaleRotateReverse_4s_ease-in-out_infinite]">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="12" y="4" width="8" height="8" fill="#9370DB" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#00CED1" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#FF1493" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        {/* Cute Pixel Character - Bottom Center */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 md:-bottom-12 drop-shadow-lg animate-[catFloat_2s_ease-in-out_infinite]">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <rect x="8" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="32" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="12" y="16" width="24" height="20" fill="#FFE4E1" stroke="#000" strokeWidth="2" />
            <rect x="16" y="22" width="4" height="4" fill="#000" />
            <rect x="28" y="22" width="4" height="4" fill="#000" />
            <rect x="22" y="28" width="4" height="2" fill="#FF69B4" />
            <line x1="8" y1="26" x2="12" y2="26" stroke="#000" strokeWidth="2" />
            <line x1="36" y1="26" x2="40" y2="26" stroke="#000" strokeWidth="2" />
          </svg>
        </div>
      </motion.div>
      </ClockTooltip>
    </div>
  );
}
