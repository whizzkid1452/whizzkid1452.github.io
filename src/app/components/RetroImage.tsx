import { motion } from "motion/react";
import retroImg from "../../assets/1aefa39ed038157c019efc53a3a935ca5cc707b9.png";

export function RetroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="w-full max-w-2xl mx-auto mt-6 md:mt-8 mb-6 md:mb-8"
    >
      <div className="border-4 border-[#ec407a] shadow-[8px_8px_0px_0px_rgba(0,0,0,0.3)] overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-[#ff69b4] via-[#e91e63] to-[#ff69b4] p-2 border-b-4 border-[#ec407a] flex items-center gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 bg-red-400 border-2 border-black" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-yellow-300 border-2 border-black" />
          <div className="w-3 h-3 md:w-4 md:h-4 bg-green-400 border-2 border-black" />
          <span 
            className="text-white ml-2 text-[8px] md:text-xs"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            RETRO.IMG
          </span>
        </div>
        <motion.img
          src={retroImg}
          alt="Retro Document"
          className="w-full h-auto"
          style={{ imageRendering: "pixelated" }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}
