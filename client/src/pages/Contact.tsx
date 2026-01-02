import { PixelCard } from "@/components/PixelCard";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
       <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4">GET IN TOUCH</h1>
        <p className="text-muted-foreground">Have questions? We're here to help.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <PixelCard>
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-pixel uppercase text-muted-foreground">Name</label>
              <input 
                type="text" 
                className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="PLAYER ONE"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-pixel uppercase text-muted-foreground">Email</label>
              <input 
                type="email" 
                className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                placeholder="player@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-pixel uppercase text-muted-foreground">Message</label>
              <textarea 
                rows={5}
                className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors resize-none"
                placeholder="Type your message here..."
              />
            </div>

            <button className="w-full py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> SEND MESSAGE
            </button>
          </form>
        </PixelCard>

        <div className="space-y-6">
          <PixelCard variant="secondary" hoverEffect={false}>
            <h3 className="font-pixel mb-4 text-secondary uppercase">Faculty COORDINATORS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-border/30 pb-2">
                <div>
                  <div className="font-bold text-sm">Dr. P. Rajesh</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Convener</div>
                </div>
                <div className="text-xs font-mono">+91 94401 23456</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm">Mr. K. Sai Krishna</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Co-Convener</div>
                </div>
                <div className="text-xs font-mono">+91 98850 67890</div>
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="primary" hoverEffect={false}>
            <h3 className="font-pixel mb-4 text-primary uppercase">Student COORDINATORS</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-start border-b border-border/30 pb-2">
                <div>
                  <div className="font-bold text-sm">T. Teja</div>
                  <div className="text-[10px] text-muted-foreground uppercase">General Secretary</div>
                </div>
                <div className="text-xs font-mono">+91 73861 24708</div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-sm">V. Naveen</div>
                  <div className="text-[10px] text-muted-foreground uppercase">Technical Lead</div>
                </div>
                <div className="text-xs font-mono">+91 90145 62341</div>
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="accent" hoverEffect={false}>
            <h3 className="font-pixel mb-4 text-accent">CONTACT INFO</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>College Email</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>College Phone Number</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span>Usharama College of Engineering,<br/>Telaprolu, AP</span>
              </li>
            </ul>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
