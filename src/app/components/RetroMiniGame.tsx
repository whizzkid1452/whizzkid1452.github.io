import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, Heart, Star, Trophy } from "lucide-react";

interface FallingObject {
  id: number;
  x: number;
  y: number;
  type: "heart" | "star" | "bomb";
  speed: number;
}

export function RetroMiniGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [playerX, setPlayerX] = useState(50);
  const [fallingObjects, setFallingObjects] = useState<FallingObject[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);

  // 컴포넌트 언마운트 시 모든 리소스 정리
  useEffect(() => {
    return () => {
      // 모든 상태 초기화
      setGameStarted(false);
      setGameOver(false);
      setScore(0);
      setLives(3);
      setPlayerX(50);
      setFallingObjects([]);
      setIsOpen(false);
    };
  }, []);

  // Load high score from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("retro-game-highscore");
    if (saved) {
      setHighScore(parseInt(saved));
    }
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("retro-game-highscore", score.toString());
    }
  }, [score, highScore]);

  // Spawn falling objects
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      const types: Array<"heart" | "star" | "bomb"> = ["heart", "heart", "star", "bomb"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newObject: FallingObject = {
        id: Date.now() + Math.random(),
        x: Math.random() * 90 + 5,
        y: -10,
        type: randomType,
        speed: Math.random() * 2 + 2,
      };

      setFallingObjects(prev => [...prev, newObject]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isOpen]);

  // Move falling objects
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      setFallingObjects(prev => {
        return prev
          .map(obj => ({ ...obj, y: obj.y + obj.speed }))
          .filter(obj => {
            // Check collision with player
            if (obj.y >= 85 && obj.y <= 95) {
              if (Math.abs(obj.x - playerX) < 8) {
                // Caught!
                if (obj.type === "heart") {
                  setScore(s => s + 10);
                } else if (obj.type === "star") {
                  setScore(s => s + 20);
                } else if (obj.type === "bomb") {
                  setLives(l => {
                    const newLives = l - 1;
                    if (newLives <= 0) {
                      setGameOver(true);
                    }
                    return newLives;
                  });
                }
                return false; // Remove caught object
              }
            }
            
            // Remove if off screen
            return obj.y < 100;
          });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, playerX, isOpen]);

  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setPlayerX(x => Math.max(5, x - 5));
      } else if (e.key === "ArrowRight") {
        setPlayerX(x => Math.min(95, x + 5));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, gameOver, isOpen]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setFallingObjects([]);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setLives(3);
    setPlayerX(50);
    setFallingObjects([]);
  };

  return (
    <>
      {/* Game Button - Always visible */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-400 to-purple-500 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
        style={{ borderRadius: "50%" }}
      >
        <Star className="w-8 h-8 md:w-10 md:h-10 text-yellow-300 fill-yellow-300" />
      </motion.button>

      {/* Game Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => {
                resetGame();
                setIsOpen(false);
              }}
            >
              {/* Game Window */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-2xl"
              >
                {/* Title Bar */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 border-b-4 border-black p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span
                      className="text-white text-xs md:text-sm"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      HEART CATCHER
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      resetGame();
                      setIsOpen(false);
                    }}
                    className="w-8 h-8 bg-red-500 border-2 border-black hover:bg-red-600 flex items-center justify-center"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Game Content */}
                <div className="p-4 md:p-6">
                  {!gameStarted && !gameOver && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center space-y-6"
                    >
                      <div>
                        <h2
                          className="text-2xl md:text-3xl text-purple-900 mb-4"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          💖 CATCH HEARTS! 💖
                        </h2>
                        <p
                          className="text-sm md:text-base text-purple-700 mb-2"
                          style={{ fontFamily: "'DungGeunMo', monospace" }}
                        >
                          하트를 잡아요! Catch the hearts!
                        </p>
                      </div>

                      <div className="bg-white/80 border-4 border-black p-4 space-y-3">
                        <div className="flex items-center gap-2 justify-center">
                          <Heart className="w-6 h-6 text-pink-500 fill-pink-500" />
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            하트 = +10점 Heart = +10 points
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            별 = +20점 Star = +20 points
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <div className="w-6 h-6 bg-gray-800 border-2 border-black" />
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            폭탄 = -1 생명 Bomb = -1 life
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p
                          className="text-xs md:text-sm text-purple-600"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          Use ← → Arrow Keys
                        </p>
                        {highScore > 0 && (
                          <div className="flex items-center gap-2 justify-center">
                            <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span
                              className="text-sm text-purple-700"
                              style={{ fontFamily: "'VT323', monospace" }}
                            >
                              High Score: {highScore}
                            </span>
                          </div>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={startGame}
                        className="px-8 py-4 bg-gradient-to-br from-pink-400 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-sm md:text-base"
                        style={{ fontFamily: "'Press Start 2P', monospace" }}
                      >
                        START GAME
                      </motion.button>
                    </motion.div>
                  )}

                  {gameStarted && !gameOver && (
                    <div className="space-y-4">
                      {/* Score and Lives */}
                      <div className="flex justify-between items-center">
                        <div className="bg-white/90 border-3 border-black px-4 py-2">
                          <span
                            className="text-xs md:text-sm text-purple-900"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            SCORE: {score}
                          </span>
                        </div>
                        <div className="bg-white/90 border-3 border-black px-4 py-2 flex items-center gap-2">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <Heart
                              key={i}
                              className={`w-5 h-5 ${
                                i < lives
                                  ? "text-pink-500 fill-pink-500"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Game Area */}
                      <div className="relative bg-gradient-to-b from-purple-100 to-pink-100 border-4 border-black h-96 md:h-[500px] overflow-hidden">
                        {/* Falling Objects */}
                        {fallingObjects.map(obj => (
                          <motion.div
                            key={obj.id}
                            className="absolute"
                            style={{
                              left: `${obj.x}%`,
                              top: `${obj.y}%`,
                            }}
                          >
                            {obj.type === "heart" && (
                              <Heart className="w-8 h-8 text-pink-500 fill-pink-500" />
                            )}
                            {obj.type === "star" && (
                              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                            )}
                            {obj.type === "bomb" && (
                              <div className="w-8 h-8 bg-gray-800 border-2 border-black" />
                            )}
                          </motion.div>
                        ))}

                        {/* Player */}
                        <motion.div
                          className="absolute bottom-4 w-16 h-16 bg-gradient-to-br from-pink-400 to-purple-500 border-4 border-black"
                          style={{
                            left: `${playerX}%`,
                            transform: "translateX(-50%)",
                          }}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.5, repeat: Infinity }}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-2xl">🎀</span>
                          </div>
                        </motion.div>
                      </div>

                      {/* Mobile Controls */}
                      <div className="flex gap-4 justify-center md:hidden">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onMouseDown={() => setPlayerX(x => Math.max(5, x - 3))}
                          className="px-6 py-3 bg-pink-400 border-3 border-black text-white text-xl"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          ←
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onMouseDown={() => setPlayerX(x => Math.min(95, x + 3))}
                          className="px-6 py-3 bg-pink-400 border-3 border-black text-white text-xl"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          →
                        </motion.button>
                      </div>
                    </div>
                  )}

                  {gameOver && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center space-y-6"
                    >
                      <div>
                        <h2
                          className="text-2xl md:text-3xl text-purple-900 mb-4"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          GAME OVER!
                        </h2>
                        <p
                          className="text-xl md:text-2xl text-pink-600"
                          style={{ fontFamily: "'DungGeunMo', monospace" }}
                        >
                          게임 종료!
                        </p>
                      </div>

                      <div className="bg-white/90 border-4 border-black p-6 space-y-4">
                        <div>
                          <p
                            className="text-sm text-purple-700 mb-2"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            YOUR SCORE
                          </p>
                          <p
                            className="text-4xl text-pink-600"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            {score}
                          </p>
                        </div>

                        {score === highScore && score > 0 && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center gap-2 justify-center"
                          >
                            <Trophy className="w-8 h-8 text-yellow-500 fill-yellow-500" />
                            <span
                              className="text-sm text-yellow-600"
                              style={{ fontFamily: "'Press Start 2P', monospace" }}
                            >
                              NEW HIGH SCORE!
                            </span>
                          </motion.div>
                        )}

                        {highScore > 0 && score !== highScore && (
                          <div>
                            <p
                              className="text-xs text-purple-600"
                              style={{ fontFamily: "'VT323', monospace" }}
                            >
                              High Score: {highScore}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-4 justify-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={startGame}
                          className="px-6 py-3 bg-gradient-to-br from-pink-400 to-pink-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-sm"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          RETRY
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setIsOpen(false);
                            resetGame();
                          }}
                          className="px-6 py-3 bg-gradient-to-br from-purple-400 to-purple-500 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-white text-sm"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          CLOSE
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
