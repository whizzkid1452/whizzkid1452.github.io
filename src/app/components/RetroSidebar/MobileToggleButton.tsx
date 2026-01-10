import { motion } from "motion/react";
import { Menu, X } from "lucide-react";

interface MobileToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileToggleButton({ isOpen, onToggle }: MobileToggleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className="fixed top-4 left-4 z-50 w-12 h-12 md:w-14 md:h-14 lg:hidden bg-[#e91e63] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
    >
      {isOpen ? (
        <X className="w-6 h-6 text-white" />
      ) : (
        <Menu className="w-6 h-6 text-white" />
      )}
    </motion.button>
  );
}