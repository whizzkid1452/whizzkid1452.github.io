import { motion } from "motion/react";
import { Clock } from "lucide-react";
import { categoryColors } from "./RetroPlanner.constants";
import { getFontStyle } from "./RetroPlanner.styles";
import type { Task } from "./RetroPlanner.types";

const categoryColorValues: Record<string, string> = {
  "업무 Work": "#e91e63",
  "공부 Study": "#9c27b0",
  "개인 Personal": "#00bcd4",
  "운동 Exercise": "#4caf50",
  "기타 Other": "#ff9800",
};

interface RetroPlannerCategoryStatsProps {
  tasks: Task[];
}

/**
 * 분을 시간:분 형식으로 변환
 */
function formatTrackedTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
}

/**
 * 카테고리별 시간 통계를 계산
 */
function calculateCategoryStats(tasks: Task[]): Record<string, number> {
  const stats: Record<string, number> = {};
  
  tasks.forEach((task) => {
    const category = task.category || "기타 Other";
    const trackedTime = task.trackedTime || 0;
    stats[category] = (stats[category] || 0) + trackedTime;
  });
  
  return stats;
}

export function RetroPlannerCategoryStats({ tasks }: RetroPlannerCategoryStatsProps) {
  const categoryStats = calculateCategoryStats(tasks);
  const totalTrackedTime = Object.values(categoryStats).reduce((sum, time) => sum + time, 0);
  
  // 추적된 시간이 없으면 표시하지 않음
  if (totalTrackedTime === 0) {
    return null;
  }
  
  const categoryOrder = [
    "업무 Work",
    "공부 Study",
    "개인 Personal",
    "운동 Exercise",
    "기타 Other",
  ];
  
  const sortedCategories = Object.keys(categoryStats)
    .filter((category) => categoryStats[category] > 0)
    .sort((a, b) => {
      const indexA = categoryOrder.indexOf(a);
      const indexB = categoryOrder.indexOf(b);
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-3 md:p-4 mb-4"
    >
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-[#00bcd4]" />
        <h3
          className="text-[#00bcd4] text-xs md:text-sm"
          style={getFontStyle("'DungGeunMo'")}
        >
          시간 통계 • Time Stats
        </h3>
      </div>
      
      <div className="space-y-2">
        {sortedCategories.map((category, index) => {
          const trackedTime = categoryStats[category];
          const percentage = totalTrackedTime > 0 
            ? Math.round((trackedTime / totalTrackedTime) * 100) 
            : 0;
          
          return (
            <motion.div
              key={category}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <span
                className={`${categoryColors[category] || categoryColors["기타 Other"]} text-white text-[10px] px-2 py-1 border-2 border-black flex-shrink-0`}
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {category.split(" ")[0]}
              </span>
              
              <div className="flex-1 bg-gray-200 border-2 border-black h-4 relative overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full"
                  style={{
                    backgroundColor: categoryColorValues[category] || categoryColorValues["기타 Other"],
                  }}
                />
              </div>
              
              <span
                className="text-[10px] text-gray-700 flex-shrink-0 min-w-[50px] text-right"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {formatTrackedTime(trackedTime)}
              </span>
            </motion.div>
          );
        })}
      </div>
      
      {/* 총 시간 */}
      <div className="mt-3 pt-3 border-t-2 border-gray-300 flex items-center justify-between">
        <span
          className="text-xs text-gray-600"
          style={{ fontFamily: "'DungGeunMo', monospace" }}
        >
          총 시간 • Total
        </span>
        <span
          className="text-xs font-bold text-[#00bcd4]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {formatTrackedTime(totalTrackedTime)}
        </span>
      </div>
    </motion.div>
  );
}
