import { useEvents } from "@/hooks/use-events";
import { Link } from "wouter";
import { PixelCard } from "@/components/PixelCard";
import { GlitchText } from "@/components/GlitchText";
import { Calendar, MapPin, Ticket, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: events, isLoading } = useEvents();

  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden border-b-2 border-border">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
           <div className="absolute top-10 left-10 w-32 h-32 bg-primary blur-3xl rounded-full"></div>
           <div className="absolute bottom-10 right-10 w-64 h-64 bg-secondary blur-3xl rounded-full"></div>
        </div>

        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 mb-6 border-2 border-accent text-accent font-pixel text-xs bg-accent/10">
              JAN 23-24, 2026 &middot; USHARAMA COLLEGE
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-9xl mb-6 tracking-tighter"
            >
              <GlitchText text="yoUR Fest 2026" />
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
            >
              The ultimate convergence of technology, culture, and retro-futurism. 
              <span className="text-primary block mt-2 font-medium">Level up your reality.</span>
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/events">
                <button className="px-8 py-4 bg-primary text-primary-foreground font-pixel text-sm border-2 border-primary shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  EXPLORE EVENTS
                </button>
              </Link>
              <Link href="/register">
                <button className="px-8 py-4 bg-transparent text-secondary font-pixel text-sm border-2 border-secondary shadow-[6px_6px_0px_0px_rgba(255,77,230,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  GET TICKETS
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Info Stats */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Calendar, label: "2 DAYS", sub: "Non-stop Action" },
            { icon: MapPin, label: "2 VENUES", sub: "Usharama Campus" },
            { icon: Zap, label: "10+ EVENTS", sub: "Tech & Cultural" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <PixelCard className="flex items-center gap-6" hoverEffect={false}>
              <div className="p-4 bg-background border-2 border-border">
                <item.icon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl mb-1">{item.label}</h3>
                <p className="text-muted-foreground text-sm">{item.sub}</p>
              </div>
              </PixelCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Events */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl mb-4">FEATURED QUESTS</h2>
            <p className="text-muted-foreground">Don't miss out on our headline events.</p>
          </div>
          <Link href="/events" className="hidden md:block text-primary font-pixel text-xs hover:underline">
            VIEW ALL &rarr;
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
              >
                <div className="h-80 bg-card border-2 border-border p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
                  <motion.div
                    className="w-full h-40 bg-muted rounded-none"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-6 bg-muted w-3/4 rounded-none"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div
                    className="h-4 bg-muted w-full rounded-none"
                    animate={{ opacity: [0.5, 0.7, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <Link href={`/events/${event.id}`}>
                  <div className="h-full cursor-pointer group">
                    <PixelCard className="h-full flex flex-col group-hover:border-primary transition-colors">
                    <div className="aspect-video bg-muted mb-6 overflow-hidden border-2 border-border relative">
                      {/* Using generic tech/event placeholders */}
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute top-2 right-2 px-2 py-1 bg-background/80 backdrop-blur border border-border text-[10px] font-pixel text-primary uppercase">
                        {event.type}
                      </div>
                    </div>
                    <h3 className="text-lg mb-2 truncate group-hover:text-primary transition-colors">{event.title}</h3>
                    <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                      {event.shortDescription}
                    </p>
                    <div className="flex justify-between items-center text-xs font-mono border-t border-border pt-4 mt-auto">
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3 h-3" /> {event.date}
                      </span>
                      <span className="text-secondary font-bold">
                        ₹{event.registrationFee}
                      </span>
                    </div>
                  </PixelCard>
                </div>
              </Link>
              </motion.div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center md:hidden">
          <Link href="/events" className="text-primary font-pixel text-xs hover:underline">
            VIEW ALL EVENTS &rarr;
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative border-2 border-primary bg-primary/5 p-8 md:p-16 text-center overflow-hidden"
        >
           <div className="relative z-10">
             <h2 className="text-3xl md:text-5xl mb-6">READY TO PLAY?</h2>
             <p className="text-muted-foreground max-w-xl mx-auto mb-8">
               Registration is open now. Secure your spot in the competitions and workshops before they fill up.
             </p>
             <Link href="/register">
                <button className="px-8 py-4 bg-primary text-primary-foreground font-pixel text-sm border-2 border-primary shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                  REGISTER NOW
                </button>
             </Link>
           </div>
           
           {/* Decorative Grid */}
           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBMMDQwdjBIMHoiIGZpbGw9IiMwMEU1RkYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNhKSIvPjwvc3ZnPg==')] z-0 pointer-events-none" />
        </motion.div>
      </section>
    </div>
  );
}
