import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/stalls", label: "Stalls" },
  { href: "/schedule", label: "Schedule" },
  { href: "/venue", label: "Venue" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-[0_0_20px_rgba(255,241,0,0.2)]">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="font-pixel text-xl md:text-2xl text-primary cursor-pointer hover:animate-neon-pulse transition-all" style={{ textShadow: '0 0 10px rgba(255, 241, 0, 0.5)' }}>
            yoURFest<span className="text-secondary text-xs align-top ml-1" style={{ textShadow: '0 0 8px rgba(190, 127, 255, 0.4)' }}>2026</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "font-pixel text-xs cursor-pointer transition-all hover:text-primary hover:glow-yellow relative py-1 px-2",
                  location === item.href ? "text-primary glow-yellow" : "text-muted-foreground"
                )}
              >
                {item.label}
                {location === item.href && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-[3px] bg-primary"
                    style={{ boxShadow: '0 0 8px rgba(255, 241, 0, 0.6)' }}
                  />
                )}
              </div>
            </Link>
          ))}
          <Link href="/register">
            <div className="cursor-pointer bg-primary text-primary-foreground font-pixel text-xs px-4 py-2 border-2 border-primary hover:bg-transparent hover:text-primary transition-all active:translate-x-[2px] active:translate-y-[2px] glow-yellow" style={{ boxShadow: '4px 4px 0px 0px rgba(255,241,0,0.3), 0 0 15px rgba(255,241,0,0.4)' }}>
              REGISTER
            </div>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-primary"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b-2 border-border bg-background"
          >
            <nav className="flex flex-col p-4 gap-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "font-pixel text-sm cursor-pointer py-2 hover:text-primary border-l-4 pl-3 transition-all",
                      location === item.href
                        ? "border-primary text-primary"
                        : "border-transparent text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </div>
                </Link>
              ))}
              <Link href="/register">
                <div 
                  onClick={() => setIsOpen(false)}
                  className="mt-2 text-center cursor-pointer bg-primary text-primary-foreground font-pixel text-xs px-4 py-3 border-2 border-primary hover:bg-transparent hover:text-primary"
                >
                  REGISTER NOW
                </div>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
