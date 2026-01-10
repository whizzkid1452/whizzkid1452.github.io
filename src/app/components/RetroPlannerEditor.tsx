import { motion } from "motion/react";
import { X, Save, Star, Briefcase, BookOpen, User, Dumbbell, MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface TaskData {
  title: string;
  time: string;
  category: string;
  priority: "high" | "medium" | "low";
}

interface PlannerEditorProps {
  onClose: () => void;
  onSave: (task: TaskData) => void;
}

export function RetroPlannerEditor({ onClose, onSave }: PlannerEditorProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState("업무 Work");
  const [priority, setPriority] = useState<"high" | "medium" | "low">("medium");

  const categories = [
    { icon: Briefcase, label: "업무 Work", color: "#e91e63" },
    { icon: BookOpen, label: "공부 Study", color: "#9c27b0" },
    { icon: User, label: "개인 Personal", color: "#00bcd4" },
    { icon: Dumbbell, label: "운동 Exercise", color: "#4caf50" },
    { icon: MoreHorizontal, label: "기타 Other", color: "#ff9800" },
  ];

  const priorities = [
    { value: "high" as const, label: "높음 High", color: "#f44336", stars: 3 },
    { value: "medium" as const, label: "보통 Medium", color: "#ff9800", stars: 2 },
    { value: "low" as const, label: "낮음 Low", color: "#4caf50", stars: 1 },
  ];

  const handleSave = () => {
    if (title.trim()) {
      onSave({
        title,
        time,
        category,
        priority,
      });
      onClose();
    }
  };

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      />

      {/* Editor Window */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl z-50 bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-[#00bcd4] via-[#4dd0e1] to-[#00bcd4] p-3 md:p-4 border-b-4 border-black flex items-center justify-between">
          <h2
            className="text-white text-xs md:text-sm"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            NEW TASK • 새 할 일
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="w-8 h-8 bg-red-500 border-2 border-black hover:bg-red-600 transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
          {/* Task Title */}
          <div>
            <label
              className="block text-[#e91e63] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              할 일 • Task
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="오늘 할 일을 입력하세요... Enter your task..."
              className="w-full p-3 border-4 border-[#e91e63] bg-[#fce4ec] text-[#1a0033] text-xs md:text-sm focus:outline-none focus:border-[#c2185b]"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
              autoFocus
            />
          </div>

          {/* Time */}
          <div>
            <label
              className="block text-[#9c27b0] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              시간 • Time
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full p-3 border-4 border-[#9c27b0] bg-[#f3e5f5] text-[#1a0033] text-sm focus:outline-none focus:border-[#7b1fa2]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            />
          </div>

          {/* Category Selection */}
          <div>
            <label
              className="block text-[#00bcd4] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              카테고리 • Category
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <motion.button
                    key={cat.label}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCategory(cat.label)}
                    className={`p-3 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                      category === cat.label
                        ? `bg-gradient-to-br text-white`
                        : "bg-white hover:bg-gray-50"
                    }`}
                    style={
                      category === cat.label
                        ? {
                            backgroundImage: `linear-gradient(to bottom right, ${cat.color}, ${cat.color}dd)`,
                          }
                        : {}
                    }
                  >
                    <Icon
                      className="w-5 h-5 md:w-6 md:h-6 mx-auto mb-1"
                      style={{ color: category === cat.label ? "white" : cat.color }}
                    />
                    <span
                      className="text-[10px] md:text-xs block"
                      style={{ fontFamily: "'DungGeunMo', monospace" }}
                    >
                      {cat.label.split(" ")[0]}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Priority Selection */}
          <div>
            <label
              className="block text-[#4caf50] text-xs md:text-sm mb-2"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              우선순위 • Priority
            </label>
            <div className="grid grid-cols-3 gap-2 md:gap-3">
              {priorities.map((p) => (
                <motion.button
                  key={p.value}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPriority(p.value)}
                  className={`p-3 md:p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-colors ${
                    priority === p.value
                      ? "bg-gradient-to-br text-white"
                      : "bg-white hover:bg-gray-50"
                  }`}
                  style={
                    priority === p.value
                      ? {
                          backgroundImage: `linear-gradient(to bottom right, ${p.color}, ${p.color}dd)`,
                        }
                      : {}
                  }
                >
                  <div className="flex justify-center gap-1 mb-2">
                    {[...Array(p.stars)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 md:w-4 md:h-4 fill-current"
                        style={{
                          color: priority === p.value ? "white" : p.color,
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="text-[10px] md:text-xs block"
                    style={{ fontFamily: "'DungGeunMo', monospace" }}
                  >
                    {p.label.split(" ")[0]}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t-4 border-black bg-[#e1f5fe] p-4 flex gap-3 justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-4 md:px-6 py-2 md:py-3 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-[#9c27b0]"
          >
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              취소 • Cancel
            </span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSave}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-[#00bcd4] to-[#4dd0e1] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          >
            <Save className="w-4 h-4 md:w-5 md:h-5" />
            <span
              className="text-xs md:text-sm"
              style={{ fontFamily: "'DungGeunMo', monospace" }}
            >
              추가 • Add
            </span>
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}
