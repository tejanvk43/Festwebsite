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
            <h3 className="font-pixel mb-4 text-secondary">Faculty COORDINATOR</h3>
            <div className="space-y-4">
              <div>
                <div className="font-bold">Faculty-1</div>
                <div className="text-sm text-muted-foreground">Faculty 1 Number</div>
              </div>
              <div>
                <div className="font-bold">Faculty-2</div>
                <div className="text-sm text-muted-foreground">Faculty 2 Number</div>
              </div>
            </div>
          </PixelCard>

          <PixelCard variant="accent" hoverEffect={false}>
            <h3 className="font-pixel mb-4 text-accent">CONTACT INFO</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <span>support@yourfest.org</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <span>0866 - 2555555</span>
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
