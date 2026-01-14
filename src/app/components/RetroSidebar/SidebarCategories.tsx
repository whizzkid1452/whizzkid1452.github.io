import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronDown, Tag } from "lucide-react";
import { loadPosts } from "../../../../posts/loadPosts";

export function SidebarCategories() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tagSearchQuery, setTagSearchQuery] = useState("");

  // posts에서 실제 사용된 태그들 추출 (중복 제거)
  const posts = loadPosts();
  const usedTags = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort();

  // 검색어로 태그 필터링
  const filteredTags = usedTags.filter((tag) =>
    tag.toLowerCase().includes(tagSearchQuery.toLowerCase())
  );

  // 검색어가 변경되면 표시 개수 초기화
  const handleSearchChange = (query: string) => {
    setTagSearchQuery(query);
  };

  // 토글 핸들러
  const handleToggle = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div className="px-2 pb-2 overflow-x-hidden">
      <div className="bg-white border-4 border-[#ec407a] shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] max-w-full">
        {/* 헤더 (항상 표시) */}
        <motion.button
          onClick={handleToggle}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-between gap-2 p-3 border-b-2 border-[#fce4ec]"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-3 h-3 text-[#e91e63] flex-shrink-0" />
            <h3
              className="text-[#e91e63] text-[10px] truncate"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              CATEGORIES
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-3 h-3 text-[#e91e63] flex-shrink-0" />
          </motion.div>
        </motion.button>

        {/* 펼쳐지는 콘텐츠 */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="p-3">
                {/* 검색 Input */}
                <div className="mb-3 relative max-w-full">
                  <div className="relative">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#e91e63] flex-shrink-0" />
                    <input
                      type="text"
                      value={tagSearchQuery}
                      onChange={(e) => handleSearchChange(e.target.value)}
                      placeholder="Search..."
                      className="w-full max-w-full pl-7 pr-2 py-1.5 border-2 border-[#ec407a] bg-[#fce4ec] text-[#1a0033] text-[10px] focus:outline-none focus:border-[#e91e63]"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    />
                  </div>
                </div>

                {/* 태그 그리드 - 고정 높이 + 스크롤 */}
                {filteredTags.length > 0 ? (
                  <div className="max-h-48 overflow-y-auto overflow-x-hidden pr-1 custom-scrollbar">
                    <div className="grid grid-cols-2 gap-1.5 max-w-full">
                      {filteredTags.map((tag, i) => (
                        <motion.button
                          key={tag}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: i * 0.02, type: "spring" }}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-2 py-1.5 bg-gradient-to-br from-[#f8bbd0] to-[#fce4ec] border-2 border-[#ec407a] shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)] text-center min-w-0"
                        >
                          <div
                            className="text-[9px] text-[#e91e63] truncate"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            {tag}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div
                    className="text-center py-3 text-[#9c27b0] text-[9px] max-w-full"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    결과 없음
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
