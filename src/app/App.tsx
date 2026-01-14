import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { About } from "./components/AboutPage/About";
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { DefaultLayout } from "./components/layouts/DefaultLayout";
import { RetroSidebar } from "./components/RetroSidebar/index";

// 모든 페이지를 lazy loading으로 로드
const PostPage = lazy(() => import("./components/PostPage/PostPage").then(module => ({ default: module.PostPage })));

const MusicPage = lazy(() => import("./components/MusicPage/MusicPage").then(module => ({ default: module.MusicPage })));
const CodePage = lazy(() => import("./components/CodePage/CodePage").then(module => ({ default: module.CodePage })));
const GuestBookPage = lazy(() => import("./components/GuestBookPage/GuestBookPage").then(module => ({ default: module.GuestBookPage })));

/**
 * App 컴포넌트
 * 
 * 모든 페이지에 공통적으로 적용되는 요소:
 * - RetroSidebar: 사이드바 네비게이션 (React Router로 관리)
 * - DefaultLayout: 배경, 커서 효과, 레이아웃 구조
 * 
 * React Router를 사용하여 URL 기반 라우팅을 구현합니다.
 * 모든 페이지는 lazy loading으로 로드되어 초기 번들 크기를 최적화합니다.
 */
export default function App() {
  useCustomCursor();

  return (
    <>
      {/* RetroSidebar - 모든 페이지에 공통으로 적용되는 사이드바 */}
      <RetroSidebar />
      
      {/* DefaultLayout - 모든 페이지에 공통 레이아웃 */}
      <DefaultLayout>
        <Suspense fallback={
          <div className="w-full min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mb-4"></div>
              <p className="text-pink-500 font-mono text-sm">페이지 로딩 중...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post" element={<PostPage />} />

            <Route path="/music" element={<MusicPage />} />
            <Route path="/code" element={<CodePage />} />
            <Route path="/diary" element={<GuestBookPage />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </DefaultLayout>
    </>
  );
}