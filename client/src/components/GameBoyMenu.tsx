import React, { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { HandheldConsole } from "./HandheldConsole";
import { Home, Calendar, ShoppingBag, MapPin, Mail, ChevronRight, Image as ImageIcon, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { playRetroSound } from "@/lib/audio";

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/events", label: "EVENTS", icon: Calendar },
  { href: "/stalls", label: "STALLS", icon: ShoppingBag },
  { href: "/schedule", label: "SCHEDULE", icon: Clock },
  { href: "/venue", label: "VENUE", icon: MapPin },
  { href: "/banners", label: "BANNERS", icon: ImageIcon },
  { href: "/contact", label: "CONTACT", icon: Mail },
];

interface GameBoyMenuProps {
  onClose: () => void;
}

export function GameBoyMenu({ onClose }: GameBoyMenuProps) {
  const [location, setLocation] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Sync selected index with current location on open
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.href === location);
    if (currentIndex !== -1) setSelectedIndex(currentIndex);
  }, [location]);

  // Lock body scroll when menu is open
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handleUp = () => {
    setSelectedIndex(prev => {
      const newIndex = prev > 0 ? prev - 1 : navItems.length - 1;
      scrollToItem(newIndex);
      return newIndex;
    });
  };

  const handleDown = () => {
    setSelectedIndex(prev => {
      const newIndex = prev < navItems.length - 1 ? prev + 1 : 0;
      scrollToItem(newIndex);
      return newIndex;
    });
  };

  const scrollToItem = (index: number) => {
    if (menuRef.current) {
      const items = menuRef.current.querySelectorAll('[data-menu-item]');
      const item = items[index] as HTMLElement;
      if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  const handleSelect = () => {
    const target = navItems[selectedIndex].href;
    setLocation(target);
    onClose();
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") { playRetroSound("click"); handleUp(); }
      if (e.key === "ArrowDown") { playRetroSound("click"); handleDown(); }
      if (e.key === "Enter" || e.key === " ") { playRetroSound("select"); handleSelect(); }
      if (e.key === "Escape") { playRetroSound("back"); onClose(); }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <div className="fixed inset-0 z-[50000] bg-black/90 flex items-center justify-center p-4 select-none" style={{ touchAction: 'none' }}>
      <motion.div
        initial={{ y: 50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <HandheldConsole 
          onUp={handleUp} 
          onDown={handleDown} 
          onA={handleSelect} 
          onB={onClose}
        >
          <div className="flex flex-col h-full font-pixel">
            <div className="flex items-center justify-between border-b border-white/30 pb-2 mb-2">
              <span className="text-sm text-white">yoUR Fest 2026</span>
              <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 bg-white/30" />
                 <div className="w-1.5 h-1.5 bg-white/30" />
              </div>
            </div>

            <div ref={menuRef} className="space-y-0.5 flex-1 overflow-y-auto scrollbar-hide">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = index === selectedIndex;
                
                return (
                  <div 
                    key={item.href}
                    data-menu-item
                    className={cn(
                      "flex items-center gap-2 p-2 transition-all duration-150 pointer-events-none",
                      isSelected ? "bg-primary text-black translate-x-1" : "text-white/80"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isSelected ? "animate-pulse" : "opacity-50")} />
                    <span className="text-sm tracking-wider">{item.label}</span>
                    {isSelected && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </div>
                );
              })}
            </div>

            {/* Instructions - Always visible at bottom */}
            <div className="mt-2 pt-2 border-t border-white/20">
              <div className="text-[10px] text-white/70 leading-relaxed uppercase space-y-0.5">
                DPAD: NAVIGATE<br/>
                (A) BUTTON: SELECT/ENTER<br/>
                (B) BUTTON: CLOSE/BACK
              </div>
            </div>
          </div>
        </HandheldConsole>
      </motion.div>
    </div>
  );
}
