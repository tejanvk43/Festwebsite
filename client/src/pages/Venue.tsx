import { PixelCard } from "@/components/PixelCard";
import { MapPin } from "lucide-react";

export default function Venue() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4 text-primary">THE ARENA</h1>
        <p className="text-muted-foreground">Usharama College of Engineering & Technology</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8">
           <div className="prose prose-invert max-w-none">
             <h3 className="text-2xl font-pixel mb-4 text-secondary">Main Grounds</h3>
             <p className="text-muted-foreground">
               The heartbeat of yoURFest. This sprawling open area hosts the main stage, food stalls, 
               and open-air exhibitions. Prepare for high-energy performances and the bustling marketplace.
             </p>

             <h3 className="text-2xl font-pixel mb-4 mt-8 text-accent">Tech Halls (Block A)</h3>
             <p className="text-muted-foreground">
               Where the coding magic happens. Equipped with high-speed internet and power stations, 
               these halls will host the 24-hour Hackathon, Code Clash, and Robo Rush.
             </p>

             <h3 className="text-2xl font-pixel mb-4 mt-8 text-primary">Auditorium</h3>
             <p className="text-muted-foreground">
               The stage for the grand finale, cultural performances, and prize distribution. 
               Experience state-of-the-art sound and lighting systems.
             </p>
           </div>
           
           <div className="flex gap-4">
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
               <MapPin className="text-primary w-5 h-5" />
               <span>Telaprolu, Andhra Pradesh 521109</span>
             </div>
           </div>
        </div>

        <div className="h-[500px] border-2 border-border bg-card relative overflow-hidden group">
          {/* Placeholder for Map - typically you'd embed Google Maps iframe here */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3826.664632662283!2d80.93273831486337!3d16.44186598865173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a36056d6706037b%3A0x867332305886476!2sUsha%20Rama%20College%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sin!4v1678892134567!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Map"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          ></iframe>
          
          <div className="absolute inset-0 pointer-events-none border-4 border-primary/20 m-4"></div>
          <div className="absolute bottom-8 right-8 bg-background px-4 py-2 border-2 border-primary text-xs font-pixel">
            LOCATE US
          </div>
        </div>
      </div>
    </div>
  );
}
