import { motion } from "framer-motion";
import { Gift, Sparkles } from "lucide-react";

export function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "backOut" }}
      className="relative overflow-hidden"
    >
      {/* Main Container with border and glow effect */}
      <div className="relative border-2 border-accent/50 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 backdrop-blur-sm">
        {/* Animated background shimmer */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Content Container */}
        <div className="relative z-10 px-4 py-3 overflow-hidden">
          {/* Scrolling Text */}
          <motion.div
            className="flex items-center gap-8 whitespace-nowrap"
            animate={{
              x: [0, -1000],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Gift className="w-4 h-4 text-accent animate-pulse" />
                <span className="font-pixel text-xs sm:text-sm text-accent uppercase tracking-wide">
                  ⚡ Special Offer: For registration of every 2 events 1 event was free
                </span>
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-accent"></div>
        <div className="absolute top-0 right-0 w-2 h-2 bg-accent"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-accent"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent"></div>
      </div>

      {/* Popout effect - floating badge */}
      <motion.div
        className="absolute -right-2 -top-2 z-20"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 5, 0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="bg-secondary border-2 border-secondary px-2 py-1 shadow-lg relative">
          <span className="font-pixel text-[8px] text-secondary-foreground uppercase">
            Limited Time
          </span>
          {/* Glow effect */}
          <div className="absolute inset-0 bg-secondary blur-md -z-10 opacity-50"></div>
        </div>
      </motion.div>
    </motion.div>
  );
}
