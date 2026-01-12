import { motion } from "motion/react";
import { Star } from "lucide-react";
import { RetroPlannerTask } from "./RetroPlannerTask";
import { taskStyles, textStyles, getFontStyle } from "./RetroPlanner.styles";
import type { Task } from "./RetroPlanner.types";

interface RetroPlannerTaskListProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
}

export function RetroPlannerTaskList({ tasks, onToggleTask, onDeleteTask }: RetroPlannerTaskListProps) {
  return (
    <div className="space-y-2">
      {tasks.length > 0 ? (
        tasks.map((task, index) => (
          <RetroPlannerTask
            key={task.id}
            {...task}
            delay={index * 0.1}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))
      ) : (
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
      )}
    </div>
  );
}
