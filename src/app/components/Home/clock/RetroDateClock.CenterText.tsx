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
      <text
        x={centerX}
        y={centerY - 2}
        textAnchor="middle"
        dominantBaseline="middle"
        style={getCenterTextStyle("4.5px")}
      >
        drop.ai 프로젝트
      </text>
      <text
        x={centerX}
        y={centerY + 4}
        textAnchor="middle"
        dominantBaseline="middle"
        style={getCenterTextStyle("4.5px")}
      >
        + 회사 문제
      </text>
    </svg>
  );
});
