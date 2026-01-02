import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { HandheldConsole } from "./HandheldConsole";
import { Home, Calendar, ShoppingBag, MapPin, Mail, ChevronRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { playRetroSound } from "@/lib/audio";

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/events", label: "EVENTS", icon: Calendar },
  { href: "/stalls", label: "STALLS", icon: ShoppingBag },
  { href: "/venue", label: "VENUE", icon: MapPin },
  { href: "/contact", label: "CONTACT", icon: Mail },
];

interface GameBoyMenuProps {
  onClose: () => void;
}

export function GameBoyMenu({ onClose }: GameBoyMenuProps) {
  const [location, setLocation] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Sync selected index with current location on open
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.href === location);
    if (currentIndex !== -1) setSelectedIndex(currentIndex);
  }, [location]);

  const handleUp = () => {
    setSelectedIndex(prev => (prev > 0 ? prev - 1 : navItems.length - 1));
  };

  const handleDown = () => {
    setSelectedIndex(prev => (prev < navItems.length - 1 ? prev + 1 : 0));
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
    <div className="fixed inset-0 z-[50000] bg-black/90 flex items-start justify-center p-4 pt-4 md:pt-8 overflow-y-auto overflow-x-hidden">
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
          <div className="space-y-1">
            <div className="flex items-center justify-between border-b border-primary/20 pb-2 mb-2">
              <span className="text-[10px] font-pixel text-primary">yoUR Fest 2026</span>
              <div className="flex gap-2">
                 <div className="w-1.5 h-1.5 bg-primary/20" />
                 <div className="w-1.5 h-1.5 bg-primary/20" />
              </div>
            </div>

            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              
              return (
                <div 
                  key={item.href}
                  className={cn(
                    "flex items-center gap-2 p-2 transition-all duration-150 pointer-events-none",
                    isSelected ? "bg-primary text-primary-foreground translate-x-1" : "text-primary/60"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isSelected ? "animate-pulse" : "opacity-50")} />
                  <span className="text-xs font-pixel tracking-wider">{item.label}</span>
                  {isSelected && <ChevronRight className="w-4 h-4 ml-auto" />}
                </div>
              );
            })}

            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="text-[8px] font-pixel text-primary/40 leading-relaxed uppercase">
                Select your mission.<br/>
                Press (A) to enter.
              </div>
            </div>
          </div>
        </HandheldConsole>
      </motion.div>
    </div>
  );
}
