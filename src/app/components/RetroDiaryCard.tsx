import { motion } from "motion/react";
import { Calendar, Clock, Smile, Meh, Frown, Heart, Star, Trash2 } from "lucide-react";

interface DiaryCardProps {
  id: number;
  date: string;
  time: string;
  title: string;
  titleKo?: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
  weather: string;
  delay?: number;
  onClick?: () => void;
  onDelete?: (id: number) => void;
}

export function RetroDiaryCard({
  id,
  date,
  time,
  title,
  titleKo,
  content,
  mood,
  weather,
  delay = 0,
  onClick,
  onDelete,
}: DiaryCardProps) {
  const moodIcons = {
    happy: { icon: Smile, color: "#4caf50", bg: "from-green-400 to-green-500" },
    neutral: { icon: Meh, color: "#ff9800", bg: "from-orange-400 to-orange-500" },
    sad: { icon: Frown, color: "#9c27b0", bg: "from-purple-400 to-purple-500" },
  };

  const MoodIcon = moodIcons[mood].icon;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={onClick}
      className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden cursor-pointer relative group"
    >
      {/* Mood Indicator */}
      <div
        className={`bg-gradient-to-r ${moodIcons[mood].bg} p-2 border-b-4 border-black flex items-center justify-between`}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center">
            <MoodIcon className="w-5 h-5" style={{ color: moodIcons[mood].color }} />
          </div>
          <span
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {weather}
          </span>
        </div>
        <motion.button
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="w-7 h-7 bg-red-500 border-2 border-black hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </motion.button>
      </div>

      {/* Date Header */}
      <div className="bg-[#fce4ec] p-3 border-b-2 border-[#ec407a]">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4 text-[#e91e63]" />
            <span
              className="text-[#e91e63] text-xs md:text-sm"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {date}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4 text-[#9c27b0]" />
            <span
              className="text-[#9c27b0] text-xs"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        <h3
          className="text-[#e91e63] text-sm md:text-base mb-2"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {title}
        </h3>
        {titleKo && (
          <h4
            className="text-[#9c27b0] text-xs md:text-sm mb-3"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {titleKo}
          </h4>
        )}
        <p
          className="text-[#1a0033] text-xs md:text-sm leading-relaxed line-clamp-3"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          {content}
        </p>
      </div>

      {/* Footer Stars */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          >
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400 opacity-50" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
