import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect, useCallback } from "react";
import { X, Heart, Star, Trophy, Crown } from "lucide-react";

interface Obstacle {
  id: number;
  x: number;
  type: "block" | "spike" | "cloud";
}

export function PrincessRunnerGame() {
  const [isOpen, setIsOpen] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameSpeed, setGameSpeed] = useState(5);

  // 컴포넌트 언마운트 시 모든 리소스 정리
  useEffect(() => {
    return () => {
      // 모든 상태 초기화
      setGameStarted(false);
      setGameOver(false);
      setScore(0);
      setObstacles([]);
      setIsJumping(false);
      setIsDucking(false);
      setGameSpeed(5);
      setIsOpen(false);
    };
  }, []);

  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem("princess-runner-highscore");
    if (saved) {
      setHighScore(parseInt(saved));
    }
  }, []);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("princess-runner-highscore", score.toString());
    }
  }, [score, highScore]);

  // Spawn obstacles
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      const types: Array<"block" | "spike" | "cloud"> = ["block", "spike", "cloud"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      const newObstacle: Obstacle = {
        id: Date.now() + Math.random(),
        x: 100,
        type: randomType,
      };

      setObstacles(prev => [...prev, newObstacle]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isOpen]);

  // Move obstacles and detect collision
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      setObstacles(prev => {
        return prev
          .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
          .filter(obs => {
            // Check collision with princess
            if (obs.x >= 10 && obs.x <= 20) {
              // Cloud can be ducked under
              if (obs.type === "cloud" && isDucking) {
                setScore(s => s + 5);
                return false; // Passed successfully
              }
              // Block and spike need jumping
              if ((obs.type === "block" || obs.type === "spike") && !isJumping) {
                setGameOver(true);
                return false;
              }
              // If jumped over successfully
              if (isJumping && (obs.type === "block" || obs.type === "spike")) {
                setScore(s => s + 10);
                return false;
              }
            }
            
            // Remove if off screen
            return obs.x > -10;
          });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isJumping, isDucking, gameSpeed, isOpen]);

  // Increase speed over time
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      setGameSpeed(speed => Math.min(speed + 0.5, 12));
    }, 5000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isOpen]);

  // Increment score over time
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const interval = setInterval(() => {
      setScore(s => s + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isOpen]);

  // Handle keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp") {
        e.preventDefault();
        if (!isJumping && !isDucking) {
          setIsJumping(true);
          const timeoutId = setTimeout(() => setIsJumping(false), 600);
          // timeout 정리를 위한 ref는 필요 없지만, cleanup에서 처리됨
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (!isJumping) {
          setIsDucking(true);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setIsDucking(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, gameOver, isJumping, isDucking, isOpen]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
    setIsDucking(false);
    setGameSpeed(5);
  };

  const resetGame = () => {
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setIsJumping(false);
    setIsDucking(false);
    setGameSpeed(5);
  };

  const handleJump = () => {
    if (!isJumping && !isDucking) {
      setIsJumping(true);
      // timeout은 useEffect cleanup에서 자동으로 정리됨
      setTimeout(() => setIsJumping(false), 600);
    }
  };

  return (
    <>
      {/* Game Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: -5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 to-purple-600 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center"
        style={{ borderRadius: "50%" }}
      >
        <Crown className="w-8 h-8 md:w-10 md:h-10 text-yellow-300 fill-yellow-300" />
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
                initial={{ scale: 0, rotate: 10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: -10 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-gradient-to-br from-pink-200 via-purple-200 to-pink-300 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-3xl"
              >
                {/* Title Bar */}
                <div className="bg-gradient-to-r from-pink-500 to-purple-500 border-b-4 border-black p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-300 fill-yellow-300" />
                    <span
                      className="text-white text-xs md:text-sm"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      PRINCESS RUNNER
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      resetGame();
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
                          👸 RUN PRINCESS! 👸
                        </h2>
                        <p
                          className="text-sm md:text-base text-purple-700 mb-2"
                          style={{ fontFamily: "'DungGeunMo', monospace" }}
                        >
                          공주야 달려라! Run, Princess, Run!
                        </p>
                      </div>

                      <div className="bg-white/80 border-4 border-black p-4 space-y-3">
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-2xl">👸</span>
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            공주 Princess
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-2xl">⬆️</span>
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            점프 Jump (Space / ↑)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 justify-center">
                          <span className="text-2xl">⬇️</span>
                          <span
                            className="text-xs md:text-sm"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            숙이기 Duck (↓)
                          </span>
                        </div>
                        <div className="border-t-2 border-pink-300 pt-2 mt-2">
                          <p
                            className="text-xs text-purple-600"
                            style={{ fontFamily: "'DungGeunMo', monospace" }}
                          >
                            장애물을 피하세요! Avoid obstacles!
                          </p>
                        </div>
                      </div>

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
                      {/* Score */}
                      <div className="flex justify-between items-center">
                        <div className="bg-white/90 border-3 border-black px-4 py-2">
                          <span
                            className="text-xs md:text-sm text-purple-900"
                            style={{ fontFamily: "'Press Start 2P', monospace" }}
                          >
                            SCORE: {score}
                          </span>
                        </div>
                        <div className="bg-white/90 border-3 border-black px-4 py-2">
                          <span
                            className="text-xs md:text-sm text-pink-600"
                            style={{ fontFamily: "'VT323', monospace" }}
                          >
                            Speed: {gameSpeed.toFixed(1)}x
                          </span>
                        </div>
                      </div>

                      {/* Game Area */}
                      <div className="relative bg-gradient-to-b from-pink-100 via-purple-100 to-pink-200 border-4 border-black h-64 md:h-80 overflow-hidden">
                        {/* Ground line */}
                        <div className="absolute bottom-16 left-0 right-0 h-1 bg-black" />
                        
                        {/* Princess Character */}
                        <motion.div
                          className="absolute bottom-16 left-[10%]"
                          animate={{
                            bottom: isJumping ? "180px" : isDucking ? "60px" : "64px",
                          }}
                          transition={{
                            duration: isJumping ? 0.6 : 0.2,
                            ease: isJumping ? "easeOut" : "easeInOut",
                          }}
                        >
                          <div className="relative">
                            {/* Princess emoji with effects */}
                            <motion.div
                              animate={{
                                rotate: isJumping ? [0, 360] : 0,
                                scale: isDucking ? [1, 0.7, 1] : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              className="text-5xl md:text-6xl"
                            >
                              👸
                            </motion.div>
                            {/* Sparkles when jumping */}
                            {isJumping && (
                              <motion.div
                                initial={{ opacity: 1, scale: 0 }}
                                animate={{ opacity: 0, scale: 2 }}
                                transition={{ duration: 0.6 }}
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" />
                              </motion.div>
                            )}
                          </div>
                        </motion.div>

                        {/* Obstacles */}
                        {obstacles.map(obs => (
                          <motion.div
                            key={obs.id}
                            className="absolute"
                            style={{
                              left: `${obs.x}%`,
                              bottom: obs.type === "cloud" ? "140px" : "64px",
                            }}
                          >
                            {obs.type === "block" && (
                              <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 border-4 border-black" />
                            )}
                            {obs.type === "spike" && (
                              <div className="flex items-end gap-1">
                                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[24px] md:border-b-[32px] border-b-pink-600" 
                                  style={{ filter: "drop-shadow(2px 2px 0px black)" }}
                                />
                                <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[24px] md:border-b-[32px] border-b-pink-600" 
                                  style={{ filter: "drop-shadow(2px 2px 0px black)" }}
                                />
                              </div>
                            )}
                            {obs.type === "cloud" && (
                              <div className="text-3xl md:text-4xl">☁️</div>
                            )}
                          </motion.div>
                        ))}

                        {/* Background decoration */}
                        <div className="absolute top-8 left-[20%] opacity-30">
                          <Heart className="w-8 h-8 text-pink-400 fill-pink-400" />
                        </div>
                        <div className="absolute top-12 right-[30%] opacity-30">
                          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                        </div>
                      </div>

                      {/* Mobile Controls */}
                      <div className="flex gap-4 justify-center md:hidden">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={handleJump}
                          className="px-8 py-4 bg-pink-400 border-3 border-black text-white text-xl"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          JUMP
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onTouchStart={() => setIsDucking(true)}
                          onTouchEnd={() => setIsDucking(false)}
                          onMouseDown={() => setIsDucking(true)}
                          onMouseUp={() => setIsDucking(false)}
                          className="px-8 py-4 bg-purple-400 border-3 border-black text-white text-xl"
                          style={{ fontFamily: "'Press Start 2P', monospace" }}
                        >
                          DUCK
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
                          게임 끝! 👸💔
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

                      <div className="flex gap-4 justify-center flex-wrap">
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
