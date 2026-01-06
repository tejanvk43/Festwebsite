import { motion } from "framer-motion";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <div className={`relative inline-block group normal-case font-brand font-black tracking-tight ${className}`}>
      <span className="relative z-10" style={{ textShadow: '0 0 10px rgba(255,241,0,0.5)' }}>{text}</span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-60 group-hover:animate-pulse group-hover:translate-x-[2px]" style={{ textShadow: '0 0 15px rgba(190,127,255,0.6)' }}>
        {text}
      </span>
      <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent opacity-0 group-hover:opacity-60 group-hover:animate-pulse group-hover:-translate-x-[2px]" style={{ textShadow: '0 0 15px rgba(0,229,255,0.6)' }}>
        {text}
      </span>
    </div>
  );
}
