import { motion } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { playRetroSound } from "@/lib/audio";

interface HandheldConsoleProps {
  children: React.ReactNode;
  onUp?: () => void;
  onDown?: () => void;
  onA?: () => void;
  onB?: () => void;
}

export function HandheldConsole({ children, onUp, onDown, onA, onB }: HandheldConsoleProps) {
  const handleUp = () => { playRetroSound("click"); onUp?.(); };
  const handleDown = () => { playRetroSound("click"); onDown?.(); };
  const handleA = () => { playRetroSound("select"); onA?.(); };
  const handleB = () => { playRetroSound("back"); onB?.(); };
  const handleClick = () => { playRetroSound("click"); };

  return (
    <div className="relative w-[480px] md:w-[560px] bg-[#f7b731] p-6 md:p-8 rounded-[2.5rem] shadow-[0_20px_0_#d19214,0_30px_60px_rgba(0,0,0,0.4)] border-4 border-[#d19214] flex flex-col gap-6 md:gap-8 mx-auto scale-95 md:scale-100">
      {/* Power Light */}
      <div className="absolute left-4 top-20 flex flex-col items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-red-600 shadow-[0_0_10px_red]" />
        <span className="text-[6px] font-pixel text-[#d19214]">POWER</span>
      </div>

      {/* Screen Area */}
      <div className="bg-[#2d3436] p-4 rounded-xl border-4 border-[#1e272e] shadow-inner">
        <div className="bg-[#1e272e] aspect-[4/3] rounded-sm overflow-hidden border-2 border-[#2d3436] relative group">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="h-full w-full overflow-y-auto custom-scrollbar p-2 select-none">
            {children}
          </div>
        </div>
        <div className="flex justify-between items-center mt-2 px-1">
          <span className="text-[8px] font-pixel text-muted-foreground/50 tracking-[0.2em]">DOT MATRIX WITH STEREO SOUND</span>
          <div className="flex gap-1">
            {[1, 2, 3].map(i => <div key={i} className="w-[1px] h-2 bg-muted-foreground/20" />)}
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="text-center -mt-4">
        <span className="text-xs font-pixel text-[#d19214] italic tracking-tighter opacity-80">Nintendo</span>
        <span className="text-[10px] font-pixel text-[#d19214] ml-1">GAME BOY</span>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-start px-2 py-4">
        {/* D-Pad */}
        <div className="relative w-32 h-32 flex items-center justify-center">
          <div className="absolute w-28 h-9 bg-[#2d3436] rounded-sm shadow-[0_4px_0_#1e272e]" />
          <div className="absolute h-28 w-9 bg-[#2d3436] rounded-sm shadow-[0_4px_0_#1e272e]" />
          
          <button onClick={handleUp} className="absolute top-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 active:translate-y-0.5"><ChevronUp className="w-5 h-5 text-[#1e272e]" /></button>
          <button onClick={handleDown} className="absolute bottom-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 active:translate-y-0.5"><ChevronDown className="w-5 h-5 text-[#1e272e]" /></button>
          <button onClick={handleClick} className="absolute left-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 active:translate-y-0.5"><ChevronLeft className="w-5 h-5 text-[#1e272e]" /></button>
          <button onClick={handleClick} className="absolute right-0 w-9 h-9 flex items-center justify-center hover:bg-white/10 active:translate-y-0.5"><ChevronRight className="w-5 h-5 text-[#1e272e]" /></button>
          
          <div className="w-5 h-5 bg-[#1e272e] rounded-full z-10 opacity-20" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-4 rotate-[15deg]">
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={handleB}
              className="w-16 h-16 bg-red-700 rounded-full border-b-4 border-red-900 shadow-xl active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center"
            >
              <span className="text-white font-pixel text-2xl">B</span>
            </button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <button 
              onClick={handleA}
              className="w-16 h-16 bg-green-600 rounded-full border-b-4 border-green-800 shadow-xl active:translate-y-1 active:border-b-0 transition-all flex items-center justify-center"
            >
              <span className="text-white font-pixel text-2xl">A</span>
            </button>
          </div>
        </div>
      </div>

      {/* Start/Select */}
      <div className="flex justify-center gap-6 -mt-4">
        <div className="flex flex-col items-center gap-1 -rotate-[25deg]">
          <div className="w-10 h-3 bg-[#636e72] rounded-full border-b-2 border-[#2d3436]" />
          <span className="text-[6px] font-pixel text-[#d19214]">SELECT</span>
        </div>
        <div className="flex flex-col items-center gap-1 -rotate-[25deg]">
          <div className="w-10 h-3 bg-[#636e72] rounded-full border-b-2 border-[#2d3436]" />
          <span className="text-[6px] font-pixel text-[#d19214]">START</span>
        </div>
      </div>

      {/* Speaker Grill */}
      <div className="absolute right-6 bottom-12 rotate-[30deg] flex flex-col gap-1.5 opacity-30">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="w-16 h-1.5 bg-[#d19214] rounded-full" />
        ))}
      </div>
    </div>
  );
}
