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
      {/* Main Container */}
      <div className="relative bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10">
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
        <div className="relative z-10 overflow-hidden">
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

      </div>


    </motion.div>
  );
}
