import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buttonStyles, borderStyles, textStyles, getFontStyle } from "./RetroPlanner.styles";

interface RetroPlannerPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

export function RetroPlannerPagination({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
}: RetroPlannerPaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-4">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevPage}
        className={buttonStyles.paginationButton}
        style={borderStyles.pinkBorder}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </motion.button>
      <div className="mx-2 text-pink-600 text-[10px]" style={getFontStyle("'DungGeunMo'")}>
        {currentPage} / {totalPages}
      </div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNextPage}
        className={buttonStyles.paginationButton}
        style={borderStyles.pinkBorder}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </motion.button>
    </div>
  );
}
