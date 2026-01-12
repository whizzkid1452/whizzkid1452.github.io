import { memo } from "react";
import { SCHEDULE } from "./RetroDateClock.constants";
import { createPieSlice, getTextPosition } from "./RetroDateClock.utils";
import { pieChartStyles, getPieChartTextStyle } from "./RetroDateClock.styles";

export const SchedulePieChart = memo(function SchedulePieChart() {
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const radius = 42; // 참고 파일과 동일
  const textRadius = 32; // 참고 파일과 동일

  return (
    <svg
      className={pieChartStyles.container}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid meet"
    >
      {SCHEDULE.map((slot, index) => {
        // 제목이 없는 경우(9-11월)는 파이 조각만 그리고 텍스트는 표시하지 않음
        if (!slot.title) {
          return (
            <path
              key={index}
              className={pieChartStyles.path}
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startMonth, slot.endMonth, centerX, centerY, radius)}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
            />
          );
        }

        const textPos = getTextPosition(
          slot.startMonth,
          slot.endMonth,
          centerX,
          centerY,
          textRadius
        );

        // 월 범위 계산 (12월을 넘어가는 경우 처리)
        let monthRange = slot.endMonth - slot.startMonth;
        if (slot.startMonth > slot.endMonth) {
          monthRange = (12 - slot.startMonth) + slot.endMonth;
        }

        return (
          <g key={index}>
            <path
              className={pieChartStyles.path}
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startMonth, slot.endMonth, centerX, centerY, radius)}
              fill={slot.color}
              stroke="black"
              strokeWidth="0.3"
            />
            <text
              x={textPos.x}
              y={textPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              transform={`rotate(${textPos.angle}, ${textPos.x}, ${textPos.y})`}
              className={pieChartStyles.text}
              style={getPieChartTextStyle(
                monthRange >= 3 ? "3.2px" : "2.4px"
              )}
            >
              {slot.title}
            </text>
          </g>
        );
      })}
    </svg>
  );
});
