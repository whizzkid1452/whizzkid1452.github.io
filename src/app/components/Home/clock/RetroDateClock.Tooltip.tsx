import * as Tooltip from "@radix-ui/react-tooltip";
import { formatDate, formatTime } from "./RetroDateClock.utils";
import { tooltipStyles, getTooltipTextStyle } from "./RetroDateClock.styles";

interface ClockTooltipProps {
  date: Date;
  children: React.ReactNode;
}

export function ClockTooltip({ date, children }: ClockTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={0}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className={tooltipStyles.content}
            side="bottom"
            sideOffset={12}
            style={{ background: "transparent", border: "none", padding: 0 }}
          >
            {/* 픽셀 스타일 말풍선 전체 */}
            <div className={tooltipStyles.bubbleContainer}>
              <svg
                width="160"
                height="64"
                viewBox="0 0 160 64"
                className="block"
                style={{ imageRendering: "pixelated", pointerEvents: "none" }}
              >
                {/* 말풍선 본체 - 핑크 테두리 (외곽) */}
                {/* 상단 */}
                <rect x="4" y="4" width="152" height="4" fill="#e91e63" />
                {/* 좌측 */}
                <rect x="4" y="4" width="4" height="56" fill="#e91e63" />
                {/* 우측 */}
                <rect x="156" y="4" width="4" height="56" fill="#e91e63" />
                {/* 하단 */}
                <rect x="4" y="56" width="152" height="4" fill="#e91e63" />
                
                {/* 말풍선 본체 - 흰색 내부 */}
                <rect x="8" y="8" width="144" height="48" fill="#fff" />
              </svg>
              
              {/* 텍스트 내용 */}
              <div 
                className={tooltipStyles.textContainer}
                style={{ height: "100%" }}
              >
                <div
                  className={tooltipStyles.dateText}
                  style={getTooltipTextStyle("'Press Start 2P', monospace")}
                >
                  {formatDate(date)}
                </div>
                <div
                  className={tooltipStyles.timeText}
                  style={getTooltipTextStyle("'VT323', monospace")}
                >
                  {formatTime(date)}
                </div>
              </div>
            </div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
