import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { About } from "./About";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { DefaultLayout } from "./components/DefaultLayout";
import { RetroSidebar } from "./components/RetroSidebar";

/**
 * App 컴포넌트
 * 
 * 모든 페이지에 공통적으로 적용되는 요소:
 * - RetroSidebar: 사이드바 네비게이션 (React Router로 관리)
 * - DefaultLayout: 배경, 커서 효과, 레이아웃 구조
 * 
 * React Router를 사용하여 URL 기반 라우팅을 구현합니다.
 * 새로운 페이지를 추가할 때는 Routes에 Route를 추가하면 됩니다.
 */
export default function App() {
  useCustomCursor();

  return (
    <>
      {/* RetroSidebar - 모든 페이지에 공통으로 적용되는 사이드바 */}
      <RetroSidebar />
      
      {/* DefaultLayout - 모든 페이지에 공통 레이아웃 */}
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {/* 새로운 페이지는 여기에 Route를 추가하세요 */}
        </Routes>
      </DefaultLayout>
    </>
  );
}