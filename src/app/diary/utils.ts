import { parseFrontmatter } from '../posts/utils';

/**
 * GuestBookEntry 타입 정의
 */
export interface GuestBookEntry {
  id: number;
  date: string;
  time: string;
  name: string;
  message: string;
  emoji?: string;
}

/**
 * 마크다운 파일을 GuestBookEntry 객체로 변환
 */
export function markdownToGuestBook(
  markdownContent: string,
  filename: string
): GuestBookEntry {
  const { frontmatter, body } = parseFrontmatter(markdownContent);

  // 날짜와 시간 파싱
  const dateStr = frontmatter.date || '';
  const timeStr = frontmatter.time || '';
  
  // 날짜 형식 변환 (YYYY-MM-DD -> YYYY.MM.DD)
  let formattedDate = dateStr;
  if (dateStr.includes('-')) {
    formattedDate = dateStr.replace(/-/g, '.');
  }

  // 파일명에서 타임스탬프 생성 (id용)
  const id = filename.split('-').reduce((acc, part) => {
    const num = parseInt(part, 10);
    return isNaN(num) ? acc : acc * 1000 + num;
  }, 0) || Date.now();

  return {
    id,
    date: formattedDate || new Date().toLocaleDateString("ko-KR").replace(/\. /g, ".").replace(".", ""),
    time: timeStr || new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", hour12: false }),
    name: frontmatter.name || '익명 • Anonymous',
    message: body.trim(),
    emoji: frontmatter.emoji || '💌',
  };
}
