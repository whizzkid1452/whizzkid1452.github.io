import React from "react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, Cloud, Moon, Sun } from "lucide-react";
import clockFace from "../../../../assets/clock.svg";
import { ClockHand } from "./RetroDateClock.ClockHand";
import { SchedulePieChart } from "./RetroDateClock.SchedulePieChart";
import { ClockTooltip } from "./RetroDateClock.Tooltip";
import { calculateMonthRotation } from "./RetroDateClock.utils";
import { mainContainerStyles, decorativeStyles, getSparklePosition } from "./RetroDateClock.styles";

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
    <div className={mainContainerStyles.wrapper}>
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
        className={mainContainerStyles.container}
      >
        {/* Clock Face */}
        <ClockTooltip date={currentDate}>
          <div className={mainContainerStyles.clockFace}>
            <motion.img
              src={clockFace}
              alt="Clock Face"
              className={mainContainerStyles.clockImage}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />

            {/* 24-Hour Schedule Pie Chart Overlay */}
            <SchedulePieChart />

            {/* Clock Hand - rotating based on month */}
            <ClockHand rotation={rotation} date={currentDate} />
          </div>
        </ClockTooltip>

        {/* Sparkle Effects */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className={decorativeStyles.sparkle}
            style={getSparklePosition(i)}
          />
        ))}

        {/* Decorative Characters - Top Left (Heart) */}
        <div className={decorativeStyles.heart}>
          <Heart
            className="w-10 h-10 md:w-14 md:h-14 text-pink-500 fill-pink-400 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Top Right (Sun) */}
        <div className={decorativeStyles.sun}>
          <Sun
            className="w-12 h-12 md:w-16 md:h-16 text-yellow-400 fill-yellow-300 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Bottom Left (Cloud) */}
        <div className={decorativeStyles.cloud}>
          <Cloud
            className="w-12 h-12 md:w-16 md:h-16 text-blue-300 fill-blue-200 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Decorative Characters - Bottom Right (Moon) */}
        <div className={decorativeStyles.moon}>
          <Moon
            className="w-10 h-10 md:w-14 md:h-14 text-purple-400 fill-purple-300 drop-shadow-lg"
            strokeWidth={2}
          />
        </div>

        {/* Cute Pixel Star Decorations */}
        <div className={decorativeStyles.starLeft}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="12" y="4" width="8" height="8" fill="#FFD700" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#FF69B4" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#87CEEB" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#98FB98" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        <div className={decorativeStyles.starRight}>
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect x="12" y="4" width="8" height="8" fill="#9370DB" stroke="#000" strokeWidth="2" />
            <rect x="4" y="12" width="8" height="8" fill="#00CED1" stroke="#000" strokeWidth="2" />
            <rect x="20" y="12" width="8" height="8" fill="#FFB6C1" stroke="#000" strokeWidth="2" />
            <rect x="12" y="20" width="8" height="8" fill="#FF1493" stroke="#000" strokeWidth="2" />
            <rect x="12" y="12" width="8" height="8" fill="#FFF" stroke="#000" strokeWidth="2" />
          </svg>
        </div>

        {/* Cute Pixel Character - Bottom Center */}
        <div className={decorativeStyles.pixelCharacter}>
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
    </div>
  );
}
