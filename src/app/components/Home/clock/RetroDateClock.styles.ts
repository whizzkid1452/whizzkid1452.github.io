// 스타일 관련 상수 및 유틸리티

export const clockHandStyles = {
  container: "absolute top-1/2 left-1/2 w-0 h-0",
  handContainer: "absolute bottom-0 left-0 -translate-x-1/2 origin-bottom",
  pixelRow: "flex gap-0",
  leftBorder: "w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px]",
  whitePixel: "w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px] transition-colors duration-200",
  grayPixel: "w-[4px] h-[6px] md:w-[5px] md:h-[8px] lg:w-[6px] lg:h-[10px] transition-colors duration-200",
  rightBorder: "w-[2px] h-[6px] md:w-[2.5px] md:h-[8px] lg:w-[3px] lg:h-[10px]",
} as const;

export const heartIconStyles = {
  container: "w-6 h-6 md:w-[30px] md:h-[30px] lg:w-9 lg:h-9 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] drop-shadow-[0_0_8px_rgba(255,105,180,0.6)] translate-y-[2px] transition-all duration-300 animate-[heartPulse_1.5s_ease-in-out_infinite]",
} as const;

export const pieChartStyles = {
  container: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none block",
  path: "opacity-0 animate-[fadeInPie_0.6s_ease-out_forwards]",
  text: "fill-[#333] font-bold pointer-events-none",
} as const;

export const tooltipStyles = {
  content: "relative z-50 animate-[tooltipFadeIn_0.2s_ease-out]",
  bubbleContainer: "relative inline-block",
  textContainer: "absolute top-0 left-0 w-full flex flex-col items-center justify-center px-4 pointer-events-none z-10",
  dateText: "text-[#e91e63] text-center text-[9px] md:text-[10px] mb-1.5 leading-tight whitespace-nowrap drop-shadow-[1px_1px_0px_rgba(255,255,255,0.8)]",
  timeText: "text-[#e91e63] text-center text-[11px] md:text-[12px] leading-tight whitespace-nowrap drop-shadow-[1px_1px_0px_rgba(255,255,255,0.8)]",
} as const;

export const mainContainerStyles = {
  wrapper: "flex justify-center mb-10 mt-4 md:mb-12 md:mt-6",
  container: "relative w-full max-w-[20rem] px-4 mx-auto md:max-w-[43rem]",
  clockFace: "relative w-full mx-auto",
  clockImage: "w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)]",
} as const;

export const decorativeStyles = {
  sparkle: "absolute w-3 h-3 md:w-4 md:h-4 bg-[#fde047] rounded-full animate-[sparkle_2.5s_ease-in-out_infinite]",
  heart: "absolute -top-6 left-4 md:-top-8 md:left-8 animate-[floatUpDown_3s_ease-in-out_infinite,floatScale_3s_ease-in-out_infinite]",
  sun: "absolute -top-6 right-4 md:-top-8 md:right-8 animate-[rotate_15s_linear_infinite]",
  cloud: "absolute -bottom-4 left-8 md:-bottom-6 md:left-12 animate-[floatLeftRight_4s_ease-in-out_infinite]",
  moon: "absolute -bottom-4 right-8 md:-bottom-6 md:right-12 animate-[rotateSwing_5s_ease-in-out_infinite]",
  starLeft: "absolute top-1/4 -left-4 md:-left-6 drop-shadow-md animate-[starScaleRotate_4s_ease-in-out_infinite]",
  starRight: "absolute top-1/4 -right-4 md:-right-6 drop-shadow-md animate-[starScaleRotateReverse_4s_ease-in-out_infinite]",
  pixelCharacter: "absolute -bottom-8 left-1/2 -translate-x-1/2 md:-bottom-12 drop-shadow-lg animate-[catFloat_2s_ease-in-out_infinite]",
} as const;

// 인라인 스타일 생성 함수들
export function getHandTransform(rotation: number) {
  return {
    transform: `rotate(${rotation}deg)`,
    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
  };
}

export function getBorderGradient() {
  return {
    background: "linear-gradient(to bottom, #FF1493, #9c27b0)",
    boxShadow: "0 0 2px rgba(255, 20, 147, 0.5)",
  };
}

export function getWhitePixelGradient(opacity: number) {
  return {
    background: `linear-gradient(to bottom, rgba(255, 105, 180, ${opacity * 0.1}), rgba(255, 255, 255, ${opacity}))`,
  };
}

export function getGrayPixelGradient(opacity: number) {
  return {
    background: `linear-gradient(to bottom, rgba(255, 20, 147, ${opacity * 0.15}), rgba(232, 232, 232, ${opacity}))`,
  };
}

export function getSparklePosition(index: number) {
  return {
    top: `${15 + Math.sin(index * Math.PI / 3) * 65}%`,
    left: `${15 + Math.cos(index * Math.PI / 3) * 65}%`,
    animationDelay: `${index * 0.4}s`,
  };
}

export function getTooltipTextStyle(fontFamily: string) {
  return { fontFamily };
}

export function getPieChartTextStyle(fontSize: string) {
  return {
    fontFamily: "'DungGeunMo', monospace",
    fontSize,
  };
}

export function getCenterTextStyle(fontSize: string) {
  return {
    fontFamily: "'DungGeunMo', monospace",
    fontSize,
    fontWeight: "bold",
    stroke: "#FF1493",
    strokeWidth: "0.4",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    paintOrder: "stroke fill",
  };
}

export const centerTextStyles = {
  container: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 drop-shadow-[0_0_4px_rgba(255,20,147,0.6)]",
} as const;
