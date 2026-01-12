export interface MonthSlot {
  startMonth: number; // 1-12
  endMonth: number; // 1-12 (exclusive, so 12 means up to but not including 12)
  title: string;
  color: string;
}

export const SCHEDULE: MonthSlot[] = [
  // 12-2월: React 끝내기
  { startMonth: 12, endMonth: 3, title: "React 끝내기", color: "#F3E5F580" },
  // 3-5월: JS Deep Dive, 코테
  { startMonth: 3, endMonth: 6, title: "JS Deep Dive\n코테", color: "#E3F2FD80" },
  // 6-8월: 포폴, 면접 준비
  { startMonth: 6, endMonth: 9, title: "포폴\n면접 준비", color: "#FFE5EC80" },
  // 9-11월: (전체 기간에 걸쳐서 하는 일은 중앙에 표시)
  { startMonth: 9, endMonth: 12, title: "", color: "#E8F5E980" },
];
