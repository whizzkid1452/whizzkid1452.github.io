import { motion } from "motion/react";
import { containerStyles, buttonStyles, getFontStyle } from "./RetroPlanner.styles";
import { menuItems } from "./RetroPlanner.constants";

export function RetroPlannerMenuBar() {
  return (
    <div className={containerStyles.menuBar} style={{ ...getFontStyle("'Press Start 2P'"), borderBottomColor: "#808080" }}>
      {menuItems.map((menu) => (
        <motion.button
          key={menu}
          whileHover={{ backgroundColor: "#FFB6C1", color: "#C2185B" }}
          className={buttonStyles.menuItem}
        >
          {menu}
        </motion.button>
      ))}
    </div>
  );
}
