import { useState, useEffect, useRef } from "react";

interface UseTimeTrackerProps {
  initialTrackedTime?: number;
  isTracking?: boolean;
  onTimeUpdate?: (minutes: number) => void;
}

/**
 * 태스크의 시간 추적을 관리하는 훅
 */
export function useTimeTracker({
  initialTrackedTime = 0,
  isTracking: initialIsTracking = false,
  onTimeUpdate,
}: UseTimeTrackerProps) {
  const [trackedTime, setTrackedTime] = useState(initialTrackedTime);
  const [isTracking, setIsTracking] = useState(initialIsTracking);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<Date | null>(null);
  const baseTimeRef = useRef<number>(initialTrackedTime); // 추적 시작 시점의 누적 시간

  // 추적 시작
  const startTracking = () => {
    if (isTracking) return;
    
    baseTimeRef.current = trackedTime; // 현재까지 누적된 시간을 기준으로 설정
    setIsTracking(true);
    startTimeRef.current = new Date();
    
    // 1초마다 업데이트하여 실시간으로 보여주기
    intervalRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsedSeconds = Math.floor(
          (new Date().getTime() - startTimeRef.current.getTime()) / 1000
        );
        const elapsedMinutes = Math.floor(elapsedSeconds / 60);
        const newTotalTime = baseTimeRef.current + elapsedMinutes;
        setTrackedTime(newTotalTime);
        onTimeUpdate?.(newTotalTime);
      }
    }, 1000); // 1초마다 업데이트
  };

  // 추적 정지
  const stopTracking = () => {
    if (!isTracking) return;
    
    setIsTracking(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (startTimeRef.current) {
      const elapsed = Math.floor(
        (new Date().getTime() - startTimeRef.current.getTime()) / 1000 / 60
      );
      const newTotalTime = baseTimeRef.current + elapsed;
      setTrackedTime(newTotalTime);
      onTimeUpdate?.(newTotalTime);
      startTimeRef.current = null;
    }
  };

  // 추적 토글
  const toggleTracking = () => {
    if (isTracking) {
      stopTracking();
    } else {
      startTracking();
    }
  };

  // 초기화
  const resetTracking = () => {
    stopTracking();
    setTrackedTime(0);
    onTimeUpdate?.(0);
  };

  // 컴포넌트 언마운트 시 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // 초기값 변경 시 동기화 (추적 중이 아닐 때만)
  useEffect(() => {
    if (!isTracking) {
      setTrackedTime(initialTrackedTime);
      baseTimeRef.current = initialTrackedTime;
    }
  }, [initialTrackedTime, isTracking]);

  return {
    trackedTime,
    isTracking,
    startTracking,
    stopTracking,
    toggleTracking,
    resetTracking,
  };
}
