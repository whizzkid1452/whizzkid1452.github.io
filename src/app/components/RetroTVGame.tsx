import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Heart, Star, Trophy, Crown, Volume2, VolumeX, Sparkles, Circle } from "lucide-react";
import tvFrame from "../../assets/a4c2387cc1f716bddb12291ecce2aba5d13893b0.png";

interface Obstacle {
  id: number;
  x: number;
  type: "block" | "spike" | "cloud";
}

export function RetroTVGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const [isDucking, setIsDucking] = useState(false);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameSpeed, setGameSpeed] = useState(5);
  const [soundOn, setSoundOn] = useState(false);
  const [selectedGame, setSelectedGame] = useState<"princess" | "hearts" | null>(null);
  
  // Heart Catcher Game State
  const [lives, setLives] = useState(3);
  const [playerX, setPlayerX] = useState(50);
  const [fallingObjects, setFallingObjects] = useState<any[]>([]);
  const [decorClouds] = useState([
    { x: 10, y: 15, size: 30 },
    { x: 75, y: 10, size: 25 },
    { x: 45, y: 8, size: 20 },
  ]);

  // Load high score
  useEffect(() => {
    if (selectedGame === "princess") {
      const saved = localStorage.getItem("tv-princess-highscore");
      if (saved) setHighScore(parseInt(saved));
    } else if (selectedGame === "hearts") {
      const saved = localStorage.getItem("tv-hearts-highscore");
      if (saved) setHighScore(parseInt(saved));
    }
  }, [selectedGame]);

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      if (selectedGame === "princess") {
        localStorage.setItem("tv-princess-highscore", score.toString());
      } else if (selectedGame === "hearts") {
        localStorage.setItem("tv-hearts-highscore", score.toString());
      }
    }
  }, [score, highScore, selectedGame]);

  // Princess Runner - Spawn obstacles
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "princess") return;

    const interval = setInterval(() => {
      const types: Array<"block" | "spike" | "cloud"> = ["block", "spike", "cloud"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      setObstacles(prev => [...prev, {
        id: Date.now() + Math.random(),
        x: 100,
        type: randomType,
      }]);
    }, 2000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, selectedGame]);

  // Princess Runner - Move obstacles
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "princess") return;

    const interval = setInterval(() => {
      setObstacles(prev => {
        return prev
          .map(obs => ({ ...obs, x: obs.x - gameSpeed }))
          .filter(obs => {
            if (obs.x >= 10 && obs.x <= 20) {
              if (obs.type === "cloud" && isDucking) {
                setScore(s => s + 5);
                return false;
              }
              if ((obs.type === "block" || obs.type === "spike") && !isJumping) {
                setGameOver(true);
                return false;
              }
              if (isJumping && (obs.type === "block" || obs.type === "spike")) {
                setScore(s => s + 10);
                return false;
              }
            }
            return obs.x > -10;
          });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, isJumping, isDucking, gameSpeed, selectedGame]);

  // Heart Catcher - Spawn falling objects
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "hearts") return;

    const interval = setInterval(() => {
      const types: Array<"heart" | "star" | "bomb"> = ["heart", "heart", "star", "bomb"];
      const randomType = types[Math.floor(Math.random() * types.length)];
      
      setFallingObjects(prev => [...prev, {
        id: Date.now() + Math.random(),
        x: Math.random() * 80 + 10,
        y: -10,
        type: randomType,
        speed: Math.random() * 2 + 2,
      }]);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, selectedGame]);

  // Heart Catcher - Move falling objects
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "hearts") return;

    const interval = setInterval(() => {
      setFallingObjects(prev => {
        return prev
          .map(obj => ({ ...obj, y: obj.y + obj.speed }))
          .filter(obj => {
            if (obj.y >= 75 && obj.y <= 85) {
              if (Math.abs(obj.x - playerX) < 10) {
                if (obj.type === "heart") {
                  setScore(s => s + 10);
                } else if (obj.type === "star") {
                  setScore(s => s + 20);
                } else if (obj.type === "bomb") {
                  setLives(l => {
                    const newLives = l - 1;
                    if (newLives <= 0) setGameOver(true);
                    return newLives;
                  });
                }
                return false;
              }
            }
            return obj.y < 100;
          });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, playerX, selectedGame]);

  // Increase speed (Princess Runner)
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "princess") return;

    const interval = setInterval(() => {
      setGameSpeed(speed => Math.min(speed + 0.5, 12));
    }, 5000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, selectedGame]);

  // Increment score over time (Princess Runner)
  useEffect(() => {
    if (!gameStarted || gameOver || selectedGame !== "princess") return;

    const interval = setInterval(() => {
      setScore(s => s + 1);
    }, 100);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver, selectedGame]);

  // Keyboard controls
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGame === "princess") {
        if (e.key === " " || e.key === "ArrowUp") {
          e.preventDefault();
          if (!isJumping && !isDucking) {
            setIsJumping(true);
            setTimeout(() => setIsJumping(false), 600);
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (!isJumping) setIsDucking(true);
        }
      } else if (selectedGame === "hearts") {
        if (e.key === "ArrowLeft") {
          setPlayerX(x => Math.max(10, x - 5));
        } else if (e.key === "ArrowRight") {
          setPlayerX(x => Math.min(90, x + 5));
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
  }, [gameStarted, gameOver, isJumping, isDucking, selectedGame]);

  const startGame = (game: "princess" | "hearts") => {
    setSelectedGame(game);
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setFallingObjects([]);
    setIsJumping(false);
    setIsDucking(false);
    setGameSpeed(5);
    setLives(3);
    setPlayerX(50);
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    setObstacles([]);
    setFallingObjects([]);
    setIsJumping(false);
    setIsDucking(false);
    setGameSpeed(5);
    setLives(3);
    setPlayerX(50);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto my-8 md:my-12">
      {/* TV Frame Container */}
      <div className="relative">
        {/* TV Frame Image */}
        <img 
          src={tvFrame} 
          alt="Retro TV"
          className="w-full h-auto relative z-10 pointer-events-none"
        />
        
        {/* TV Screen Content - positioned absolutely inside the frame */}
        <div 
          className="absolute top-[4%] left-[4%] w-[60%] h-[78%] overflow-hidden"
          style={{
            borderRadius: "8% 8% 8% 8%",
            background: "repeating-conic-gradient(#fce7f3 0% 25%, #f3e8ff 0% 50%) 50% / 4px 4px",
          }}
        >
          {/* Game Selection Screen */}
          {!gameStarted && !selectedGame && (
            <div className="w-full h-full relative" 
              style={{
                background: "linear-gradient(180deg, #fce7f3 0%, #f3e8ff 50%, #fce7f3 100%)",
              }}
            >
              {/* Decorative pastel dots pattern */}
              <div className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle, #ec4899 1px, transparent 1px)`,
                  backgroundSize: "8px 8px",
                }}
              />
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center space-y-4"
                >
                  {/* Cute header with rounded box */}
                  <div className="bg-white/90 border-4 border-purple-300 rounded-3xl px-6 py-4 shadow-lg"
                    style={{
                      boxShadow: "0 8px 0 0 #c084fc, 0 8px 20px rgba(236, 72, 153, 0.3)",
                    }}
                  >
                    <h2 
                      className="text-purple-600 text-lg md:text-xl mb-2"
                      style={{ 
                        fontFamily: "'Press Start 2P', monospace",
                        textShadow: "2px 2px 0px rgba(236, 72, 153, 0.3)"
                      }}
                    >
                      ♡ SELECT ♡
                    </h2>
                    <div className="flex gap-2 justify-center">
                      <Sparkles className="w-4 h-4 text-pink-400 fill-pink-400" />
                      <Sparkles className="w-4 h-4 text-purple-400 fill-purple-400" />
                      <Sparkles className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startGame("princess")}
                      className="w-full px-6 py-4 bg-gradient-to-br from-pink-200 via-pink-300 to-pink-200 border-4 border-pink-400 rounded-2xl text-purple-700 text-sm md:text-base shadow-lg"
                      style={{ 
                        fontFamily: "'Press Start 2P', monospace",
                        boxShadow: "0 6px 0 0 #ec4899, 0 6px 15px rgba(236, 72, 153, 0.4)",
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">👸</span>
                        <span>RUN!</span>
                      </div>
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => startGame("hearts")}
                      className="w-full px-6 py-4 bg-gradient-to-br from-purple-200 via-purple-300 to-purple-200 border-4 border-purple-400 rounded-2xl text-pink-700 text-sm md:text-base shadow-lg"
                      style={{ 
                        fontFamily: "'Press Start 2P', monospace",
                        boxShadow: "0 6px 0 0 #c084fc, 0 6px 15px rgba(192, 132, 252, 0.4)",
                      }}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl">💖</span>
                        <span>CATCH!</span>
                      </div>
                    </motion.button>
                  </div>

                  <div className="mt-6 flex justify-center gap-3">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -8, 0],
                          rotate: [0, 180, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          )}

          {/* Princess Runner Game */}
          {selectedGame === "princess" && !gameOver && gameStarted && (
            <div className="w-full h-full relative"
              style={{
                background: "linear-gradient(180deg, #fde2ff 0%, #fce7f3 30%, #ffe4f8 100%)",
              }}
            >
              {/* Cute dot pattern background */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, #ec4899 1.5px, transparent 1.5px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Decorative clouds */}
              {decorClouds.map((cloud, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{ left: `${cloud.x}%`, top: `${cloud.y}%` }}
                  animate={{
                    x: [0, 10, 0],
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="flex gap-1 items-end">
                    <div className={`w-${cloud.size / 5} h-${cloud.size / 5} bg-white/60 rounded-full border-2 border-purple-200`} 
                      style={{ width: cloud.size, height: cloud.size }}
                    />
                    <div className={`w-${cloud.size / 4} h-${cloud.size / 4} bg-white/60 rounded-full border-2 border-purple-200`} 
                      style={{ width: cloud.size * 0.8, height: cloud.size * 0.8 }}
                    />
                  </div>
                </motion.div>
              ))}
              
              {/* Score Display - Cute bubble style */}
              <div className="absolute top-2 left-2 right-2 flex justify-between z-20">
                <div className="bg-white/90 border-3 border-pink-300 rounded-full px-3 py-1 shadow-md">
                  <span className="text-purple-600 text-xs font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                    ♡ {score}
                  </span>
                </div>
                <div className="bg-white/90 border-3 border-purple-300 rounded-full px-3 py-1 shadow-md">
                  <span className="text-pink-500 text-xs font-bold" style={{ fontFamily: "'VT323', monospace" }}>
                    ⚡{gameSpeed.toFixed(1)}x
                  </span>
                </div>
              </div>

              {/* Ground - Pastel platform */}
              <div className="absolute bottom-[20%] left-0 right-0">
                <div className="h-3 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 border-t-4 border-purple-400" />
                <div className="h-2 bg-purple-200" />
              </div>
              
              {/* Princess Character */}
              <motion.div
                className="absolute left-[15%] z-10"
                animate={{
                  bottom: isJumping ? "60%" : isDucking ? "18%" : "23%",
                }}
                transition={{
                  duration: isJumping ? 0.6 : 0.2,
                  ease: isJumping ? "easeOut" : "easeInOut",
                }}
              >
                <motion.div
                  animate={{
                    rotate: isJumping ? [0, 360] : 0,
                    scale: isDucking ? [1, 0.7, 1] : 1,
                  }}
                  className="relative"
                >
                  <div className="text-4xl md:text-5xl drop-shadow-lg">👸</div>
                  {isJumping && (
                    <motion.div
                      initial={{ opacity: 1, scale: 0.5 }}
                      animate={{ opacity: 0, scale: 2 }}
                      transition={{ duration: 0.6 }}
                      className="absolute -top-2 -right-2"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>

              {/* Obstacles - Cute pastel style */}
              {obstacles.map(obs => (
                <div
                  key={obs.id}
                  className="absolute"
                  style={{
                    left: `${obs.x}%`,
                    bottom: obs.type === "cloud" ? "50%" : "23%",
                  }}
                >
                  {obs.type === "block" && (
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-purple-300 to-purple-400 border-3 border-purple-500 rounded-lg shadow-lg relative">
                      <div className="absolute inset-1 bg-white/30 rounded" />
                    </div>
                  )}
                  {obs.type === "spike" && (
                    <div className="flex items-end gap-0.5">
                      <div className="relative">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[28px] border-b-pink-400 drop-shadow-lg" />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[18px] border-b-pink-300" />
                      </div>
                      <div className="relative">
                        <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[28px] border-b-pink-400 drop-shadow-lg" />
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[18px] border-b-pink-300" />
                      </div>
                    </div>
                  )}
                  {obs.type === "cloud" && (
                    <div className="flex gap-1 items-center">
                      <div className="w-8 h-8 bg-white/80 rounded-full border-3 border-purple-200 shadow-md" />
                      <div className="w-6 h-6 bg-white/80 rounded-full border-3 border-purple-200 shadow-md" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Heart Catcher Game */}
          {selectedGame === "hearts" && !gameOver && gameStarted && (
            <div className="w-full h-full relative"
              style={{
                background: "linear-gradient(180deg, #f3e8ff 0%, #fce7f3 50%, #f3e8ff 100%)",
              }}
            >
              {/* Cute dot pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, #c084fc 1.5px, transparent 1.5px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Decorative stars */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${(i * 20) % 100}%`,
                    top: `${(i * 15) % 60}%`,
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 0.5,
                  }}
                >
                  <Star className="w-4 h-4 text-yellow-300 fill-yellow-200 opacity-40" />
                </motion.div>
              ))}
              
              {/* Score and Lives - Cute bubble style */}
              <div className="absolute top-2 left-2 right-2 flex justify-between z-20">
                <div className="bg-white/90 border-3 border-purple-300 rounded-full px-3 py-1 shadow-md">
                  <span className="text-purple-600 text-xs font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                    ♡ {score}
                  </span>
                </div>
                <div className="bg-white/90 border-3 border-pink-300 rounded-full px-2 py-1 flex gap-1 shadow-md">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Heart
                      key={i}
                      className={`w-3 h-3 ${i < lives ? "text-pink-400 fill-pink-400" : "text-gray-300 fill-gray-300"}`}
                    />
                  ))}
                </div>
              </div>

              {/* Falling Objects - Cute style */}
              {fallingObjects.map(obj => (
                <motion.div
                  key={obj.id}
                  className="absolute"
                  style={{
                    left: `${obj.x}%`,
                    top: `${obj.y}%`,
                  }}
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {obj.type === "heart" && (
                    <div className="relative">
                      <Heart className="w-7 h-7 text-pink-400 fill-pink-400 drop-shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-white/60 rounded-full" />
                      </div>
                    </div>
                  )}
                  {obj.type === "star" && (
                    <div className="relative">
                      <Star className="w-7 h-7 text-yellow-300 fill-yellow-300 drop-shadow-lg" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="w-3 h-3 text-white" />
                      </div>
                    </div>
                  )}
                  {obj.type === "bomb" && (
                    <div className="w-7 h-7 bg-gradient-to-br from-gray-600 to-gray-800 border-3 border-gray-900 rounded-full flex items-center justify-center shadow-lg">
                      <div className="w-3 h-3 bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse" />
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Player Basket - Super cute! */}
              <div
                className="absolute bottom-[10%] transition-all duration-100 ease-linear"
                style={{
                  left: `${playerX}%`,
                  transform: "translateX(-50%)",
                }}
              >
                <div className="relative">
                  {/* Basket */}
                  <div className="w-14 h-14 bg-gradient-to-br from-pink-200 via-pink-300 to-purple-300 border-4 border-white rounded-full flex items-center justify-center shadow-xl"
                    style={{
                      boxShadow: "0 4px 0 0 #ec4899, 0 4px 15px rgba(236, 72, 153, 0.5)",
                    }}
                  >
                    <div className="text-2xl">🎀</div>
                  </div>
                  {/* Sparkle decoration */}
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute -top-2 -right-2"
                  >
                    <Sparkles className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Game Over Screen - Cute pastel style */}
          {gameOver && (
            <div className="w-full h-full relative"
              style={{
                background: "linear-gradient(180deg, #fce7f3 0%, #f3e8ff 50%, #fce7f3 100%)",
              }}
            >
              {/* Cute dot pattern */}
              <div className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `radial-gradient(circle, #ec4899 1.5px, transparent 1.5px)`,
                  backgroundSize: "12px 12px",
                }}
              />

              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", bounce: 0.5 }}
                  className="text-center space-y-3"
                >
                  {/* Game Over Title */}
                  <div className="bg-white/90 border-4 border-purple-300 rounded-3xl px-6 py-3 shadow-lg"
                    style={{
                      boxShadow: "0 6px 0 0 #c084fc, 0 6px 20px rgba(192, 132, 252, 0.4)",
                    }}
                  >
                    <h2 
                      className="text-purple-600 text-base md:text-lg mb-2"
                      style={{ fontFamily: "'Press Start 2P', monospace" }}
                    >
                      GAME OVER
                    </h2>
                    <div className="flex gap-1 justify-center">
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                      <Heart className="w-3 h-3 text-pink-400 fill-pink-400" />
                    </div>
                  </div>
                  
                  {/* Score Display */}
                  <div className="bg-gradient-to-br from-pink-200 to-purple-200 border-4 border-pink-400 rounded-2xl p-4 shadow-lg"
                    style={{
                      boxShadow: "0 6px 0 0 #ec4899, 0 6px 20px rgba(236, 72, 153, 0.4)",
                    }}
                  >
                    <p className="text-purple-600 text-xs mb-1" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                      ♡ SCORE ♡
                    </p>
                    <p className="text-pink-600 text-3xl font-bold" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                      {score}
                    </p>
                    {score === highScore && score > 0 && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring" }}
                        className="mt-2 flex items-center gap-2 justify-center bg-yellow-200/80 rounded-full px-3 py-1 border-2 border-yellow-400"
                      >
                        <Trophy className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                        <span className="text-yellow-700 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
                          NEW BEST!
                        </span>
                      </motion.div>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => selectedGame && startGame(selectedGame)}
                      className="px-5 py-3 bg-gradient-to-br from-pink-300 to-pink-400 border-4 border-pink-500 rounded-xl text-white text-xs shadow-lg"
                      style={{ 
                        fontFamily: "'Press Start 2P', monospace",
                        boxShadow: "0 4px 0 0 #ec4899",
                      }}
                    >
                      RETRY
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetGame}
                      className="px-5 py-3 bg-gradient-to-br from-purple-300 to-purple-400 border-4 border-purple-500 rounded-xl text-white text-xs shadow-lg"
                      style={{ 
                        fontFamily: "'Press Start 2P', monospace",
                        boxShadow: "0 4px 0 0 #c084fc",
                      }}
                    >
                      MENU
                    </motion.button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>

        {/* Sound Button on TV - Cute style */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSoundOn(!soundOn)}
          className="absolute top-[15%] right-[12%] w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-pink-300 to-pink-400 border-3 border-white flex items-center justify-center z-20 shadow-lg"
          style={{
            boxShadow: "0 3px 0 0 #ec4899, 0 3px 10px rgba(236, 72, 153, 0.4)",
          }}
        >
          {soundOn ? (
            <Volume2 className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow" />
          ) : (
            <VolumeX className="w-4 h-4 md:w-5 md:h-5 text-white drop-shadow" />
          )}
        </motion.button>
      </div>

      {/* Instructions below TV - Cute style */}
      <div className="mt-4 text-center">
        <div className="inline-block bg-white/80 border-3 border-purple-300 rounded-2xl px-4 py-2 shadow-md">
          <p 
            className="text-purple-600 text-xs md:text-sm"
            style={{ fontFamily: "'DungGeunMo', monospace" }}
          >
            {selectedGame === "princess" ? "♡ ↑점프 ↓숙이기 | ↑Jump ↓Duck ♡" : 
             selectedGame === "hearts" ? "♡ ←→ 이동 | ←→ Move ♡" :
             "♡ 게임을 선택하세요! | Select a game! ♡"}
          </p>
        </div>
      </div>
    </div>
  );
}
