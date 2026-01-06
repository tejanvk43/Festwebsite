import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const lines = [
  "INITIALIZING YOURFEST SYSTEM...",
  "CONNECTING TO NEON CORES...",
  "LOADING VIRTUAL VIBES [OK]",
  "SYNCHRONIZING DANCE FLOORS [OK]",
  "GATHERING CULTURAL DATA...",
  "ACCESS GRANTED.",
  "WELCOME TO yoURFest 2026."
];

export function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (currentLine < lines.length) {
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
      }, currentLine === 0 ? 800 : 400); // First line slower, others faster
      return () => clearTimeout(timer);
    } else {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
        setTimeout(onFinished, 1000); // Transition time
      }, 1000);
      return () => clearTimeout(exitTimer);
    }
  }, [currentLine, onFinished]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          id="loading-screen"
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-6 font-pixel overflow-hidden"
          exit={{ 
            opacity: 0,
            scale: 1.1,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "circIn" }
          }}
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-20 pointer-events-none z-10"
               style={{ 
                 background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))",
                 backgroundSize: "100% 4px, 3px 100%"
               }} 
          />
          
          <div className="max-w-md w-full space-y-4 relative">
            {/* Terminal Window */}
            <div className="border-2 border-primary/30 p-6 bg-background/50 backdrop-blur-sm relative overflow-hidden">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary" />

              <div className="space-y-2 mb-8">
                {lines.slice(0, currentLine).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`text-[10px] md:text-xs leading-relaxed ${i === lines.length - 1 ? "text-primary glow-yellow" : "text-muted-foreground"}`}
                  >
                    <span className="text-secondary mr-2">{">"}</span> {line}
                  </motion.div>
                ))}
                {currentLine < lines.length && (
                  <motion.div
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-2 h-4 bg-primary align-middle ml-1"
                  />
                )}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-[8px] uppercase tracking-widest text-primary/50">
                   <span>BOOT SEQUENCE</span>
                   <span>{Math.round((currentLine / lines.length) * 100)}%</span>
                </div>
                <div className="h-2 w-full border border-primary/20 bg-primary/5">
                  <motion.div 
                    className="h-full bg-primary glow-yellow"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentLine / lines.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Branding Glitch */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={currentLine >= lines.length - 1 ? { opacity: 1 } : {}}
              className="text-center mt-12 font-brand font-black tracking-tight"
            >
              <h2 className="text-2xl tracking-tighter normal-case">
                <span className="text-secondary">yo</span>
                <span className="text-primary glow-yellow">URFest</span>
              </h2>
              <p className="text-[8px] text-muted-foreground mt-2 tracking-[0.4em] uppercase">EXPERIENCE THE RETRO-FUTURE</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
