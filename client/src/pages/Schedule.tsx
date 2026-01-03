import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { motion } from "framer-motion";

export default function Schedule() {
  const { data: events, isLoading } = useEvents();

  if (isLoading) return <div className="min-h-screen pt-20 text-center font-pixel animate-pulse text-accent">LOADING TIMELINE...</div>;

  // Group events by date
  const groupedEvents = events?.reduce((acc, event) => {
    if (!acc[event.date]) acc[event.date] = [];
    acc[event.date].push(event);
    return acc;
  }, {} as Record<string, typeof events>);

  // Sort dates
  const sortedDates = Object.keys(groupedEvents || {}).sort();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4 text-accent">TIMELINE</h1>
        <p className="text-muted-foreground">Don't miss a beat. Plan your festival experience.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {sortedDates.map((date) => (
          <div key={date} className="relative">
             {/* Date Header */}
             <div className="sticky top-20 z-20 mb-8 bg-background/95 backdrop-blur py-4 border-b-2 border-accent/50">
               <h2 className="text-2xl font-pixel text-accent">{date}</h2>
             </div>

             <div className="space-y-4 pl-4 md:pl-0">
               {groupedEvents?.[date]
                 .sort((a, b) => a.startTime.localeCompare(b.startTime))
                 .map((event, idx) => (
                   <motion.div
                     key={event.id}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: idx * 0.1 }}
                   >
                     <div className="flex flex-col md:flex-row gap-4 md:gap-8 group">
                       <div className="w-full md:w-32 text-left md:text-right pt-2 shrink-0">
                         <div className="font-mono text-lg text-primary">{event.startTime}</div>
                         <div className="text-xs text-muted-foreground">{event.endTime}</div>
                       </div>
                       
                       <div className="relative w-full">
                         {/* Timeline Line */}
                         <div className="absolute left-[-17px] top-3 w-3 h-3 bg-background border-2 border-accent rounded-full hidden md:block group-hover:bg-accent transition-colors z-10" />
                         <div className="absolute left-[-12px] top-6 bottom-[-32px] w-[2px] bg-border hidden md:block" />

                         <PixelCard className="w-full flex items-center justify-between p-4 group-hover:border-accent transition-colors" hoverEffect={false}>
                           <div>
                             <h3 className="font-bold text-lg mb-1">{event.title}</h3>
                           </div>
                           <div className="px-3 py-1 bg-muted/20 text-[10px] font-pixel border border-muted/30">
                             {event.type}
                           </div>
                         </PixelCard>
                       </div>
                     </div>
                   </motion.div>
                 ))}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
