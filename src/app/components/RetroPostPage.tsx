import { motion } from "motion/react";
import { RetroPostCard } from "./RetroPostCard";
import { RetroPostDetail } from "./RetroPostDetail";
import { RetroMarkdownPost } from "./RetroMarkdownPost";
import { PenTool, Star, Sparkles } from "lucide-react";
import { useState } from "react";
import { loadPosts } from "../posts/loadPosts";
import type { Post } from "../posts/utils";

export function RetroPostPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showMarkdownPost, setShowMarkdownPost] = useState(false);

  // 마크다운 파일에서 posts 로드
  const posts: Post[] = loadPosts();

  // If markdown post is requested
  if (showMarkdownPost) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8 px-4">
        <RetroMarkdownPost onBack={() => setShowMarkdownPost(false)} />
      </div>
    );
  }

  // If a post is selected, show detail view
  if (selectedPost !== null) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
        <RetroPostDetail
          {...posts[selectedPost]}
          onBack={() => setSelectedPost(null)}
        />
      </div>
    );
  }

  // Otherwise show post list
  return (
    <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#9c27b0] via-[#e91e63] to-[#00bcd4] p-4 md:p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] mb-6 md:mb-8"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-6 h-6 md:w-8 md:h-8 text-yellow-300 fill-yellow-300" />
          </motion.div>
          <h1
            className="text-white text-base md:text-xl text-center"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            PIXEL BLOG
          </h1>
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-yellow-300" />
          </motion.div>
        </div>
        <p
          className="text-white/90 text-center text-xs md:text-sm"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          레트로 감성 블로그 • Retro Vibes Only
        </p>
      </motion.div>

      {/* New Post Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mb-6 flex justify-end"
      >
        <motion.button
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
        >
          <PenTool className="w-4 h-4 md:w-5 md:h-5" />
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            새 글쓰기 • Write
          </span>
        </motion.button>
      </motion.div>

      {/* Posts List */}
      <div>
        {/* Featured Markdown Post */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02, y: -5 }}
          onClick={() => setShowMarkdownPost(true)}
          className="mb-6 cursor-pointer"
        >
          <div className="bg-gradient-to-br from-[#FFE4E1] via-white to-[#FFB6C1] border-4 border-[#FF1493] shadow-[8px_8px_0px_0px_rgba(255,20,147,0.5)] overflow-hidden" style={{ imageRendering: "pixelated" }}>
            {/* Featured Badge */}
            <div className="bg-gradient-to-r from-[#FF1493] to-[#FF69B4] px-3 py-2 border-b-3 border-[#C2185B] flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" style={{ imageRendering: "pixelated" }} />
              <span
                className="text-white text-xs"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                FEATURED POST
              </span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4 text-yellow-300" style={{ imageRendering: "pixelated" }} />
              </motion.div>
            </div>

            <div className="p-4 md:p-6">
              <h3
                className="text-[#FF1493] text-base md:text-lg mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                Markdown Examples
              </h3>
              <p
                className="text-[#C2185B] text-sm mb-3"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                마크다운 옵션의 모든 예제 보기 • View examples of all possible Markdown options
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="px-2 py-1 bg-[#FFB6C1] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  web development
                </span>
                <span className="px-2 py-1 bg-[#FFE4E1] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  markdown
                </span>
                <span className="px-2 py-1 bg-[#FFC0CB] border-2 border-[#FF1493] text-[10px]" style={{ fontFamily: "'Press Start 2P', monospace", imageRendering: "pixelated" }}>
                  tutorial
                </span>
              </div>

              <div className="flex items-center gap-4 text-xs text-[#9c27b0]" style={{ fontFamily: "'VT323', monospace" }}>
                <span>👤 You</span>
                <span>📅 2021/3/19</span>
                <span>👁️ 1,234 views</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Regular Posts */}
        {posts.map((post, index) => (
          <RetroPostCard
            key={index}
            {...post}
            delay={0.5 + index * 0.15}
            onClick={() => setSelectedPost(index)}
          />
        ))}
      </div>

      {/* Load More Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="flex justify-center mt-6 md:mt-8 mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="px-6 md:px-8 py-3 md:py-4 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0]"
        >
          <span
            className="text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            LOAD MORE
          </span>
          <div
            className="text-[10px] md:text-xs mt-1"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            더 보기
          </div>
        </motion.button>
      </motion.div>

      {/* Categories Sidebar Box */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.8 }}
        className="bg-white border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] p-4 md:p-6 mb-6"
      >
        <h3
          className="text-[#e91e63] text-sm md:text-base mb-4 pb-2 border-b-2 border-[#fce4ec]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          CATEGORIES
        </h3>
        <div className="grid grid-cols-2 gap-2 md:gap-3">
          {[
            { ko: "픽셀아트", en: "Pixel Art" },
            { ko: "음악", en: "Music" },
            { ko: "게임", en: "Gaming" },
            { ko: "디자인", en: "Design" },
            { ko: "코딩", en: "Coding" },
            { ko: "리뷰", en: "Review" },
          ].map((cat, i) => (
            <motion.button
              key={cat.en}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 2 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 md:p-3 bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-2 border-[#ec407a] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] text-center"
            >
              <div
                className="text-[10px] md:text-xs text-[#e91e63]"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                {cat.en}
              </div>
              <div
                className="text-xs md:text-sm text-[#4a0066] mt-1"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {cat.ko}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}