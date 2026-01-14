import { motion } from "motion/react";
import { Heart, LogIn, LogOut } from "lucide-react";
import { useGoogleCalendar } from "@/app/hooks/useGoogleCalendar";

export function SidebarProfile() {
  const { isAuthenticated, userName, handleSignIn, handleSignOut } = useGoogleCalendar({ autoLoad: false });

  // 유저 이름 표시 로직: userName이 있으면 사용, 없으면 "PLAYER" 사용
  const displayName = userName || "PLAYER";
  
  // 이름이 너무 길면 줄임
  const truncatedName = displayName.length > 12 ? `${displayName.slice(0, 12)}...` : displayName;

  return (
    <div className="p-4 border-b-4 border-[#ec407a] bg-white max-w-full overflow-hidden">
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-to-br from-[#e91e63] to-[#9c27b0] border-4 border-black flex items-center justify-center"
        >
          <Heart className="w-8 h-8 text-white fill-white" />
        </motion.div>
        <div className="flex-1 min-w-0">
          <p 
            className="text-[#e91e63] text-[10px] mb-1 truncate"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
            title={displayName}
          >
            {truncatedName}
          </p>
          <p 
            className="text-[#4a0066] text-xs"
            style={{ fontFamily: "'VT323', monospace" }}
          >
            Level 99
          </p>
        </div>
      </div>

      {/* 구글 로그인/로그아웃 버튼 */}
      <div className="mt-2">
        {isAuthenticated ? (
          <motion.button
            onClick={handleSignOut}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#e91e63] to-[#f06292] text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogOut className="w-4 h-4" />
            <span
              className="text-[10px]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              LOGOUT
            </span>
          </motion.button>
        ) : (
          <motion.button
            onClick={handleSignIn}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-[#00bcd4] to-[#4dd0e1] text-white border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
          >
            <LogIn className="w-4 h-4" />
            <span
              className="text-[10px]"
              style={{ fontFamily: "'Press Start 2P', monospace" }}
            >
              GOOGLE LOGIN
            </span>
          </motion.button>
        )}
      </div>
    </div>
  );
}