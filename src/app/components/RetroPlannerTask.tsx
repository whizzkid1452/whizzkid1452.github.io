import { motion } from "motion/react";
import { Check, Trash2, Star, Circle } from "lucide-react";

interface PlannerTaskProps {
  id: number;
  title: string;
  time: string;
  category: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  delay?: number;
}

export function RetroPlannerTask({
  id,
  title,
  time,
  category,
  priority,
  completed,
  onToggle,
  onDelete,
  delay = 0,
}: PlannerTaskProps) {
  const priorityColors = {
    high: { bg: "from-red-400 to-red-500", border: "border-red-600", text: "text-red-600" },
    medium: { bg: "from-orange-400 to-orange-500", border: "border-orange-600", text: "text-orange-600" },
    low: { bg: "from-green-400 to-green-500", border: "border-green-600", text: "text-green-600" },
  };

  const categoryColors: Record<string, string> = {
    "업무 Work": "bg-[#e91e63]",
    "공부 Study": "bg-[#9c27b0]",
    "개인 Personal": "bg-[#00bcd4]",
    "운동 Exercise": "bg-[#4caf50]",
    "기타 Other": "bg-[#ff9800]",
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      onClick={() => onToggle(id)}
      className={`group bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] p-3 md:p-4 cursor-pointer hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.5)] transition-all ${
        completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className={`flex-shrink-0 w-6 h-6 md:w-7 md:h-7 border-3 border-black flex items-center justify-center transition-colors ${
            completed
              ? "bg-gradient-to-br from-[#e91e63] to-[#f06292]"
              : "bg-white hover:bg-[#fce4ec]"
          }`}
        >
          {completed && <Check className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={3} />}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {/* Time */}
            <span
              className="text-[#e91e63] text-xs md:text-sm"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              {time}
            </span>

            {/* Category Badge */}
            <span
              className={`${categoryColors[category] || categoryColors["기타 Other"]} text-white text-[10px] px-2 py-1 border-2 border-black`}
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              {category.split(" ")[0]}
            </span>

            {/* Priority Indicator */}
            <div className="flex items-center gap-1">
              {priority === "high" && (
                <>
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                  <Star className="w-3 h-3 text-red-500 fill-red-500" />
                </>
              )}
              {priority === "medium" && (
                <>
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <Star className="w-3 h-3 text-orange-500 fill-orange-500" />
                  <Circle className="w-3 h-3 text-gray-300" />
                </>
              )}
              {priority === "low" && (
                <>
                  <Star className="w-3 h-3 text-green-500 fill-green-500" />
                  <Circle className="w-3 h-3 text-gray-300" />
                  <Circle className="w-3 h-3 text-gray-300" />
                </>
              )}
            </div>
          </div>

          {/* Task Title */}
          <p
            className={`text-[#1a0033] text-xs md:text-sm ${
              completed ? "line-through" : ""
            }`}
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {title}
          </p>
        </div>

        {/* Delete Button */}
        <motion.button
          whileHover={{ scale: 1.2, rotate: 10 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleDelete}
          className="flex-shrink-0 w-7 h-7 bg-red-500 border-2 border-black hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100 flex items-center justify-center"
        >
          <Trash2 className="w-4 h-4 text-white" />
        </motion.button>
      </div>
    </motion.div>
  );
}
