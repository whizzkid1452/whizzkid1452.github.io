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
        const textPos = getTextPosition(
          slot.startHour,
          slot.endHour,
          centerX,
          centerY,
          textRadius
        );

        return (
          <g key={index}>
            <path
              className={pieChartStyles.path}
              style={{
                animationDelay: `${0.5 + index * 0.08}s`,
              }}
              d={createPieSlice(slot.startHour, slot.endHour, centerX, centerY, radius)}
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
                slot.endHour - slot.startHour >= 2 ? "3.2px" : "2.4px"
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
