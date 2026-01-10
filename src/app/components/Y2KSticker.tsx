import { motion } from "motion/react";

interface Y2KStickerProps {
  type: "star" | "heart" | "cd" | "barbie" | "sparkle" | "phone";
  size?: number;
  rotation?: number;
  className?: string;
}

export function Y2KSticker({ 
  type, 
  size = 60, 
  rotation = 0,
  className = "" 
}: Y2KStickerProps) {
  const renderSticker = () => {
    switch (type) {
      case "star":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
              <linearGradient id="gold-star" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <polygon
              points="50,5 60,40 95,40 67,60 78,95 50,75 22,95 33,60 5,40 40,40"
              fill="url(#gold-star)"
              filter="url(#glow)"
              stroke="#FF8C00"
              strokeWidth="3"
            />
            <polygon
              points="50,15 56,38 75,38 60,50 65,73 50,60 35,73 40,50 25,38 44,38"
              fill="#FFFACD"
              opacity="0.8"
            />
          </svg>
        );
      
      case "heart":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <defs>
              <linearGradient id="pink-heart" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill="url(#pink-heart)"
              stroke="#FF1493"
              strokeWidth="1"
            />
          </svg>
        );
      
      case "cd":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
              <radialGradient id="cd-gradient">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="30%" stopColor="#e0e0e0" />
                <stop offset="60%" stopColor="#c0c0c0" />
                <stop offset="100%" stopColor="#a0a0a0" />
              </radialGradient>
              <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="25%" stopColor="#9370DB" />
                <stop offset="50%" stopColor="#87CEEB" />
                <stop offset="75%" stopColor="#98FB98" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="url(#cd-gradient)" stroke="#666" strokeWidth="2"/>
            <circle cx="50" cy="50" r="40" fill="url(#rainbow)" opacity="0.6"/>
            <circle cx="50" cy="50" r="15" fill="#333" stroke="#000" strokeWidth="2"/>
            <circle cx="50" cy="50" r="8" fill="#000"/>
          </svg>
        );
      
      case "barbie":
        return (
          <div 
            className="font-bold text-pink-600"
            style={{ 
              fontFamily: "'Press Start 2P', monospace",
              fontSize: `${size / 4}px`,
              textShadow: "2px 2px 4px rgba(255, 20, 147, 0.5)"
            }}
          >
            BARBIE
          </div>
        );
      
      case "sparkle":
        return (
          <svg width={size} height={size} viewBox="0 0 24 24">
            <path
              d="M12 0L14 8L22 6L15 12L24 14L16 16L18 24L12 17L6 24L8 16L0 14L9 12L2 6L10 8L12 0Z"
              fill="#FFD700"
              stroke="#FF8C00"
              strokeWidth="0.5"
            />
          </svg>
        );
      
      case "phone":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect x="20" y="10" width="60" height="80" rx="10" fill="#FF69B4" stroke="#FF1493" strokeWidth="3"/>
            <rect x="30" y="20" width="40" height="30" fill="#87CEEB" stroke="#000" strokeWidth="2"/>
            <circle cx="40" cy="65" r="5" fill="#fff"/>
            <circle cx="50" cy="65" r="5" fill="#fff"/>
            <circle cx="60" cy="65" r="5" fill="#fff"/>
            <circle cx="40" cy="75" r="5" fill="#fff"/>
            <circle cx="50" cy="75" r="5" fill="#fff"/>
            <circle cx="60" cy="75" r="5" fill="#fff"/>
          </svg>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`inline-block ${className}`}
      initial={{ opacity: 0, scale: 0, rotate: 0 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        rotate: rotation 
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: rotation + 10,
        transition: { duration: 0.2 }
      }}
      transition={{ type: "spring", stiffness: 200 }}
      style={{
        filter: "drop-shadow(3px 3px 5px rgba(0,0,0,0.3))",
      }}
    >
      {renderSticker()}
    </motion.div>
  );
}
