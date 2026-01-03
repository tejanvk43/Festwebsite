import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Terminal, Bot } from "lucide-react";
import { events } from "@/data/events";
import { stalls } from "@/data/stalls";

interface Message {
  role: "user" | "bot";
  content: string;
}

export function FestBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", content: "yoURFest OS v1.0.4. Booting... System ready. How can I assist you, Player One?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");
    setIsTyping(true);

    // Dynamic response generation
    setTimeout(() => {
      const botResponse = generateResponse(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Simulate network/system delay
  };

  const generateResponse = (msg: string): string => {
    const q = msg.toLowerCase();
    
    // Help command
    if (q.includes("help") || q === "hi" || q === "hello") {
      return "ACCESS GRANTED. I can provide intel on: \n1. Active EVENTS & Departments\n2. STALLS & Food\n3. SCHEDULE & Timing\n4. VENUE & Map\n5. College Info\n\nWhat's your query, Player?";
    }

    // College Info
    if (q.includes("college") || q.includes("usha rama")) {
      return "Usha Rama College of Engineering and Technology is our host sector. Location: Telaprolu, near Vijayawada. It is an Autonomous institute focused on technical excellence.";
    }

    // Events Info - General
    if (q.includes("event") || q.includes("quest") || q.includes("what is happening")) {
      const categories = Array.from(new Set(events.map(e => e.department)));
      return `Currently ${events.length} quests detected across departments: ${categories.join(", ")}. Which sector are you interested in?`;
    }

    // Events Info - Specific Event
    const eventMatch = events.find(e => q.includes(e.title.toLowerCase()));
    if (eventMatch) {
      return `INTEL: ${eventMatch.title} | ${eventMatch.type.toUpperCase()} | Date: ${eventMatch.date}. Description: ${eventMatch.shortDescription} Prize: ${eventMatch.prize}.`;
    }

    // Department Specific
    if (q.includes("cse") || q.includes("cs")) return "CSE Sub-sector highlights: Rapid Coders, Tech Talks, and Prompt AI. Full list available in the DATA terminal.";
    if (q.includes("ece")) return "ECE Sub-sector highlights: Circuitrix and Techno Parady. Check the console for more.";
    if (q.includes("mech")) return "MECH Sub-sector: Tech Olympics and Go Karting are the main attractions.";

    // Schedule
    if (q.includes("time") || q.includes("schedule") || q.includes("when")) {
      return "SEQUENCE: \nDay 1 (Jan 23): Technical Quests & Tech Expo.\nDay 2 (Jan 24): Cultural Grand Finale & Awards.\nSystem uptime: 09:40 AM - 04:00 PM.";
    }

    // Stalls & Food
    if (q.includes("food") || q.includes("stall") || q.includes("eat") || q.includes("hungry")) {
      const foodStalls = stalls.filter(s => s.type === "food");
      if (foodStalls.length > 0) {
        return `NUTRITION STATIONS: ${foodStalls.map(s => s.name).join(", ")}. Located at the Main Grounds Pavilion.`;
      }
      return "Standard nutrition protocols apply. Visit the Stall Arcade for energy modules.";
    }

    // Registration
    if (q.includes("register") || q.includes("join") || q.includes("ticket")) {
      return "REGISTRATION PROTOCOL: Click the 'GET TICKETS' or 'REGISTER' buttons on the dashboard to uplink your profile.";
    }

    // Contact / Team
    if (q.includes("contact") || q.includes("convener") || q.includes("help") || q.includes("team")) {
      return "CORE LIAISONS: \nConvener: Dr. K. Naresh (+91 9949257091)\nCo-Convener 1: Dr. S. M. Roy Choudri (+91 9849645441)\nCo-Convener 2: Dr. K. Babu Rao (+91 9100363064)\nDirect uplink: his-support@usharama.in";
    }

    // Venue
    if (q.includes("where") || q.includes("venue") || q.includes("location") || q.includes("map")) {
      return "COORDINATES: Usha Rama College, Telaprolu. Major zones: Block A (IT/CSE), Block C (MECH), Main Stage (Cultural). For specific room info, check the digital kiosks on site.";
    }

    return "ERROR 404: Command logic not found. I am programmed with knowledge of yoURFest 2026. Try asking about 'Events', 'Food', or 'Schedule'.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[10000]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] h-[450px] bg-background border-4 border-primary rounded-none shadow-[10px_10px_0_0_rgba(255,241,0,0.2)] flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Terminal Header */}
            <div className="bg-primary p-2 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary-foreground" />
                <span className="text-[10px] font-pixel text-primary-foreground uppercase tracking-widest">FEST-BOT_v1.0</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-black/20 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 font-mono text-sm overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20"
            >
              {messages.map((m, i) => (
                <div key={i} className={`mb-4 ${m.role === "bot" ? "text-primary" : "text-white"}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {m.role === "bot" ? <Bot className="w-3 h-3" /> : <div className="w-3 h-3 border border-white" />}
                    <span className="text-[8px] font-pixel uppercase">{m.role === "bot" ? "SYSTEM" : "USER"}</span>
                  </div>
                  <div className="pl-5 leading-relaxed whitespace-pre-line">
                    {m.role === "bot" && "> "}{m.content}
                    {i === messages.length - 1 && m.role === "bot" && !isTyping && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                      />
                    )}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="text-primary flex items-center gap-2">
                  <Bot className="w-3 h-3 animate-pulse" />
                  <span className="text-[10px] font-pixel animate-pulse">PROCESSING...</span>
                </div>
              )}
            </div>

            {/* Input Footer */}
            <div className="p-4 border-t border-primary/20">
              <div className="flex gap-2">
                <input 
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Enter command..."
                  className="flex-1 bg-background border border-primary/50 p-2 text-primary focus:outline-none focus:border-primary text-xs"
                />
                <button 
                  onClick={handleSend}
                  className="bg-primary text-primary-foreground p-2 hover:bg-primary/80 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (Right Side) */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 sm:w-16 sm:h-16 bg-primary text-primary-foreground rounded-none border-2 border-primary shadow-[4px_4px_0px_0px_white,0_0_20px_rgba(255,241,0,0.5)] hover:shadow-[6px_6px_0px_0px_white,0_0_30px_rgba(255,241,0,0.8)] transition-all flex flex-col items-center justify-center group"
        >
          <Bot className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="text-[8px] font-pixel mt-1 transition-opacity uppercase tracking-widest text-primary-foreground group-hover:text-white">FEST BOT</span>
        </motion.button>
      )}
    </div>
  );
}
