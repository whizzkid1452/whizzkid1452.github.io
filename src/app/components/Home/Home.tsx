import React from "react";
import { RetroDateClock } from "./clock/RetroDateClock";
import { RetroPlanner } from "./RetroPlanner";
import { HeroSection } from "./HeroSection";

/**
 * Home 페이지 컴포넌트
 * 
 * 메인 홈 페이지를 렌더링합니다.
 * - HeroSection: Y2K 스타일의 메인 타이틀 섹션
 * - RetroDateClock: 날짜 및 시계 컴포넌트
 * - RetroPlanner: 플래너 컴포넌트
 */
export function Home() {
  return (
    <>
      <HeroSection />
      <RetroDateClock />
      <RetroPlanner />
    </>
  );
}
