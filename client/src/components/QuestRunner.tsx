import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, RotateCcw, Play, Gamepad2 } from "lucide-react";
import { playRetroSound } from "@/lib/audio";

export function QuestRunner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [gameState, setGameState] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // Game constants
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 200;
  const PLAYER_SIZE = 36;
  const GROUND_HEIGHT = 20;
  const GRAVITY = 0.5;
  const JUMP_FORCE = -12;

  // Game state refs
  const gameRef = useRef({
    playerY: CANVAS_HEIGHT - PLAYER_SIZE - GROUND_HEIGHT,
    velocityY: 0,
    isJumping: false,
    obstacles: [] as { x: number; width: number; height: number; type: "pipe" | "goomba" }[],
    frameId: 0,
    score: 0,
    gameTime: 0,
  });

  // Scroll activation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && gameState === "idle") {
          startGame();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -100px 0px" } // More sensitive
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [gameState]);

  const startGame = () => {
    setGameState("playing");
    setScore(0);
    gameRef.current = {
      playerY: CANVAS_HEIGHT - PLAYER_SIZE - GROUND_HEIGHT,
      velocityY: 0,
      isJumping: false,
      obstacles: [],
      frameId: 0,
      score: 0,
      gameTime: 0,
    };
    if (gameRef.current.frameId) cancelAnimationFrame(gameRef.current.frameId);
    gameRef.current.frameId = requestAnimationFrame(gameLoop);
  };

  const jump = () => {
    if (!gameRef.current.isJumping && gameState === "playing") {
      gameRef.current.velocityY = JUMP_FORCE;
      gameRef.current.isJumping = true;
      playRetroSound("click");
    }
  };

  const gameLoop = (time: number) => {
    if (gameState !== "playing") return;

    gameRef.current.gameTime++;

    // 1. Update Physics
    gameRef.current.velocityY += GRAVITY;
    gameRef.current.playerY += gameRef.current.velocityY;

    const floorY = CANVAS_HEIGHT - PLAYER_SIZE - GROUND_HEIGHT;
    if (gameRef.current.playerY > floorY) {
      gameRef.current.playerY = floorY;
      gameRef.current.velocityY = 0;
      gameRef.current.isJumping = false;
    }

    // 2. Obstacles spawn
    if (gameRef.current.gameTime % 100 === 0) {
      const type = Math.random() > 0.5 ? "pipe" : "goomba";
      gameRef.current.obstacles.push({
        x: CANVAS_WIDTH,
        width: type === "pipe" ? 40 : 30,
        height: type === "pipe" ? 50 : 25,
        type
      });
    }

    gameRef.current.obstacles.forEach((obs, index) => {
      obs.x -= 5;

      // Collision Detection
      const playerRect = { x: 20, y: gameRef.current.playerY, w: PLAYER_SIZE - 4, h: PLAYER_SIZE };
      const obsRect = { x: obs.x, y: CANVAS_HEIGHT - obs.height - GROUND_HEIGHT, w: obs.width, h: obs.height };

      if (
        playerRect.x < obsRect.x + obsRect.w &&
        playerRect.x + playerRect.w > obsRect.x &&
        playerRect.y < obsRect.y + obsRect.h &&
        playerRect.y + playerRect.h > obsRect.y
      ) {
        setGameState("gameover");
        return;
      }

      if (obs.x < -obs.width) {
        gameRef.current.obstacles.splice(index, 1);
        gameRef.current.score += 10;
        setScore(gameRef.current.score);
      }
    });

    render();

    if (gameState === "playing") {
      gameRef.current.frameId = requestAnimationFrame(gameLoop);
    }
  };

  const render = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // 3. Draw
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    // Draw Sky Background
    ctx.fillStyle = "#5c94fa"; // Mario Blue
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw Clouds (simple)
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    [100, 300, 500, 700].forEach((x, i) => {
      const cloudX = (x - (gameRef.current.gameTime * 0.5)) % (CANVAS_WIDTH + 100);
      ctx.fillRect(cloudX, 30 + (i * 20), 60, 20);
    });

    // Draw Ground
    ctx.fillStyle = "#924838"; // Brick color
    ctx.fillRect(0, CANVAS_HEIGHT - GROUND_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
    // Ground bricks pattern
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    for (let x = 0; x < CANVAS_WIDTH; x += 20) {
      ctx.strokeRect(x, CANVAS_HEIGHT - GROUND_HEIGHT, 20, GROUND_HEIGHT);
    }

    // Draw Mario (Red/Blue pixel box)
    const px = 20;
    const py = gameRef.current.playerY;
    
    // Hat/Body
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(px, py, PLAYER_SIZE, PLAYER_SIZE / 2); // Top half red
    ctx.fillStyle = "#0000ff";
    ctx.fillRect(px, py + PLAYER_SIZE / 2, PLAYER_SIZE, PLAYER_SIZE / 2); // Bottom half blue
    
    // Details
    ctx.fillStyle = "#fce4a0"; // Skin
    ctx.fillRect(px + 10, py + 5, 15, 10);
    ctx.fillStyle = "#000"; // Eye
    ctx.fillRect(px + 20, py + 7, 3, 3);
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.strokeRect(px, py, PLAYER_SIZE, PLAYER_SIZE);

    // Draw Obstacles
    gameRef.current.obstacles.forEach(obs => {
      if (obs.type === "pipe") {
        ctx.fillStyle = "#74bf2e"; // Pipe green
        ctx.fillRect(obs.x, CANVAS_HEIGHT - obs.height - GROUND_HEIGHT, obs.width, obs.height);
        ctx.strokeStyle = "#000";
        ctx.strokeRect(obs.x, CANVAS_HEIGHT - obs.height - GROUND_HEIGHT, obs.width, obs.height);
        // Pipe lip
        ctx.fillRect(obs.x - 4, CANVAS_HEIGHT - obs.height - GROUND_HEIGHT, obs.width + 8, 10);
        ctx.strokeRect(obs.x - 4, CANVAS_HEIGHT - obs.height - GROUND_HEIGHT, obs.width + 8, 10);
      } else {
        ctx.fillStyle = "#924838"; // Goomba brown
        ctx.beginPath();
        const gx = obs.x + obs.width / 2;
        const gy = CANVAS_HEIGHT - GROUND_HEIGHT;
        ctx.arc(gx, gy - 12, 12, 0, Math.PI, true);
        ctx.fill();
        ctx.stroke();
        // Feet
        ctx.fillStyle = "#000";
        ctx.fillRect(obs.x + 5, gy - 5, 8, 5);
        ctx.fillRect(obs.x + 17, gy - 5, 8, 5);
      }
    });
  };

  // Initial draw
  useEffect(() => {
    render();
  }, []);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "playing") jump();
        else if (gameState === "idle" || gameState === "gameover") startGame();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState]);

  return (
    <div ref={containerRef} className="max-w-4xl mx-auto my-12 p-4">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary text-primary-foreground">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <h2 className="font-pixel text-xl text-primary uppercase tracking-tighter">SUPER USHA BROS</h2>
        </div>
        <div className="flex gap-8 font-pixel text-[10px]">
          <div className="flex flex-col items-center">
            <span className="text-muted-foreground mb-1">HI-SCORE</span>
            <span className="text-primary">{highScore.toString().padStart(6, '0')}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-white mb-1">SCORE</span>
            <span className="text-secondary">{score.toString().padStart(6, '0')}</span>
          </div>
        </div>
      </div>

      <div 
        className="relative bg-[#5c94fa] border-4 border-primary overflow-hidden cursor-pointer shadow-[20px_20px_0_0_rgba(0,0,0,0.3)] crt-screen"
        onClick={gameState === "playing" ? jump : startGame}
      >
        <canvas 
          ref={canvasRef} 
          width={CANVAS_WIDTH} 
          height={CANVAS_HEIGHT}
          className="w-full h-auto block"
        />

        <AnimatePresence>
          {gameState === "idle" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-6"
            >
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }} 
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-primary font-pixel text-4xl mb-4 tracking-tighter text-shadow-glow"
                >
                  PRESS START
                </motion.div>
                <div className="text-white font-pixel text-[10px] space-y-2">
                  <p>SPACE or CLICK to Jump</p>
                  <p className="text-secondary opacity-80">PROMPT: SURVIVE THE MULTIVERSE</p>
                </div>
              </div>
              <button 
                className="group flex items-center gap-2 bg-primary text-primary-foreground font-pixel text-lg px-8 py-4 border-4 border-white shadow-[8px_8px_0_0_#924838] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                <Play className="w-6 h-6 fill-current" /> PLAY
              </button>
            </motion.div>
          )}

          {gameState === "gameover" && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center gap-4"
            >
              <div className="text-red-500 font-pixel text-5xl mb-2 tracking-tighter drop-shadow-[4px_4px_0_#000]">GAME OVER</div>
              <div className="text-white font-pixel text-xs mb-6">FINAL SCORE: {score}</div>
              <button 
                onClick={(e) => { e.stopPropagation(); startGame(); }}
                className="flex items-center gap-2 bg-white text-black font-pixel text-sm px-8 py-4 border-4 border-[#924838] shadow-[6px_6px_0_0_#000] hover:bg-primary transition-all active:translate-y-1"
              >
                <RotateCcw className="w-5 h-5" /> RESTART
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-6 flex justify-between items-center text-muted-foreground font-pixel text-[8px] uppercase tracking-widest">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary animate-pulse" />
          Quest Runner v2.0 - Super Usha Edition
        </div>
        <div>(c) 2026 yoURFest Team</div>
      </div>
    </div>
  );
}
