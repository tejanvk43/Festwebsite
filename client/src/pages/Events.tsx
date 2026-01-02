import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { EventCardSkeleton } from "@/components/SkeletonLoader";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import { useState } from "react";

export default function Events() {
  const { data: events, isLoading, error } = useEvents();
  const [mainFilter, setMainFilter] = useState<"all" | "tech" | "cultural">("all");
  const [deptFilter, setDeptFilter] = useState("all");

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl mb-4">EVENTS</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose your challenge. Compete for glory, prizes, and bragging rights.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center text-red-500 font-pixel">
        ERROR LOADING EVENTS. RETRY LATER.
      </div>
    );
  }

  const filteredEvents = events?.filter(e => {
    // Main filter logic
    if (mainFilter === "tech" && e.type !== "tech") return false;
    if (mainFilter === "cultural" && e.type !== "cultural") return false;

    // Dept filter logic (only applies if tech is selected or all is selected)
    if (mainFilter === "tech" || mainFilter === "all") {
       if (deptFilter !== "all" && e.department.toLowerCase() !== deptFilter.toLowerCase()) return false;
    }

    return true;
  });

  const mainFilters = [
    { id: "all", label: "ALL EVENTS" },
    { id: "tech", label: "TECHNICAL" },
    { id: "cultural", label: "CULTURAL" },
  ];

  const deptFilters = [
    { id: "all", label: "ALL DEPTS" },
    { id: "cse/aiml", label: "CSE/AIML" },
    { id: "it", label: "IT" },
    { id: "ece/eee", label: "ECE/EEE" },
    { id: "mech", label: "MECH" },
    { id: "general", label: "GENERAL" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4">EVENTS</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your challenge. Compete for glory, prizes, and bragging rights.
        </p>
      </div>

      {/* Main Categories */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {mainFilters.map((f) => (
          <button
            key={f.id}
            onClick={() => {
              setMainFilter(f.id as any);
              setDeptFilter("all"); // Reset dept filter when changing main category
            }}
            className={`
              px-8 py-4 font-pixel text-xs border-2 transition-all
              ${mainFilter === f.id 
                ? "bg-primary text-primary-foreground border-primary glow-yellow" 
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Department Sub-categories (only show if tech or all is selected) */}
      {(mainFilter === "tech" || mainFilter === "all") && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2 mb-12 py-4 border-y border-border/50"
        >
          <span className="w-full text-center text-[10px] font-pixel text-muted-foreground mb-2">DEPARTMENTS</span>
          {deptFilters.map((f) => (
            <button
              key={f.id}
              onClick={() => setDeptFilter(f.id)}
              className={`
                px-4 py-2 font-pixel text-[10px] border transition-all
                ${deptFilter === f.id 
                  ? "bg-muted text-primary border-primary" 
                  : "bg-background text-muted-foreground border-border hover:border-primary/50"}
              `}
            >
              {f.label}
            </button>
          ))}
        </motion.div>
      )}

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredEvents?.map((event, idx) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Link href={`/events/${event.id}`}>
              <div className="h-full cursor-pointer">
                <PixelCard className="h-full flex flex-col group hover:border-primary overflow-hidden">
                  <div className="relative h-48 mb-4 -mx-4 -mt-4 border-b border-border group-hover:border-primary transition-colors overflow-hidden">
                    <img 
                      src={event.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80"} 
                      alt={event.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <span className="px-2 py-1 bg-primary/90 text-primary-foreground text-[10px] font-pixel border border-primary/20 backdrop-blur-sm">
                        {event.department.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-4">
                     <div className="h-1 w-12 bg-primary/20 group-hover:bg-primary transition-colors" />
                     <span className="text-muted-foreground text-xs font-mono flex items-center gap-1">
                       <Clock className="w-3 h-3" /> {event.startTime}
                     </span>
                  </div>

                  <h3 className="text-xl mb-3 group-hover:text-primary transition-colors">{event.title}</h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                    {event.shortDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                       <Trophy className="w-4 h-4 text-accent" />
                       <span className="text-accent">{event.prize}</span>
                    </div>
                    <div className="flex items-center gap-2 justify-end">
                       <Users className="w-4 h-4" />
                       <span>INDIVIDUAL</span>
                    </div>
                  </div>
                </PixelCard>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {filteredEvents?.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-border text-muted-foreground font-pixel text-sm">
          NO EVENTS FOUND IN THIS CATEGORY.
        </div>
      )}
    </div>
  );
}
