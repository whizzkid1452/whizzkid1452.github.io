import { motion } from "motion/react";
import collageImage from "../../assets/4adadc70cca45e60d0cca0f9b3c66cee813d1f09.png";

export function Y2KCollageBackground() {
  // Glitter stars positions
  const glitterStars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 30 + 20,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* Main collage background */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src={collageImage}
          alt="Y2K Collage Background"
          className="w-full h-full object-cover opacity-30"
          style={{ imageRendering: "auto" }}
        />
      </motion.div>

      {/* Pink gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-200/80 via-purple-200/70 to-pink-300/80 mix-blend-overlay" />

      {/* Animated glitter stars */}
      {glitterStars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
          }}
        >
          {/* Gold glitter star SVG */}
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`gold-gradient-${star.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD700" />
                <stop offset="50%" stopColor="#FFA500" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
              <filter id={`sparkle-${star.id}`}>
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <polygon
              points="50,5 60,40 95,40 67,60 78,95 50,75 22,95 33,60 5,40 40,40"
              fill={`url(#gold-gradient-${star.id})`}
              filter={`url(#sparkle-${star.id})`}
              stroke="#FF8C00"
              strokeWidth="2"
            />
            {/* Inner highlight */}
            <polygon
              points="50,15 56,38 75,38 60,50 65,73 50,60 35,73 40,50 25,38 44,38"
              fill="#FFFACD"
              opacity="0.7"
            />
          </svg>
        </motion.div>
      ))}

      {/* Floating hearts with pink glitter effect */}
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, y: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -100],
            rotate: [0, 360],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            delay: Math.random() * 5,
            repeat: Infinity,
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24">
            <defs>
              <linearGradient id={`heart-gradient-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF69B4" />
                <stop offset="100%" stopColor="#FF1493" />
              </linearGradient>
            </defs>
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              fill={`url(#heart-gradient-${i})`}
              stroke="#FF1493"
              strokeWidth="0.5"
            />
          </svg>
        </motion.div>
      ))}

      {/* Scattered stickers effect */}
      {Array.from({ length: 10 }).map((_, i) => {
        const shapes = ["⭐", "💖", "✨", "🌟", "💕", "🎀", "💫", "🌸"];
        return (
          <motion.div
            key={`sticker-${i}`}
            className="absolute text-4xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0, 1.2, 0],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 4,
              delay: Math.random() * 8,
              repeat: Infinity,
            }}
          >
            {shapes[i % shapes.length]}
          </motion.div>
        );
      })}

      {/* Pixel noise overlay for Y2K effect */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255, 255, 255, 0.03) 2px,
              rgba(255, 255, 255, 0.03) 4px
            )
          `,
        }}
      />
    </div>
  );
}
