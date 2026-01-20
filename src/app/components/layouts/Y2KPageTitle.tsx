import React from "react";
import { Y2KTextBox } from "./stickers/Y2KTextBox";
import { Y2KSticker } from "./stickers/Y2KSticker";

interface Y2KPageTitleProps {
  title: string;
}

/**
 * Y2KPageTitle
 *
 * About 페이지와 동일한 스타일의 상단 제목 컴포넌트.
 * Y2KTextBox와 장식용 스티커를 사용합니다.
 */
export function Y2KPageTitle({ title }: Y2KPageTitleProps) {
  return (
    <div className="relative mb-8 md:mb-12">
      {/* Floating stickers decoration - About과 동일한 배치 */}
      <div className="absolute -top-8 -left-4 md:-left-8 pointer-events-none">
        <Y2KSticker type="star" size={80} rotation={-15} />
      </div>
      <div className="absolute -top-4 -right-4 md:-right-8 pointer-events-none">
        <Y2KSticker type="heart" size={60} rotation={20} />
      </div>
      <div className="absolute top-20 left-4 pointer-events-none">
        <Y2KSticker type="sparkle" size={40} rotation={45} />
      </div>

      {/* Main Title in Y2K style box - About과 동일한 스타일 */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        <Y2KTextBox variant="pink" rotation={-3}>
          <span
            className="text-2xl md:text-4xl font-bold text-purple-900"
            style={{
              fontFamily: "'Press Start 2P', monospace",
              textShadow: "3px 3px 0px rgba(255, 105, 180, 0.5)",
            }}
          >
            {title}
          </span>
        </Y2KTextBox>
      </div>

      {/* 추가 장식 스티커 */}
      <div className="absolute bottom-0 right-8 md:right-20 pointer-events-none">
        <Y2KSticker type="cd" size={70} rotation={15} />
      </div>
      <div className="absolute bottom-4 left-1/3 pointer-events-none">
        <Y2KSticker type="sparkle" size={35} rotation={-30} />
      </div>
    </div>
  );
}
