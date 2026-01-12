import { memo } from "react";
import { getCenterTextStyle, centerTextStyles } from "./RetroDateClock.styles";

export const CenterText = memo(function CenterText() {
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;

  return (
    <svg
      className={centerTextStyles.container}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "100%" }}
    >
      <defs>
        {/* 그라데이션 정의 */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
          <stop offset="50%" stopColor="#FFE5F0" stopOpacity="1" />
          <stop offset="100%" stopColor="#FFC0E0" stopOpacity="1" />
        </linearGradient>
        
        {/* 글로우 필터 */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        
        {/* 드롭 섀도우 */}
        <filter id="dropShadow">
          <feGaussianBlur in="SourceAlpha" stdDeviation="0.3" />
          <feOffset dx="0.2" dy="0.2" result="offsetblur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.5" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* 첫 번째 줄 */}
      {/* 그림자 레이어 */}
      <text
        x={centerX}
        y={centerY - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          ...getCenterTextStyle("4.5px"),
          fill: "#FF1493",
          opacity: 0.3,
        }}
        transform="translate(0.5, 0.5)"
      >
        drop.ai 프로젝트
      </text>
      
      {/* 메인 텍스트 */}
      <text
        x={centerX}
        y={centerY - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          ...getCenterTextStyle("4.5px"),
          fill: "url(#textGradient)",
        }}
        filter="url(#glow)"
        className="animate-[textPulse_2s_ease-in-out_infinite]"
      >
        drop.ai 프로젝트
      </text>

      {/* 두 번째 줄 */}
      {/* 그림자 레이어 */}
      <text
        x={centerX}
        y={centerY + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          ...getCenterTextStyle("4.5px"),
          fill: "#FF1493",
          opacity: 0.3,
        }}
        transform="translate(0.5, 0.5)"
      >
        + 회사 문제
      </text>
      
      {/* 메인 텍스트 */}
      <text
        x={centerX}
        y={centerY + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        style={{
          ...getCenterTextStyle("4.5px"),
          fill: "url(#textGradient)",
        }}
        filter="url(#glow)"
        className="animate-[textPulse_2s_ease-in-out_infinite]"
      >
        + 회사 문제
      </text>
    </svg>
  );
});
