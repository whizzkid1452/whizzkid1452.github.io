import React, { Suspense, lazy, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// 게임 컴포넌트들을 lazy loading으로 로드
const RetroMiniGame = lazy(() => import("./RetroMiniGame").then(module => ({ default: module.RetroMiniGame })));
const PrincessRunnerGame = lazy(() => import("./PrincessRunnerGame").then(module => ({ default: module.PrincessRunnerGame })));
const RetroTVGame = lazy(() => import("./RetroTVGame").then(module => ({ default: module.RetroTVGame })));

/**
 * GamePage 컴포넌트
 * 
 * 최적화 기능:
 * - 페이지에 접속하고 있을 때만 게임 컴포넌트를 마운트
 * - 페이지를 떠나면 모든 게임이 언마운트되어 리소스 해제
 * - 각 게임은 lazy loading으로 필요할 때만 로드
 */
export function GamePage() {
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);

  // 페이지가 마운트될 때만 게임들을 활성화
  useEffect(() => {
    // 페이지가 /game 경로에 있을 때만 마운트
    if (location.pathname === "/game") {
      setIsMounted(true);
    }

    // 페이지를 떠날 때 언마운트하여 모든 리소스 해제
    return () => {
      setIsMounted(false);
    };
  }, [location.pathname]);

  // 페이지가 /game이 아니면 아무것도 렌더링하지 않음
  if (location.pathname !== "/game") {
    return null;
  }

  return (
    <div className="w-full">
      {/* 게임 컴포넌트들을 lazy loading으로 로드 - 마운트된 경우에만 */}
      {isMounted && (
        <Suspense fallback={
          <div className="w-full max-w-4xl mx-auto my-8 md:my-12 flex items-center justify-center min-h-[200px]">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-pink-500 font-mono text-sm">게임 로딩 중...</p>
            </div>
          </div>
        }>
          <RetroMiniGame />
          <PrincessRunnerGame />
          <RetroTVGame />
        </Suspense>
      )}
    </div>
  );
}
