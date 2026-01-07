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
      <div className="flex flex-col lg:flex-row">
        {/* Left Section: Information */}
        <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="font-brand font-black text-2xl text-primary mb-2 flex items-baseline tracking-tight">
                <span>yoUR Fest</span>
                <span className="font-pixel text-secondary text-[10px] ml-1">2026</span>
              </div>
              <div className="text-[10px] font-pixel text-muted-foreground leading-relaxed uppercase">
                USHA RAMA COLLEGE OF ENGINEERING & TECHNOLOGY (AUTONOMOUS)
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A Two-Day National Level Technical and Cultural Symposium organized by Usha Rama College of Engineering and Technology.
              </p>
              <div className="pt-4">
                <h3 className="font-pixel text-xs text-secondary mb-4 uppercase tracking-wider">Follow Us</h3>
                <div className="flex gap-3">
                  <a href="#" className="p-2 bg-background border-2 border-border hover:border-primary hover:text-primary transition-all">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/ur2k26?igsh=Nnl1aXhyaTZrenJh" target="_blank" className="p-2 bg-background border-2 border-border hover:border-secondary hover:text-secondary transition-all">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2 bg-background border-2 border-border hover:border-accent hover:text-accent transition-all">
                    <Facebook className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-pixel text-xs text-secondary mb-6 uppercase tracking-wider border-b border-border pb-2 inline-block">Quick Links</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><Link href="/events" className="hover:text-primary transition-colors flex items-center gap-2"><span>&gt;</span> Events</Link></li>
                <li><Link href="/stalls" className="hover:text-primary transition-colors flex items-center gap-2"><span>&gt;</span> Stalls</Link></li>
                <li><Link href="/schedule" className="hover:text-primary transition-colors flex items-center gap-2"><span>&gt;</span> Schedule</Link></li>
                <li><Link href="/register" className="hover:text-primary transition-colors flex items-center gap-2"><span>&gt;</span> Register</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-pixel text-xs text-secondary mb-6 uppercase tracking-wider border-b border-border pb-2 inline-block">Contact</h3>
              <ul className="space-y-6 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-secondary" />
                  <span className="truncate">yourfest@usharama.in</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-secondary mt-1 shrink-0" />
                  <span className="leading-relaxed">Usharama College Engineering,<br/>Telaprolu, Andhra Pradesh 521109</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right Section: Map */}
        <div className="w-full lg:w-2/5 min-h-[450px] lg:min-h-0 relative border-l-2 border-border">
          <div className="absolute top-8 left-8 z-10">
            <h3 className="font-pixel text-[10px] text-secondary uppercase tracking-widest bg-background/90 backdrop-blur-sm px-4 py-2 border border-primary/20">EVENT LOCATION</h3>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3823.977009621967!2d80.87176717491565!3d16.57766488417794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a360918fa2d9453%3A0xe7dbf6c842d3a281!2sUsha%20Rama%20College%20Of%20Engineering%20And%20Technology!5e0!3m2!1sen!2sin!4v1767339803834!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Venue Map Full Footer"
            className="opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
          ></iframe>
          <div className="absolute inset-0 pointer-events-none border-t-2 border-border/10"></div>
          <div className="absolute bottom-8 right-8 bg-background px-6 py-2 border-2 border-primary text-xs font-pixel shadow-[4px_4px_0px_0px_rgba(255,241,0,0.2)] hover:shadow-none translate-x-[-2px] translate-y-[-2px] transition-all cursor-pointer">
            VIEW ON GOOGLE MAPS
          </div>
        </div>
      </div>
      
      <div className="py-8 border-t-2 border-border text-center text-[10px] text-muted-foreground font-pixel uppercase bg-card">
        © {new Date().getFullYear()} yoURFest. ALL RIGHTS RESERVED. DESIGNED FOR THE FUTURE.
      </div>
    </motion.footer>
  );
}
