import { motion } from "motion/react";
import { Heart, MessageCircle, Share2, Clock, User, Tag } from "lucide-react";
import { useState } from "react";

interface PostCardProps {
  title: string;
  titleKo?: string;
  author: string;
  date: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  color: string;
  delay?: number;
  onClick?: () => void;
}

export function RetroPostCard({
  title,
  titleKo,
  author,
  date,
  content,
  tags,
  likes: initialLikes,
  comments,
  color,
  delay = 0,
  onClick,
}: PostCardProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLike();
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02 }}
      className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden mb-4 md:mb-6 cursor-pointer"
    >
      {/* Header Bar */}
      <div
        className={`bg-gradient-to-r ${color} p-3 md:p-4 border-b-4 border-black`}
        onClick={onClick}
      >
        <h2
          className="text-white text-sm md:text-base mb-1"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {title}
        </h2>
        {titleKo && (
          <h3
            className="text-white/90 text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {titleKo}
          </h3>
        )}
      </div>

      {/* Meta Info */}
      <div className="bg-[#fce4ec] p-2 md:p-3 border-b-2 border-[#ec407a] flex flex-wrap gap-2 md:gap-4 text-xs">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3 md:w-4 md:h-4 text-[#e91e63]" />
          <span style={{ fontFamily: "'DungGeunMo', monospace" }}>
            {author}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 md:w-4 md:h-4 text-[#9c27b0]" />
          <span style={{ fontFamily: "'VT323', monospace" }}>{date}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6">
        <p
          className="text-[#1a0033] text-xs md:text-sm leading-relaxed mb-4"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          {content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <motion.span
              key={tag}
              whileHover={{ scale: 1.1 }}
              className="inline-flex items-center gap-1 px-2 md:px-3 py-1 bg-[#f8bbd0] border-2 border-[#ec407a] text-[10px] md:text-xs"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              <Tag className="w-3 h-3" />
              {tag}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 md:gap-3 pt-4 border-t-2 border-[#fce4ec]">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLikeClick}
            className={`flex items-center gap-2 px-3 md:px-4 py-2 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${
              isLiked
                ? "bg-[#e91e63] text-white"
                : "bg-white text-[#e91e63] hover:bg-[#fce4ec]"
            }`}
          >
            <Heart
              className={`w-4 h-4 md:w-5 md:h-5 ${isLiked ? "fill-current" : ""}`}
            />
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {likes}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0] hover:bg-[#fce4ec] transition-colors"
          >
            <MessageCircle className="w-4 h-4 md:w-5 md:h-5" />
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {comments}
            </span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-[#00bcd4] hover:bg-[#fce4ec] transition-colors ml-auto"
          >
            <Share2 className="w-4 h-4 md:w-5 md:h-5" />
            <span
              className="text-xs md:text-sm hidden md:inline"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              Share
            </span>
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}