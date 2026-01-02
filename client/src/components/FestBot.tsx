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
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: "user", content: userMsg }]);
    setInput("");

    // Simple keyword matching logic
    setTimeout(() => {
      const botResponse = generateResponse(userMsg);
      setMessages(prev => [...prev, { role: "bot", content: botResponse }]);
    }, 600);
  };

  const generateResponse = (msg: string): string => {
    const query = msg.toLowerCase();
    
    if (query.includes("event") || query.includes("what is happening")) {
      return `We have ${events.length} quests active! Categories include CSE, ECE, Mechanical, and Cultural. Check the Events page for details.`;
    }
    
    if (query.includes("time") || query.includes("schedule") || query.includes("when")) {
      return "The festival runs from Jan 23 to Jan 25, 2026. Daily loops start at 09:00 AM.";
    }

    if (query.includes("food") || query.includes("stall") || query.includes("eat")) {
      const foodStalls = stalls.filter(s => s.category === "Food");
      return `Hungry? Visit ${foodStalls.map(s => s.name).join(", ")} at the Stall Arcade!`;
    }

    if (query.includes("where") || query.includes("venue") || query.includes("location")) {
      return "Main Headquarters: Usharama College of Engineering, Telaprolu. Check the Venue map for coordinates.";
    }

    const matchedEvent = events.find(e => query.includes(e.name.toLowerCase()));
    if (matchedEvent) {
      return `${matchedEvent.name}: ${matchedEvent.description} Prize: ${matchedEvent.prize}. Found it in the ${matchedEvent.department} zone.`;
    }

    return "COMMAND NOT RECOGNIZED. I can help with Event Info, Schedule, Food Stalls, or Venue details. Try asking 'Tell me about events'.";
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[320px] h-[450px] bg-black border-4 border-primary rounded-none shadow-[10px_10px_0_0_rgba(255,241,0,0.2)] flex flex-col overflow-hidden"
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
                  <div className="pl-5 leading-relaxed">
                    {m.role === "bot" && "> "}{m.content}
                    {i === messages.length - 1 && m.role === "bot" && (
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                      />
                    )}
                  </div>
                </div>
              ))}
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
                  className="flex-1 bg-black border border-primary/50 p-2 text-primary focus:outline-none focus:border-primary text-xs"
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

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-primary text-primary-foreground rounded-none border-2 border-primary shadow-[4px_4px_0_0_rgba(255,241,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center glow-yellow"
      >
        <MessageSquare className="w-6 h-6" />
      </button>
    </div>
  );
}
