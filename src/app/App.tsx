import React, { useState } from "react";
import { Home } from "./Home";
import { About } from "./About";
import { useCustomCursor } from "./hooks/useCustomCursor";
import { DefaultLayout } from "./components/DefaultLayout";
import { RetroSidebar } from "./components/RetroSidebar";
import { Page } from "./components/RetroSidebar/types";

/**
 * App 컴포넌트
 * 
 * 모든 페이지에 공통적으로 적용되는 요소:
 * - RetroSidebar: 사이드바 네비게이션 (App에서 직접 관리)
 * - DefaultLayout: 배경, 커서 효과, 레이아웃 구조
 * 
 * 페이지 상태는 App에서 직접 관리하고, RetroSidebar에 props로 전달합니다.
 * Context 없이 단순한 props drilling으로 관리합니다.
 * 
 * 새로운 페이지를 추가할 때는 renderPage() 함수에 case를 추가하면
 * 자동으로 DefaultLayout과 RetroSidebar가 적용됩니다.
 */
export default function App() {
  useCustomCursor();
  const [currentPage, setCurrentPage] = useState<Page>("home");

  const renderPage = (): React.ReactElement => {
    switch (currentPage) {
      case "about":
        return <About />;
      case "home":
      default:
        return <Home />;
    }
  };

  return (
    <>
      {/* RetroSidebar - 모든 페이지에 공통으로 적용되는 사이드바 */}
      <RetroSidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
      />
      
      {/* DefaultLayout - 모든 페이지에 공통 레이아웃 */}
      <DefaultLayout>
        {renderPage()}
      </DefaultLayout>
    </>
  );
}