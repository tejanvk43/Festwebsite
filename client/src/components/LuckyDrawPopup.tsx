import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Gift, Sparkles } from "lucide-react";

export function LuckyDrawPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show popup after a delay, once the component is mounted (after loading screen)
    const timer = setTimeout(() => {
      const hasShown = sessionStorage.getItem("hasShownLuckyDraw_v1");
      if (!hasShown) {
        setIsOpen(true);
        sessionStorage.setItem("hasShownLuckyDraw_v1", "true");
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => setIsOpen(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePopup}
            className="absolute inset-0 bg-background/80 backdrop-blur-md pointer-events-auto"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50, rotateX: 20 }}
            transition={{ type: "spring", damping: 15, stiffness: 100 }}
            className="relative w-full max-w-lg bg-card border-4 border-primary p-1 shadow-[0_0_50px_rgba(255,241,0,0.4)] pointer-events-auto"
          >
            {/* Industrial/Retro Border Accents */}
            <div className="absolute -top-3 -left-3 w-8 h-8 border-t-4 border-l-4 border-secondary z-10" />
            <div className="absolute -top-3 -right-3 w-8 h-8 border-t-4 border-r-4 border-secondary z-10" />
            <div className="absolute -bottom-3 -left-3 w-8 h-8 border-b-4 border-l-4 border-secondary z-10" />
            <div className="absolute -bottom-3 -right-3 w-8 h-8 border-b-4 border-r-4 border-secondary z-10" />

            <div className="bg-background/40 backdrop-blur-sm p-6 sm:p-10 border-2 border-primary/20 relative overflow-hidden">
              {/* Decorative Background Grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,241,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,241,0,0.05)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={closePopup}
                className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-primary transition-colors z-20"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative z-10 text-center space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="font-pixel text-[10px] sm:text-xs text-secondary tracking-widest uppercase"
                >
                  Each Registration is Eligible For
                </motion.div>

                {/* MEGA LUCKY DRAW SECTION */}
                <div className="relative py-8">
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0.6, 0.3],
                          rotate: i * 60 
                        }}
                        transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                        className="absolute"
                        style={{ transform: `rotate(${i * 60}deg) translateY(-80px)` }}
                      >
                        <Star className="w-5 h-5 text-secondary fill-secondary" />
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="relative inline-block"
                  >
                    <div className="px-6 py-4 border-4 border-primary bg-primary/10 shadow-[0_0_20px_rgba(255,241,0,0.3)]">
                       <span className="block font-pixel text-xs text-secondary mb-2 tracking-tighter italic">MEGA</span>
                       <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-primary neon-text leading-none">
                         LUCKY<br/>DRAW
                       </h2>
                    </div>
                  </motion.div>
                </div>

                {/* Special Offer Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                  className="bg-secondary/10 border-2 border-secondary/50 p-4 sm:p-6 space-y-3 relative overflow-hidden"
                >
                   {/* Glittering sparkles overlay */}
                   <div className="absolute inset-0 opacity-20">
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{ 
                            opacity: [0, 1, 0],
                            scale: [0.5, 1, 0.5]
                          }}
                          transition={{ 
                            duration: 2 + Math.random(), 
                            repeat: Infinity, 
                            delay: Math.random() * 2 
                          }}
                          className="absolute"
                          style={{ 
                            top: `${Math.random() * 100}%`, 
                            left: `${Math.random() * 100}%` 
                          }}
                        >
                          <Sparkles className="w-3 h-3 text-secondary" />
                        </motion.div>
                      ))}
                   </div>

                   <div className="relative z-10 font-pixel text-[10px] sm:text-xs text-secondary-foreground space-y-2">
                     <p>REGISTER FOR</p>
                     <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl sm:text-3xl text-primary font-black">2 EVENTS</span>
                     </div>
                     <p>GET</p>
                     <div className="flex items-center justify-center gap-2">
                        <span className="text-2xl sm:text-3xl text-secondary font-black">1 EVENT FREE</span>
                     </div>
                   </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                  className="pt-4"
                >
                   <button 
                    onClick={closePopup}
                    className="px-8 py-3 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
                   >
                     GOT IT!
                   </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
