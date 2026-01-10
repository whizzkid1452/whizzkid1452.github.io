import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Music, X } from "lucide-react";

export function RetroMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Placeholder BGM URL - 사용자가 자신의 음악 URL로 교체할 수 있습니다
  // 무료 로열티 프리 음악을 사용하거나, 자신의 음악 파일 URL을 입력하세요
  // 예시: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  const bgmUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // 여기에 음악 URL을 입력하세요

  useEffect(() => {
    // Load saved volume from localStorage
    const savedVolume = localStorage.getItem("bgm-volume");
    if (savedVolume) {
      setVolume(parseFloat(savedVolume));
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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    localStorage.setItem("bgm-volume", newVolume.toString());
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (!bgmUrl) {
    return null; // BGM URL이 없으면 플레이어를 표시하지 않음
  }

  return (
    <>
      <audio ref={audioRef} src={bgmUrl} loop />
      
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {/* Retro Window Style Music Player */}
            <div className="bg-gradient-to-br from-pink-400 to-purple-500 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.8)] w-72 md:w-80">
              {/* Title Bar */}
              <div className="bg-gradient-to-r from-pink-600 to-purple-600 border-b-4 border-black px-3 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-white" />
                  <span className="text-white text-[10px]">BGM Player</span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="bg-pink-500 hover:bg-pink-600 border-2 border-black w-6 h-6 flex items-center justify-center transition-colors"
                >
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>

              {/* Player Content */}
              <div className="p-4 space-y-4">
                {/* Song Title */}
                <div className="bg-black/20 border-2 border-black p-2">
                  <div className="text-white text-[8px] truncate flex items-center gap-2">
                    <Music className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate" style={{ fontFamily: "'DungGeunMo', monospace" }}>
                      레트로 BGM • Retro Music
                    </span>
                  </div>
                </div>

                {/* Play Controls */}
                <div className="flex items-center justify-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={togglePlay}
                    className="bg-gradient-to-br from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.8)] w-16 h-16 flex items-center justify-center transition-all"
                  >
                    {isPlaying ? (
                      <Pause className="w-8 h-8 text-white fill-white" />
                    ) : (
                      <Play className="w-8 h-8 text-white fill-white ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* Volume Control */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white text-[8px]">VOLUME</span>
                    <button
                      onClick={toggleMute}
                      className="bg-pink-500 hover:bg-pink-600 border-2 border-black px-2 py-1 transition-colors"
                    >
                      {isMuted || volume === 0 ? (
                        <VolumeX className="w-3 h-3 text-white" />
                      ) : (
                        <Volume2 className="w-3 h-3 text-white" />
                      )}
                    </button>
                  </div>
                  
                  {/* Custom Pixel Slider */}
                  <div className="relative">
                    <div className="h-3 bg-black border-2 border-black">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-purple-500 transition-all"
                        style={{ width: `${volume * 100}%` }}
                      />
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={handleVolumeChange}
                      className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Equalizer Bars Animation */}
                {isPlaying && (
                  <div className="flex items-end justify-center gap-1 h-12">
                    {[...Array(8)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 bg-gradient-to-t from-pink-500 to-purple-400 border border-black"
                        animate={{
                          height: ["20%", "80%", "40%", "90%", "30%"],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          delay: i * 0.1,
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Button */}
      {isMinimized && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] w-16 h-16 flex items-center justify-center"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          <Music className="w-8 h-8 text-white" />
        </motion.button>
      )}
    </>
  );
}