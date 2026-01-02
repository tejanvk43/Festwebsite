import { useEvent } from "@/hooks/use-events";
import { Link, useRoute } from "wouter";
import { PixelCard } from "@/components/PixelCard";
import { Calendar, Clock, MapPin, Trophy, Users, AlertCircle, ArrowLeft } from "lucide-react";

export default function EventDetail() {
  const [, params] = useRoute("/events/:id");
  const { data: event, isLoading } = useEvent(params?.id || "");

  if (isLoading) return <div className="min-h-screen pt-20 text-center font-pixel animate-pulse text-primary">LOADING...</div>;
  if (!event) return <div className="min-h-screen pt-20 text-center font-pixel text-red-500">EVENT NOT FOUND</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-pixel text-xs transition-colors">
        <ArrowLeft className="w-4 h-4" /> BACK TO EVENTS
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="relative h-[300px] md:h-[400px] w-full border-2 border-primary/20 overflow-hidden group">
            <img 
              src={event.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80"} 
              alt={event.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-6">
               <div className="inline-block px-3 py-1 mb-4 border border-primary bg-primary/20 backdrop-blur-md text-primary-foreground text-xs font-pixel uppercase shadow-[4px_4px_0px_0px_rgba(255,241,0,0.5)]">
                 {event.department} &middot; {event.type}
               </div>
               <h1 className="text-4xl md:text-6xl text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] leading-tight">{event.title}</h1>
            </div>
          </div>

          <div>
             <p className="text-lg text-muted-foreground leading-relaxed">
               {event.fullDescription}
             </p>
          </div>

          <PixelCard variant="default" hoverEffect={false}>
             <h3 className="text-xl mb-4 text-primary">RULES & REGULATIONS</h3>
             <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-5">
               {event.rules?.map((rule, i) => (
                 <li key={i}>{rule}</li>
               ))}
             </ul>
          </PixelCard>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <PixelCard variant="primary" hoverEffect={false} className="sticky top-24">
             <div className="space-y-6">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 border-2 border-primary flex items-center justify-center bg-primary/10">
                   <Calendar className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <div className="text-xs text-muted-foreground font-pixel uppercase">Date</div>
                   <div className="font-medium">{event.date}</div>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 border-2 border-primary flex items-center justify-center bg-primary/10">
                   <Clock className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <div className="text-xs text-muted-foreground font-pixel uppercase">Time</div>
                   <div className="font-medium">{event.startTime} - {event.endTime}</div>
                 </div>
               </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 border-2 border-primary flex items-center justify-center bg-primary/10">
                   <MapPin className="w-5 h-5 text-primary" />
                 </div>
                 <div>
                   <div className="text-xs text-muted-foreground font-pixel uppercase">Venue</div>
                   <div className="font-medium">{event.venueArea}</div>
                 </div>
               </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 border-2 border-primary flex items-center justify-center bg-primary/10">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground font-pixel uppercase">Participation</div>
                    <div className="font-medium">Individual</div>
                  </div>
                </div>

               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 border-2 border-accent flex items-center justify-center bg-accent/10">
                   <Trophy className="w-5 h-5 text-accent" />
                 </div>
                 <div>
                   <div className="text-xs text-muted-foreground font-pixel uppercase">Prize Pool</div>
                   <div className="font-medium text-accent">{event.prize}</div>
                 </div>
               </div>

               <div className="border-t-2 border-border my-6"></div>

                <div className="text-center">
                  <div className="text-2xl font-bold mb-4">₹{event.registrationFee} <span className="text-xs font-normal text-muted-foreground">/ person</span></div>
                 <Link href="/register">
                   <button className="w-full py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                     REGISTER NOW
                   </button>
                 </Link>
                 <p className="text-xs text-muted-foreground mt-4 flex items-center justify-center gap-1">
                   <AlertCircle className="w-3 h-3" /> Limited slots available
                 </p>
               </div>
             </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
