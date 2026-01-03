import React, { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { HandheldConsole } from "./HandheldConsole";
import { Home, Calendar, ShoppingBag, MapPin, Mail, ChevronRight, User, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { playRetroSound } from "@/lib/audio";

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/events", label: "EVENTS", icon: Calendar },
  { href: "/stalls", label: "STALLS", icon: ShoppingBag },
  { href: "/schedule", label: "SCHEDULE", icon: Clock },
  { href: "/venue", label: "VENUE", icon: MapPin },
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
    <div className="fixed inset-0 z-[50000] bg-black/90 flex items-center justify-center p-4" style={{ touchAction: 'none' }}>
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
          <div ref={menuRef} className="space-y-1 max-h-[200px] overflow-y-auto scrollbar-hide">
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
                  data-menu-item
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedIndex(index);
                    handleSelect();
                  }}
                  className={cn(
                    "flex items-center gap-2 p-2 transition-all duration-150 cursor-pointer",
                    isSelected ? "bg-primary text-primary-foreground translate-x-1" : "text-primary/60 hover:text-primary hover:bg-primary/5"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isSelected ? "animate-pulse" : "opacity-50")} />
                  <span className="text-xs font-pixel tracking-wider">{item.label}</span>
                  {isSelected && <ChevronRight className="w-4 h-4 ml-auto" />}
                </div>
              );
            })}

            <div className="mt-4 pt-4 border-t border-primary/20">
              <div className="text-[8px] font-pixel text-primary/40 leading-relaxed uppercase space-y-1">
                DPAD: NAVIGATE<br/>
                (A) BUTTON: SELECT/ENTER<br/>
                (B) BUTTON: GO BACK/CLOSE
              </div>
            </div>
          </div>
        </HandheldConsole>
      </motion.div>
    </div>
  );
}
