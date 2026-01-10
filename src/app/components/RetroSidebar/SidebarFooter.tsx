import { motion } from "motion/react";

interface SystemStat {
  label: string;
  value: number;
  gradient: string;
  delay: number;
}

const SYSTEM_STATS: SystemStat[] = [
  { label: "CPU", value: 73, gradient: "from-[#00bcd4] to-[#4dd0e1]", delay: 0.5 },
  { label: "RAM", value: 45, gradient: "from-[#e91e63] to-[#f06292]", delay: 0.7 },
];

export function SidebarFooter() {
  return (
    <div className="p-4 border-t-4 border-[#ec407a] bg-white space-y-2">
      {SYSTEM_STATS.map((stat) => (
        <div key={stat.label} className="flex justify-between items-center">
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {stat.label}
          </span>
          <div className="flex-1 mx-2 h-3 bg-[#fce4ec] border-2 border-[#ec407a]">
            <motion.div
              className={`h-full bg-gradient-to-r ${stat.gradient}`}
              initial={{ width: "0%" }}
              animate={{ width: `${stat.value}%` }}
              transition={{ duration: 1, delay: stat.delay }}
            />
          </div>
          <span 
            className="text-[8px] text-[#4a0066]"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            {stat.value}%
          </span>
        </div>
      ))}

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="flex items-center gap-2 mt-3 justify-center"
      >
        <div className="w-2 h-2 bg-green-500 border border-black" />
        <span 
          className="text-[8px] text-[#4a0066]"
          style={{ fontFamily: "'VT323', monospace" }}
        >
          SYSTEM ONLINE
        </span>
      </motion.div>
    </div>
  );
}