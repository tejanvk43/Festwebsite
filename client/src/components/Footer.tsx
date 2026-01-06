import { Link } from "wouter";
import { Twitter, Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="border-t-2 border-border bg-card mt-auto"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="font-brand font-black text-xl text-primary mb-2 flex items-baseline tracking-tight">
              <span>yoUR Fest</span>
              <span className="font-pixel text-secondary text-[8px] ml-1">2026</span>
            </div>
            <div className="text-[9px] font-pixel text-muted-foreground leading-normal mt-4 mb-2">
              USHA RAMA COLLEGE OF ENGINEERING & TECHNOLOGY (AUTONOMOUS)
            </div>
            <p className="text-muted-foreground text-xs max-w-xs">
              A Two-Day National Level Technical and Cultural Symposium organized by Usha Rama College of Engineering and Technology
            </p>
          </div>

          <div>
            <h3 className="font-pixel text-xs text-secondary mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/events" className="hover:text-primary transition-colors">Events</Link></li>
              <li><Link href="/stalls" className="hover:text-primary transition-colors">Stalls</Link></li>
              <li><Link href="/schedule" className="hover:text-primary transition-colors">Schedule</Link></li>
              <li><Link href="/register" className="hover:text-primary transition-colors">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-xs text-secondary mb-4 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-secondary" />
                <span>yourfest@usharama.in</span>
              </li>
              <li className="flex flex-col gap-3 py-2 border-y border-border/20">
                <div>
                  <span className="text-secondary text-[8px] font-pixel block mb-1 uppercase tracking-tighter">CONVENER</span>
                  <p className="text-sm">Dr. K. Naresh: <span className="text-primary">+91 9949257091</span></p>
                </div>
                <div>
                  <span className="text-secondary text-[8px] font-pixel block mb-1 uppercase tracking-tighter">CO-CONVENERS</span>
                  <div className="space-y-1">
                    <p className="text-sm">1) Dr. S. M. Roy Choudri: <span className="text-primary">+91 9849645441</span></p>
                    <p className="text-sm">2) Dr. K. Babu Rao: <span className="text-primary">+91 9100363064</span></p>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-secondary mt-1" />
                <span className="text-xs">Usharama College of Engineering,<br/>Telaprolu, AP</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-pixel text-base text-secondary mb-6 uppercase tracking-wider">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-background border-2 border-border hover:border-primary hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/ur2k26?igsh=Nnl1aXhyaTZrenJh" target="_blank" className="p-2 bg-background border-2 border-border hover:border-secondary hover:text-secondary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-background border-2 border-border hover:border-accent hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-border text-center text-[10px] text-muted-foreground font-pixel uppercase">
          © {new Date().getFullYear()} yoURFest. ALL RIGHTS RESERVED. GAME ON.
        </div>
      </div>
    </motion.footer>
  );
}
