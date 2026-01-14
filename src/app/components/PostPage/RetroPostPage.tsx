import { motion } from "motion/react";
import { RetroPostCard } from "./RetroPostCard";
import { RetroPostDetail } from "./RetroPostDetail";
import { RetroMarkdownPost } from "./MarkdownPosts/RetroMarkdownPost";
import { PenTool, Star, Sparkles, X } from "lucide-react";
import { useState, useEffect } from "react";
import { loadPosts } from "../../../../posts/loadPosts";
import type { Post } from "../../../../posts/utils";
import { useTagFilter } from "../../hooks/useTagFilter";
import { CategoryTags } from "../shared/CategoryTags";

export function RetroPostPage() {
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [showMarkdownPost, setShowMarkdownPost] = useState(false);
  
  // 태그 필터 훅 사용
  const { selectedTag, usedTags, tagCounts, handleTagClick, clearTagFilter } = useTagFilter();

  // 마크다운 파일에서 posts 로드
  const allPosts: Post[] = loadPosts();

  // 선택된 태그로 필터링된 포스트
  const posts: Post[] = selectedTag
    ? allPosts.filter((post) => post.tags.includes(selectedTag))
    : allPosts;

  // URL에서 포스트 ID 읽기 및 초기화
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get('post');
    const isMarkdown = params.get('view') === 'markdown';

    if (isMarkdown) {
      setShowMarkdownPost(true);
    } else if (postId) {
      // 포스트 제목으로 인덱스 찾기
      const postIndex = allPosts.findIndex(
        (post) => createPostSlug(post.title) === postId
      );
      if (postIndex !== -1) {
        setSelectedPost(postIndex);
      }
    }
  }, [allPosts]);

  // 브라우저 뒤로가기/앞으로가기 처리
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const postId = params.get('post');
      const isMarkdown = params.get('view') === 'markdown';

      if (isMarkdown) {
        setShowMarkdownPost(true);
        setSelectedPost(null);
      } else if (postId) {
        const postIndex = allPosts.findIndex(
          (post) => createPostSlug(post.title) === postId
        );
        setSelectedPost(postIndex !== -1 ? postIndex : null);
        setShowMarkdownPost(false);
      } else {
        setSelectedPost(null);
        setShowMarkdownPost(false);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [allPosts]);

  // 포스트 제목을 URL 친화적인 slug로 변환
  const createPostSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9가-힣]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  // 포스트 선택 핸들러 (URL 업데이트 포함)
  const handleSelectPost = (index: number) => {
    const post = posts[index];
    const slug = createPostSlug(post.title);
    // 선택된 태그가 있으면 유지
    const params = new URLSearchParams();
    params.set('post', slug);
    if (selectedTag) {
      params.set('tag', selectedTag);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({ postIndex: index }, '', newUrl);
    setSelectedPost(index);
  };

  // 마크다운 포스트 표시 핸들러
  const handleShowMarkdownPost = () => {
    const newUrl = `${window.location.pathname}?view=markdown`;
    window.history.pushState({ markdown: true }, '', newUrl);
    setShowMarkdownPost(true);
  };

  // 목록으로 돌아가기 핸들러
  const handleBackToList = () => {
    // 선택된 태그가 있으면 유지
    const url = selectedTag
      ? `${window.location.pathname}?tag=${encodeURIComponent(selectedTag)}`
      : window.location.pathname;
    window.history.pushState({}, '', url);
    setSelectedPost(null);
    setShowMarkdownPost(false);
  };


  // If markdown post is requested
  if (showMarkdownPost) {
    return (
      <div className="w-full max-w-5xl mx-auto mt-6 md:mt-8 px-4">
        <RetroMarkdownPost onBack={handleBackToList} />
      </div>
    );
  }

  // If a post is selected, show detail view
  if (selectedPost !== null) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-6 md:mt-8 px-4">
        <RetroPostDetail
          {...posts[selectedPost]}
          onBack={handleBackToList}
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

      {/* Selected Tag Filter Badge */}
      {selectedTag && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-[#e91e63] to-[#f06292] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]">
            <span
              className="text-white text-xs md:text-sm flex-1"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              필터: {selectedTag} ({posts.length}개 포스트)
            </span>
            <motion.button
              onClick={clearTagFilter}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="p-1 bg-white border-2 border-black hover:bg-[#fce4ec] transition-colors"
            >
              <X className="w-4 h-4 text-[#e91e63]" />
            </motion.button>
          </div>
        </motion.div>
      )}

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
          onClick={handleShowMarkdownPost}
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
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <RetroPostCard
              key={index}
              {...post}
              delay={0.5 + index * 0.15}
              onClick={() => handleSelectPost(index)}
            />
          ))
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 px-4"
          >
            <div className="bg-white border-4 border-[#ec407a] shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)] p-8">
              <p
                className="text-[#9c27b0] text-sm md:text-base mb-2"
                style={{ fontFamily: "'Press Start 2P', monospace" }}
              >
                NO POSTS FOUND
              </p>
              <p
                className="text-[#4a0066] text-xs md:text-sm"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                선택한 태그에 해당하는 포스트가 없습니다
              </p>
            </div>
          </motion.div>
        )}
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

        <CategoryTags
          tags={usedTags}
          tagCounts={tagCounts}
          selectedTag={selectedTag}
          onTagClick={handleTagClick}
          variant="page"
        />
      </motion.div>
    </div>
  );
}