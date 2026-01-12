import { markdownToGuestBook, GuestBookEntry } from './utils';

// Vite의 import.meta.glob을 사용하여 모든 마크다운 파일을 동적으로 로드
const markdownModules = import.meta.glob('./*.md', { as: 'raw', eager: true });

/**
 * 모든 마크다운 파일을 로드하여 GuestBookEntry 배열로 변환
 */
export function loadGuestBooks(): GuestBookEntry[] {
  const entries: GuestBookEntry[] = [];

  for (const [path, content] of Object.entries(markdownModules)) {
    if (typeof content === 'string') {
      // 파일명에서 확장자 제거
      const filename = path.replace('./', '').replace('.md', '');
      const entry = markdownToGuestBook(content, filename);
      entries.push(entry);
    }
  }

  // 날짜순으로 정렬 (최신순)
  return entries.sort((a, b) => {
    // 날짜 문자열을 Date 객체로 변환하여 비교
    const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
    const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
    
    // 날짜가 같으면 시간으로 비교
    if (dateA === dateB) {
      const timeA = a.time.split(':').map(Number);
      const timeB = b.time.split(':').map(Number);
      const timeAValue = timeA[0] * 60 + (timeA[1] || 0);
      const timeBValue = timeB[0] * 60 + (timeB[1] || 0);
      return timeBValue - timeAValue;
    }
    
    return dateB - dateA;
  });
}
