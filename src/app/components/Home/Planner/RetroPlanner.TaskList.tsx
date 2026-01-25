import { motion } from "motion/react";
import { Star } from "lucide-react";
import { RetroPlannerTask } from "./RetroPlannerTask";
import { taskStyles, textStyles, getFontStyle } from "./RetroPlanner.styles";
import { categoryColors } from "./RetroPlanner.constants";
import type { Task } from "./RetroPlanner.types";

interface RetroPlannerTaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  selectedCategory: string | null;
  onTimeUpdate?: (taskId: number, minutes: number) => void;
}

/**
 * 태스크를 카테고리별로 그룹화
 */
function groupTasksByCategory(tasks: Task[]): Record<string, Task[]> {
  const grouped: Record<string, Task[]> = {};
  
  tasks.forEach((task) => {
    const category = task.category || "기타 Other";
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(task);
  });
  
  return grouped;
}

export function RetroPlannerTaskList({ 
  tasks, 
  onToggleTask, 
  onDeleteTask,
  selectedCategory,
  onTimeUpdate,
}: RetroPlannerTaskListProps) {
  // 카테고리별로 그룹화
  const groupedTasks = groupTasksByCategory(tasks);
  
  // 선택된 카테고리가 있으면 필터링
  const filteredGroupedTasks = selectedCategory
    ? { [selectedCategory]: groupedTasks[selectedCategory] || [] }
    : groupedTasks;
  
  const categoryOrder = [
    "업무 Work",
    "공부 Study",
    "개인 Personal",
    "운동 Exercise",
    "기타 Other",
  ];
  
  // 카테고리 순서대로 정렬
  const sortedCategories = Object.keys(filteredGroupedTasks).sort((a, b) => {
    const indexA = categoryOrder.indexOf(a);
    const indexB = categoryOrder.indexOf(b);
    if (indexA === -1 && indexB === -1) return 0;
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  if (tasks.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={taskStyles.emptyState}
        style={{ imageRendering: "pixelated" }}
      >
        <Star className="w-10 h-10 text-pink-400 mx-auto mb-3 fill-pink-200" style={{ imageRendering: "pixelated" }} />
        <p
          className={textStyles.emptyStateTitle}
          style={getFontStyle("'Press Start 2P'")}
        >
          NO TASKS
        </p>
        <p className={textStyles.emptyStateSubtext} style={getFontStyle("'DungGeunMo'")}>
          할 일을 추가해보세요! • Add your first task!
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      {sortedCategories.map((category, categoryIndex) => {
        const categoryTasks = filteredGroupedTasks[category];
        if (categoryTasks.length === 0) return null;
        
        return (
          <div key={category} className="space-y-2">
            {/* 카테고리 헤더 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
              className="flex items-center gap-2 mb-2"
            >
              <span
                className={`${categoryColors[category] || categoryColors["기타 Other"]} text-white text-[10px] px-2 py-1 border-2 border-black`}
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                {category.split(" ")[0]}
              </span>
              <span
                className="text-xs text-gray-600"
                style={{ fontFamily: "'DungGeunMo', monospace" }}
              >
                ({categoryTasks.length})
              </span>
            </motion.div>
            
            {/* 카테고리별 태스크 목록 */}
            <div className="space-y-2 pl-2">
              {categoryTasks.map((task, taskIndex) => (
                <RetroPlannerTask
                  key={task.id}
                  {...task}
                  delay={(categoryIndex * 0.1) + (taskIndex * 0.05)}
                  onToggle={onToggleTask}
                  onDelete={onDeleteTask}
                  onTimeUpdate={onTimeUpdate}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
