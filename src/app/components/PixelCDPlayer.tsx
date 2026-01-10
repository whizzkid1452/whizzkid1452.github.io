import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";

export function PixelCDPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dragStartY = useRef<number>(0);
  const dragStartVolume = useRef<number>(0.5);

  // BGM URL - 원하는 음원: https://www.youtube.com/watch?v=rg8yV2sqaPs
  // YouTube 링크는 직접 사용할 수 없으므로, 아래 방법 중 하나를 선택하세요:
  // 1. YouTube에서 음원을 다운로드하여 /public 폴더에 저장 후 "/bgm.mp3" 형식으로 사용
  // 2. 음원을 클라우드에 업로드하고 직접 링크 사용 (Dropbox, Google Drive 등)
  // 3. 무료 음원 호스팅 서비스 사용
  // 현재는 placeholder 음원을 사용합니다
  const bgmUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    const savedVolume = localStorage.getItem("bgm-volume");
    if (savedVolume) {
      const vol = parseFloat(savedVolume);
      setVolume(vol);
      dragStartVolume.current = vol;
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartY.current = e.clientY;
    dragStartVolume.current = volume;
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const deltaY = dragStartY.current - e.clientY; // 위로 드래그하면 양수
      const volumeChange = deltaY / 100; // 100px 드래그 = 볼륨 1.0 변화
      let newVolume = dragStartVolume.current + volumeChange;
      
      // 0과 1 사이로 제한
      newVolume = Math.max(0, Math.min(1, newVolume));
      
      setVolume(newVolume);
      localStorage.setItem("bgm-volume", newVolume.toString());
      
      if (newVolume > 0) {
        setIsMuted(false);
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // 드래그가 아닌 경우에만 재생/멈춤 토글
    if (!isDragging) {
      togglePlay();
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  if (!bgmUrl) {
    return null;
  }

  return (
    <>
      <audio ref={audioRef} src={bgmUrl} loop />
      
      <div 
        className="fixed top-6 right-6 z-50 select-none"
        style={{ cursor: isDragging ? 'ns-resize' : 'pointer' }}
      >
        {/* Pixel CD */}
        <motion.div
          className="relative"
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={
            isPlaying
              ? {
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }
              : {}
          }
          whileHover={{ scale: 1.05 }}
          style={{
            filter: `brightness(${isDragging ? 1.2 : 1}) drop-shadow(0 0 ${isDragging ? 20 : 8}px rgba(255, 105, 180, ${isDragging ? 0.8 : 0.4}))`
          }}
        >
          <svg width="120" height="120" viewBox="0 0 120 120">
            <defs>
              {/* Drop shadow */}
              <filter id="cdShadow">
                <feDropShadow dx="4" dy="4" stdDeviation="3" floodOpacity="0.4"/>
              </filter>
            </defs>

            {/* Main CD disc - pixelated circle */}
            <g filter="url(#cdShadow)">
              {/* Outer edge - dark gray pixels */}
              <rect x="40" y="12" width="40" height="8" fill="#4a4a4a"/>
              <rect x="28" y="20" width="64" height="8" fill="#4a4a4a"/>
              <rect x="20" y="28" width="80" height="64" fill="#4a4a4a"/>
              <rect x="28" y="92" width="64" height="8" fill="#4a4a4a"/>
              <rect x="40" y="100" width="40" height="8" fill="#4a4a4a"/>

              {/* White segments (top-left, bottom-right) */}
              <rect x="44" y="16" width="12" height="8" fill="#ffffff"/>
              <rect x="32" y="24" width="28" height="8" fill="#ffffff"/>
              <rect x="24" y="32" width="36" height="8" fill="#f5f5f5"/>
              <rect x="24" y="40" width="32" height="8" fill="#e8e8e8"/>
              <rect x="68" y="72" width="28" height="8" fill="#ffffff"/>
              <rect x="72" y="80" width="24" height="8" fill="#f5f5f5"/>
              <rect x="76" y="88" width="16" height="8" fill="#e8e8e8"/>
              <rect x="64" y="96" width="12" height="8" fill="#d8d8d8"/>

              {/* Beige/tan segments */}
              <rect x="56" y="16" width="12" height="8" fill="#c8b896"/>
              <rect x="68" y="16" width="8" height="8" fill="#a89878"/>
              <rect x="60" y="24" width="20" height="8" fill="#d4c4a4"/>
              <rect x="80" y="24" width="12" height="8" fill="#b8a888"/>

              {/* Pink segments (top-right) */}
              <rect x="76" y="16" width="4" height="8" fill="#ffb6c1"/>
              <rect x="80" y="24" width="12" height="8" fill="#ff99aa"/>
              <rect x="88" y="32" width="8" height="8" fill="#ff88aa"/>
              <rect x="92" y="40" width="4" height="8" fill="#ff77aa"/>

              {/* Coral/salmon segments */}
              <rect x="44" y="16" width="12" height="8" fill="#ff9988"/>
              <rect x="32" y="24" width="12" height="8" fill="#ff8877"/>
              <rect x="24" y="32" width="12" height="8" fill="#ff7766"/>
              <rect x="24" y="40" width="8" height="8" fill="#ff6655"/>

              {/* Yellow segments */}
              <rect x="24" y="48" width="8" height="8" fill="#ffee44"/>
              <rect x="24" y="56" width="8" height="8" fill="#ffdd33"/>
              <rect x="24" y="64" width="8" height="8" fill="#ffcc22"/>

              {/* Green segments */}
              <rect x="28" y="72" width="8" height="8" fill="#88dd66"/>
              <rect x="32" y="80" width="8" height="8" fill="#66cc55"/>
              <rect x="36" y="88" width="8" height="8" fill="#55bb44"/>

              {/* Blue segments (bottom-left) */}
              <rect x="24" y="72" width="4" height="8" fill="#5588ff"/>
              <rect x="24" y="80" width="8" height="8" fill="#4477ee"/>
              <rect x="28" y="88" width="8" height="8" fill="#3366dd"/>
              <rect x="32" y="92" width="8" height="8" fill="#2255cc"/>
              <rect x="44" y="96" width="8" height="8" fill="#1144bb"/>

              {/* Purple/pink segments (bottom) */}
              <rect x="52" y="96" width="12" height="8" fill="#dd88ff"/>
              <rect x="36" y="92" width="8" height="8" fill="#cc77ee"/>
              <rect x="44" y="88" width="8" height="8" fill="#bb66dd"/>

              {/* Cyan/light blue segments (right side) */}
              <rect x="88" y="48" width="8" height="8" fill="#88ddff"/>
              <rect x="88" y="56" width="8" height="8" fill="#77ccee"/>
              <rect x="88" y="64" width="8" height="8" fill="#66bbdd"/>
              <rect x="84" y="72" width="12" height="8" fill="#55aacc"/>
              <rect x="80" y="80" width="12" height="8" fill="#4499bb"/>

              {/* Rainbow gradient segments (mid-right) */}
              <rect x="80" y="32" width="12" height="8" fill="#66dd88"/>
              <rect x="84" y="40" width="12" height="8" fill="#55cc77"/>
              <rect x="88" y="48" width="8" height="8" fill="#77ee99"/>

              {/* Inner white core */}
              <rect x="60" y="32" width="16" height="8" fill="#ffffff"/>
              <rect x="56" y="40" width="24" height="8" fill="#f8f8f8"/>
              <rect x="52" y="48" width="32" height="8" fill="#f0f0f0"/>
              <rect x="52" y="56" width="32" height="8" fill="#e8e8e8"/>
              <rect x="52" y="64" width="32" height="8" fill="#e0e0e0"/>
              <rect x="56" y="72" width="24" height="8" fill="#d8d8d8"/>
              <rect x="60" y="80" width="16" height="8" fill="#d0d0d0"/>

              {/* Center hole - black circle */}
              <rect x="52" y="48" width="16" height="8" fill="#1a1a1a"/>
              <rect x="48" y="52" width="24" height="8" fill="#1a1a1a"/>
              <rect x="48" y="60" width="24" height="8" fill="#1a1a1a"/>
              <rect x="52" y="68" width="16" height="8" fill="#1a1a1a"/>
              
              {/* Inner hole detail */}
              <rect x="56" y="52" width="8" height="4" fill="#000000"/>
              <rect x="52" y="56" width="16" height="8" fill="#000000"/>
              <rect x="52" y="64" width="16" height="4" fill="#000000"/>

              {/* Highlight pixels for shine */}
              <rect x="68" y="28" width="4" height="4" fill="#ffffff" opacity="0.9"/>
              <rect x="72" y="32" width="4" height="4" fill="#ffffff" opacity="0.8"/>
              <rect x="76" y="36" width="4" height="4" fill="#ffffff" opacity="0.7"/>
              <rect x="32" y="36" width="4" height="4" fill="#ffffff" opacity="0.6"/>
              <rect x="36" y="40" width="4" height="4" fill="#ffffff" opacity="0.5"/>
            </g>
          </svg>

          {/* Play/Pause indicator in center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.2 }}
              className="w-8 h-8 flex items-center justify-center"
            >
              <Play className="w-6 h-6 text-black drop-shadow-lg" fill="white" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
}