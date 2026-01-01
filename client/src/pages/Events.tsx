import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { EventCardSkeleton } from "@/components/SkeletonLoader";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, Trophy, Users } from "lucide-react";
import { useState } from "react";

export default function Events() {
  const { data: events, isLoading, error } = useEvents();
  const [filter, setFilter] = useState<"all" | "tech" | "cultural" | "gaming">("all");

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

  const filteredEvents = filter === "all" 
    ? events 
    : events?.filter(e => e.type.toLowerCase().includes(filter));

  const filters = [
    { id: "all", label: "ALL QUESTS" },
    { id: "tech", label: "TECH" },
    { id: "cultural", label: "CULTURAL" },
    { id: "gaming", label: "GAMING" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4">EVENTS</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose your challenge. Compete for glory, prizes, and bragging rights.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`
              px-6 py-3 font-pixel text-xs border-2 transition-all
              ${filter === f.id 
                ? "bg-primary text-primary-foreground border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]" 
                : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"}
            `}
          >
            {f.label}
          </button>
        ))}
      </div>

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
                <PixelCard className="h-full flex flex-col group hover:border-primary">
                  <div className="flex justify-between items-start mb-4">
                     <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-pixel border border-primary/20">
                       {event.type.toUpperCase()}
                     </span>
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
                       <span>Team: {event.teamSize}</span>
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
