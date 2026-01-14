import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Tag } from "lucide-react";
import { useTagFilter } from "../../hooks/useTagFilter";
import { CategoryTags } from "../shared/CategoryTags";

export function SidebarCategories() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedTag, usedTags, tagCounts, handleTagClick } = useTagFilter();

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
                <CategoryTags
                  tags={usedTags}
                  tagCounts={tagCounts}
                  selectedTag={selectedTag}
                  onTagClick={handleTagClick}
                  variant="sidebar"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
