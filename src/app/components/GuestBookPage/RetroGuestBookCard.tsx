import { motion } from "motion/react";
import { Calendar, Clock, Heart, Star, Trash2, MessageSquare } from "lucide-react";

interface GuestBookCardProps {
  id: number;
  date: string;
  time: string;
  name: string;
  message: string;
  emoji?: string;
  delay?: number;
  onClick?: () => void;
  onDelete?: (id: number) => void;
}

export function RetroGuestBookCard({
  id,
  date,
  time,
  name,
  message,
  emoji = "💌",
  delay = 0,
  onClick,
  onDelete,
}: GuestBookCardProps) {
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
      {/* Emoji Header */}
      <div className="bg-gradient-to-r from-[#e91e63] via-[#f06292] to-[#9c27b0] p-2 border-b-4 border-black flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white border-2 border-black flex items-center justify-center text-xl">
            {emoji}
          </div>
          <span
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {name}
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
          <div className="flex items-center gap-[0.25rem]">
            <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
            <span
              className="text-[#9c27b0] text-xs"
              style={{ fontFamily: "'VT323', monospace" }}
            >
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Message Content */}
      <div className="p-4 md:p-5">
        <div className="flex items-start gap-2 mb-2">
          <MessageSquare className="w-4 h-4 text-[#e91e63] mt-1 flex-shrink-0" />
          <p
            className="text-[#1a0033] text-xs md:text-sm leading-relaxed line-clamp-3"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {message}
          </p>
        </div>
      </div>

      {/* Footer Hearts */}
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
            <Heart className="w-3 h-3 text-[#e91e63] fill-[#e91e63] opacity-50" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
