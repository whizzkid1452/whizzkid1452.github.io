import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { containerStyles, buttonStyles, getWindowBorderStyle } from "./RetroPlanner.styles";
import { tools, plannerModes } from "./RetroPlanner.constants";
import type { PlannerMode } from "./RetroPlanner.types";

interface RetroPlannerToolboxProps {
  onAddTask: () => void;
  plannerMode: PlannerMode;
  onPlannerModeChange: (mode: PlannerMode) => void;
}

export function RetroPlannerToolbox({ onAddTask, plannerMode, onPlannerModeChange }: RetroPlannerToolboxProps) {
  return (
    <div className={containerStyles.toolbox} style={{ borderRightColor: "#808080" }}>
      {/* Planner Mode Selection */}
      <div className="mb-2 flex flex-col gap-1">
        {plannerModes.map((modeOption) => {
          const isSelected = plannerMode === modeOption.mode;
          return (
            <motion.button
              key={modeOption.mode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPlannerModeChange(modeOption.mode)}
              className={`${buttonStyles.toolButton} ${isSelected ? "ring-2 ring-offset-1" : ""}`}
              style={{
                ...getWindowBorderStyle(),
                backgroundColor: isSelected ? modeOption.color : "white",
              }}
              title={modeOption.label}
            >
              <modeOption.icon 
                className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-700"}`} 
                style={{ imageRendering: "pixelated" }} 
              />
            </motion.button>
          );
        })}
      </div>

      {/* Add Task Button */}
      {tools
        .filter((tool) => tool.label === "Add Task")
        .map((tool, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.1, backgroundColor: tool.color }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddTask}
            className={buttonStyles.toolButton}
            style={getWindowBorderStyle()}
            title={tool.label}
          >
            <tool.icon className="w-5 h-5 text-gray-700" style={{ imageRendering: "pixelated" }} />
          </motion.button>
        ))}
      
      {/* Color Preview - Pink Theme */}
      <div className="mt-2 flex flex-col gap-1">
        <div className="w-10 h-5 border-2 border-black bg-[#FF1493]" style={{ imageRendering: "pixelated" }} />
        <div className="w-10 h-5 border-2 border-black bg-[#FFB6C1]" style={{ imageRendering: "pixelated" }} />
      </div>

      {/* Pixel Heart Decoration */}
      <motion.div
        className="mt-2"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
        }}
      >
        <Heart className="w-10 h-10 fill-pink-400 text-pink-500" style={{ imageRendering: "pixelated" }} />
      </motion.div>
    </div>
  );
}
