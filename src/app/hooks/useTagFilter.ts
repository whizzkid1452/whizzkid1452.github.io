import { useNavigate, useLocation } from "react-router-dom";
import { loadPosts } from "../../../posts/loadPosts";

export function useTagFilter() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedTags = searchParams.getAll("tag");

  // posts에서 실제 사용된 모든 태그들 추출 (목록 유지를 위해)
  const posts = loadPosts();
  const allTagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags.forEach(tag => allTagsSet.add(tag));
  });
  const usedTags = Array.from(allTagsSet).sort();

  // 현재 선택된 태그들에 기반한 필터링 (AND 로직)
  // RetroPostPage와 동일한 로직을 사용하여 카운트 계산
  const filteredPosts = selectedTags.length > 0
    ? posts.filter((post) => selectedTags.every(tag => post.tags.includes(tag)))
    : posts;

  const tagCounts = filteredPosts.reduce((acc, post) => {
    post.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // 태그 클릭 핸들러 (토글 방식)
  const handleTagClick = (tag: string) => {
    const currentTags = new Set(searchParams.getAll("tag"));
    
    if (currentTags.has(tag)) {
      currentTags.delete(tag);
    } else {
      currentTags.add(tag);
    }

    // 기존 쿼리 파라미터 유지하면서 tag만 업데이트
    // URLSearchParams를 새로 구성하여 tag 파라미터를 재설정
    const newParams = new URLSearchParams(location.search);
    newParams.delete("tag");
    currentTags.forEach(t => newParams.append("tag", t));

    navigate(`/post?${newParams.toString()}`);
  };

  // 태그 필터 제거 핸들러
  const clearTagFilter = () => {
    const newParams = new URLSearchParams(location.search);
    newParams.delete("tag");
    navigate(`/post?${newParams.toString()}`);
  };

  return {
    selectedTags,
    usedTags,
    tagCounts,
    handleTagClick,
    clearTagFilter,
  };
}
