import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/stalls", label: "Stalls" },
  { href: "/schedule", label: "Schedule" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact" },
];

export function Navigation({ onOpenMenu }: { onOpenMenu: () => void }) {
  const [location] = useLocation();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-0 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_20px_rgba(255,241,0,0.2)] z-50"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-4">
          <a href="https://usharama.edu.in" target="_blank" rel="noopener noreferrer" className="flex items-center">
            <img src="/usha-rama-logo.png" alt="Usha Rama College" className="h-8 sm:h-10 w-auto object-contain" />
          </a>
          <div className="h-6 sm:h-8 w-[2px] bg-border hidden sm:block" />
          <Link href="/">
            <div className="font-pixel text-base sm:text-xl md:text-2xl text-primary cursor-pointer hover:animate-neon-pulse transition-all" style={{ textShadow: '0 0 10px rgba(255, 241, 0, 0.5)' }}>
              yoURFest<span className="text-secondary text-[10px] sm:text-xs align-top ml-0.5 sm:ml-1" style={{ textShadow: '0 0 8px rgba(190, 127, 255, 0.4)' }}>2026</span>
            </div>
          </Link>
        </div>

        {/* Unified START button for Desktop & Mobile */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/register">
            <button className="hidden sm:block px-3 sm:px-4 py-2 bg-primary/10 border-2 border-primary text-primary font-pixel text-[10px] hover:bg-primary hover:text-primary-foreground transition-all">
              TICKETS
            </button>
          </Link>
          
          <button
            onClick={onOpenMenu}
            className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 bg-primary text-primary-foreground font-pixel text-[10px] sm:text-xs border-2 border-primary shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)] sm:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px] transition-all glow-yellow"
          >
            <Menu className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">START / MENU</span>
            <span className="xs:hidden">MENU</span>
          </button>
        </div>
      </div>

    </motion.header>
  );
}
