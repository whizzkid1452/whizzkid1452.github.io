import React from "react";
import { useLocation } from "react-router-dom";
import { CursorSparkles } from "./background/CursorSparkles";
import { Y2KCollageBackground } from "./background/Y2KCollageBackground";
import { Y2KTextBox } from "./stickers/Y2KTextBox";
import { Y2KSticker } from "./stickers/Y2KSticker";
import { Y2KPageTitle } from "./Y2KPageTitle";

/** 경로별 상단 제목. null이면 제목 미표시(Home은 HeroSection 사용) */
const PATH_TITLES: Record<string, string | null> = {
  "/": null,
  "/post": "POST",
  "/music": "MUSIC",
  "/workflow": "WORKFLOW",
  "/code": "CODE",
  "/diary": "GUESTBOOK",
  "/about": "ABOUT",
};

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

/**
 * DefaultLayout 컴포넌트
 *
 * 모든 페이지에 공통적으로 적용되는 레이아웃 구조:
 * - Y2KPageTitle: 경로별 상단 제목 (Home 제외)
 * - Y2KCollageBackground: 배경 이미지
 * - CursorSparkles: 커서 효과
 * - Footer: 공통 푸터
 *
 * RetroSidebar는 App.tsx에서 직접 관리됩니다.
 */
export function DefaultLayout({ children }: DefaultLayoutProps) {
  const location = useLocation();
  const titleOrNull = PATH_TITLES[location.pathname];

  return (
    <div
      className="min-h-screen w-full bg-gradient-to-br from-pink-300 via-purple-200 to-pink-200 relative overflow-x-hidden"
      style={{ cursor: "inherit" }}
    >
      {/* Y2K Collage Background */}
      <Y2KCollageBackground />

      {/* Cursor Sparkles */}
      <CursorSparkles />

      {/* Main Content - with left margin on desktop for sidebar */}
      <div className="relative z-10 py-4 md:py-8 px-4 lg:ml-64">
        {/* 상단 Y2K 제목 - Home(/)은 HeroSection이 있어 제외 */}
        {titleOrNull != null && (
          <Y2KPageTitle title={titleOrNull || "NOT FOUND"} />
        )}
        {children}
      </div>
      
      {/* Footer with Y2K style - 모든 페이지에 공통 푸터 */}
      <div className="relative z-10 text-center py-6 md:py-8 mt-6 md:mt-8 lg:ml-64">
        <Y2KTextBox variant="gradient" className="inline-block">
          <p 
            className="text-purple-900 text-xs md:text-sm mb-2"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            ♥ Y2K VIBES FOREVER ♥
          </p>
          <p 
            className="text-pink-600 text-sm md:text-base"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            ♥ 2000년대 감성 영원히 ♥
          </p>
        </Y2KTextBox>
        
        {/* Footer stickers */}
        <div className="mt-4 flex justify-center gap-4">
          <Y2KSticker type="star" size={40} rotation={0} />
          <Y2KSticker type="heart" size={40} rotation={0} />
          <Y2KSticker type="sparkle" size={40} rotation={0} />
        </div>
      </div>
    </div>
  );
}