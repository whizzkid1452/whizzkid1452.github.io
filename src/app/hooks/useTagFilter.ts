import { useState, useEffect } from 'react';
import { loadPosts } from '../../../posts/loadPosts';

export function useTagFilter() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // URL에서 선택된 태그 읽기
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get('tag');
    setSelectedTag(tag);
  }, []);

  // URL 변경 감지 (뒤로가기/앞으로가기)
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const tag = params.get('tag');
      setSelectedTag(tag);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // posts에서 실제 사용된 태그들 추출 및 개수 계산
  const posts = loadPosts();
  const tagCounts = posts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const usedTags = Object.keys(tagCounts).sort();

  // 태그 클릭 핸들러
  const handleTagClick = (tag: string) => {
    const newUrl = `${window.location.pathname}?tag=${encodeURIComponent(tag)}`;
    window.history.pushState({ tag }, '', newUrl);
    setSelectedTag(tag);
  };

  // 태그 필터 제거 핸들러
  const clearTagFilter = () => {
    window.history.pushState({}, '', window.location.pathname);
    setSelectedTag(null);
  };

  return {
    selectedTag,
    usedTags,
    tagCounts,
    handleTagClick,
    clearTagFilter,
  };
}
