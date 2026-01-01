import { Link } from "wouter";
import { Twitter, Instagram, Facebook, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-card mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-pixel text-xl text-primary">
              yoURFest<span className="text-secondary text-[10px] ml-1">2026</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              The ultimate retro-futuristic tech and cultural festival. Level up your skills, compete, and celebrate.
            </p>
          </div>

          <div>
            <h3 className="text-sm mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/stalls" className="hover:text-primary transition-colors">Stalls</Link></li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>info@yourfest.org</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span>Usharama College,<br/>Main Grounds</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background border-2 border-border hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background border-2 border-border hover:border-secondary hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background border-2 border-border hover:border-accent hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-border text-center text-xs text-muted-foreground font-pixel">
          © 2026 yoURFest. ALL RIGHTS RESERVED. GAME ON.
        </div>
      </div>
    </footer>
  );
}
