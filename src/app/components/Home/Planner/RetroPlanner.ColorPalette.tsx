import { motion } from "motion/react";
import { containerStyles } from "./RetroPlanner.styles";
import { paletteColors } from "./RetroPlanner.constants";

export function RetroPlannerColorPalette() {
  return (
    <div className={containerStyles.colorPalette} style={{ borderTopColor: "#808080" }}>
      <div className="grid grid-cols-15 gap-0.5 max-w-xl">
        {paletteColors.map((color, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.3, zIndex: 10, boxShadow: "0 0 8px rgba(255,20,147,0.8)" }}
            whileTap={{ scale: 0.9 }}
            className="w-4 h-4 border-2 border-pink-600"
            style={{ backgroundColor: color, imageRendering: "pixelated" }}
            title={color}
          />
        ))}
      </div>
    </div>
  );
}
