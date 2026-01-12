import { useState, useEffect, memo } from "react";
import {
  clockHandStyles,
  heartIconStyles,
  getHandTransform,
  getBorderGradient,
  getWhitePixelGradient,
  getGrayPixelGradient,
} from "./RetroDateClock.styles";

interface ClockHandProps {
  rotation: number;
  date: Date;
}

export const ClockHand = memo(function ClockHand({ rotation, date }: ClockHandProps) {
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
      className={clockHandStyles.container}
      style={getHandTransform(rotation)}
    >
      <div className={clockHandStyles.handContainer}>
        <div className="relative flex flex-col items-center">
          {/* Pixel Heart at top */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={heartIconStyles.container}
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
                <div key={i} className={clockHandStyles.pixelRow}>
                  {/* Left border pixel */}
                  <div
                    className={clockHandStyles.leftBorder}
                    style={getBorderGradient()}
                  />
                  {/* White pixel with gradient */}
                  <div
                    className={clockHandStyles.whitePixel}
                    style={getWhitePixelGradient(opacity)}
                  />
                  {/* Gray pixel with gradient */}
                  <div
                    className={clockHandStyles.grayPixel}
                    style={getGrayPixelGradient(opacity)}
                  />
                  {/* Right border pixel */}
                  <div
                    className={clockHandStyles.rightBorder}
                    style={getBorderGradient()}
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
