export interface TimeSlot {
  startHour: number;
  endHour: number;
  title: string;
  color: string;
}

export const SCHEDULE: TimeSlot[] = [
  // 12시 방향 (0-6시): react + JS+코테
  { startHour: 0, endHour: 3, title: "react", color: "#F3E5F580" },
  { startHour: 3, endHour: 6, title: "JS+코테", color: "#E3F2FD80" },
  // 3시 방향 (6-12시): VOIX Studio & 프로젝트 + JS+코테
  { startHour: 6, endHour: 9, title: "VOIX Studio & 프로젝트", color: "#E8F5E980" },
  { startHour: 9, endHour: 12, title: "JS+코테", color: "#E3F2FD80" },
  // 6시 방향 (12-18시): fundamentals 적용.
  { startHour: 12, endHour: 18, title: "fundamentals 적용.", color: "#FFF9E380" },
  // 9시 방향 (18-24시): 포폴로비!
  { startHour: 18, endHour: 24, title: "포폴로비!", color: "#FFE5EC80" },
];
