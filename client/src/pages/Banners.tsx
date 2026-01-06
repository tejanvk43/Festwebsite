import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PixelCard } from "@/components/PixelCard";
import { ChevronLeft, ChevronRight, Image as ImageIcon, Download } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Banners() {
  const [activeTab, setActiveTab] = useState<"btech" | "diploma">("btech");

  const banners = {
    btech: {
      url: "/assets/banners/btech_banner.jpg",
      title: "B.Tech & M.Tech Official Poster",
      description: "Two-Day National Level Techno-Cultural Symposium for B.Tech & M.Tech students."
    },
    diploma: {
      url: "/assets/banners/diploma_banner.jpg",
      title: "Polytechnic Official Poster",
      description: "Two-Day National Level Techno-Cultural Symposium exclusively for Polytechnic students."
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl mb-4 text-primary neon-text tracking-tighter uppercase">EVENT BANNERS</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Download and share the official event posters for yoUR Fest 2026.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Controls */}
        <div className="w-full lg:w-1/3 space-y-6">
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setActiveTab("btech")}
              className={cn(
                "w-full px-6 py-4 font-pixel text-xs border-2 text-left transition-all relative group overflow-hidden",
                activeTab === "btech" 
                  ? "bg-primary text-primary-foreground border-primary glow-yellow" 
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between relative z-10">
                <span>B.TECH / M.TECH</span>
                {activeTab === "btech" && <ChevronRight className="w-4 h-4" />}
              </div>
            </button>

            <button
              onClick={() => setActiveTab("diploma")}
              className={cn(
                "w-full px-6 py-4 font-pixel text-xs border-2 text-left transition-all relative group overflow-hidden",
                activeTab === "diploma" 
                  ? "bg-primary text-primary-foreground border-primary glow-yellow" 
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"
              )}
            >
              <div className="flex items-center justify-between relative z-10">
                <span>POLYTECHNIC (DIPLOMA)</span>
                {activeTab === "diploma" && <ChevronRight className="w-4 h-4" />}
              </div>
            </button>
          </div>

          <PixelCard className="space-y-4">
            <h3 className="text-lg font-bold text-primary mb-2 flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              POSTER DETAILS
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {banners[activeTab].description}
            </p>
            <div className="pt-4 border-t border-border">
              <a 
                href={banners[activeTab].url} 
                download={`yoUR_Fest_2026_${activeTab}_Poster.jpg`}
                className="flex items-center justify-center gap-2 w-full py-3 bg-secondary text-secondary-foreground font-pixel text-[10px] border-2 border-secondary hover:bg-transparent hover:text-secondary transition-all"
              >
                <Download className="w-4 h-4" />
                DOWNLOAD POSTER [HD]
              </a>
            </div>
          </PixelCard>
        </div>

        {/* Display Area */}
        <div className="w-full lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative group cursor-zoom-in"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-background border-2 border-primary/20 p-2 sm:p-4 rounded-none shadow-2xl overflow-hidden">
                <img 
                  src={banners[activeTab].url} 
                  alt={banners[activeTab].title}
                  className="w-full h-auto object-contain border border-white/5"
                />
                
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary/20 shadow-[0_0_15px_rgba(255,241,0,0.5)] animate-scan-line pointer-events-none" />
              </div>
              
              <div className="mt-4 flex justify-between items-center text-[10px] font-pixel text-muted-foreground tracking-widest uppercase">
                <span>SYSTEM STATUS: STABLE</span>
                <span>ASSET ID: {activeTab === 'btech' ? 'PSTR-BT-01' : 'PSTR-DP-01'}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
