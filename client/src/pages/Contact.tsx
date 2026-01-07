import { PixelCard } from "@/components/PixelCard";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-12">
       <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4">GET IN TOUCH</h1>
        <p className="text-muted-foreground">Have questions? We're here to help.</p>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Organizing Committee: Full Width Directory */}
        <PixelCard variant="secondary" hoverEffect={false}>
          <div className="space-y-10">
            {/* Conveners Section - Centered or Top */}
            <section className="border-b border-secondary/20 pb-8">
              <h3 className="font-pixel mb-6 text-secondary uppercase text-sm text-center">Festival Conveners</h3>
              <div className="flex flex-wrap justify-center gap-8">
                <div className="flex flex-col items-center min-w-[200px]">
                  <div className="text-[10px] text-muted-foreground uppercase font-pixel mb-2 opacity-70">Convener</div>
                  <div className="font-bold text-lg">Dr. K. Naresh</div>
                  <div className="text-sm font-mono text-primary mt-1">+91 9949257091</div>
                </div>
                <div className="flex flex-col items-center min-w-[200px]">
                  <div className="text-[10px] text-muted-foreground uppercase font-pixel mb-2 opacity-70">Co-Convener</div>
                  <div className="font-bold text-lg">Dr. S. M. Roy Choudri</div>
                  <div className="text-sm font-mono text-primary mt-1">+91 9849645441</div>
                </div>
                <div className="flex flex-col items-center min-w-[200px]">
                  <div className="text-[10px] text-muted-foreground uppercase font-pixel mb-2 opacity-70">Co-Convener</div>
                  <div className="font-bold text-lg">Dr. K. Babu Rao</div>
                  <div className="text-sm font-mono text-primary mt-1">+91 9100363064</div>
                </div>
              </div>
            </section>

            {/* Organizing Committee (Categorized) */}
            <section>
              <h3 className="font-pixel mb-8 text-secondary uppercase text-sm text-center">Organizing Committee</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {[
                  {
                    dept: "CSE & AI",
                    faculty: [{ name: "Dr. B V Praveen Kumar", phone: "9160923988" }],
                    student: [{ name: "Mr P. Teja Naga Venkata Kishore", phone: "8919998149" }]
                  },
                  {
                    dept: "EEE",
                    faculty: [{ name: "Sri A Balaji", phone: "9492080980" }],
                    student: [{ name: "Mr JSS. Mohan", phone: "6304638545" }]
                  },
                  {
                    dept: "IT",
                    faculty: [{ name: "Sri B Trivikrama Rao", phone: "9703418339" }],
                    student: [{ name: "Mr M. Mahesh Babu", phone: "7815835004" }]
                  },
                  {
                    dept: "ECE",
                    faculty: [
                      { name: "Sri M K Kishore", phone: "9550419419" },
                      { name: "Mrs K Nitya", phone: "9885571089" }
                    ],
                    student: [{ name: "Mr K Sai Vamsi", phone: "6281444857" }]
                  },
                  {
                    dept: "IT",
                    faculty: [{ name: "Sri B Trivikrama Rao", phone: "9703418339" }],
                    student: [{ name: "Mr M. Mahesh Babu", phone: "7815835004" }]
                  },
                  {
                    dept: "Mechanical",
                    faculty: [{ name: "Sri N Ranjith Kumar", phone: "8328177044" }],
                    student: [{ name: "Mr V. Syam Sundar", phone: "7670927864" }]
                  },
                  {
                    dept: "Diploma",
                    faculty: [{ name: "Sri T Srinivasa Rao", phone: "9490703377" }],
                    student: [{ name: "Mr S Eswar Kumar", phone: "9032075103" }]
                  },
                  {
                    dept: "S&H / First Year",
                    faculty: [{ name: "Sri R. Simhachalam", phone: "9492023446" }],
                    student: [{ name: "Mr P Varshith", phone: "6301880546" }]
                  },
                  {
                    dept: "Administration",
                    faculty: [
                      { name: "Sri S Murali (AO)", phone: "9949712255" },
                      { name: "Sri A V Rao (Manager)", phone: "9949312255" },
                      { name: "Sri P Sunil (Purchases)", phone: "9989012255" }
                    ],
                    student: []
                  },
                  {
                    dept: "Registration",
                    faculty: [
                      { name: "Mr M Samba Siva Rao", phone: "9848209419" },
                      { name: "Mr. M. Rajesh", phone: "9963667936" }
                    ],
                    student: []
                  },
                  {
                    dept: "Central Announcement",
                    faculty: [
                      { name: "Mr R Simhachalam", phone: "9059314648" },
                      { name: "Ms. G. Manogna", phone: "8374322527" }
                    ],
                    student: []
                  }
                ].map((group, idx) => (
                  <div key={idx} className="bg-background/50 border-2 border-border/50 p-6 space-y-4 hover:border-primary/50 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    <div className="text-xs font-pixel text-secondary uppercase border-b border-secondary/20 pb-2">{group.dept}</div>
                    
                    <div className="space-y-3">
                      {group.faculty.map((f, i) => (
                        <div key={i}>
                          <div className="text-[10px] text-muted-foreground uppercase font-pixel opacity-70 mb-1">Faculty</div>
                          <div className="flex justify-between items-center gap-2">
                            <div className="font-bold text-sm leading-tight">{f.name}</div>
                            <div className="text-sm font-mono text-primary whitespace-nowrap">{f.phone}</div>
                          </div>
                        </div>
                      ))}

                      {group.student.length > 0 && group.student.map((s, i) => (
                        <div key={i} className="pt-2 border-t border-border/10">
                          <div className="text-[10px] text-muted-foreground uppercase font-pixel opacity-70 mb-1">Student Lead</div>
                          <div className="flex justify-between items-center gap-2">
                            <div className="font-bold text-sm leading-tight">{s.name}</div>
                            <div className="text-sm font-mono text-secondary whitespace-nowrap">{s.phone}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </PixelCard>

        {/* General Contact Info Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
          <PixelCard variant="accent" hoverEffect={false} className="flex items-center gap-4 py-6">
            <Mail className="w-6 h-6 text-accent shrink-0" />
            <div>
              <div className="text-[10px] font-pixel text-muted-foreground uppercase">Email US</div>
              <div className="font-bold">yourfest@usharama.in</div>
            </div>
          </PixelCard>
          <PixelCard variant="accent" hoverEffect={false} className="flex items-center gap-4 py-6">
            <Phone className="w-6 h-6 text-accent shrink-0" />
            <div>
              <div className="text-[10px] font-pixel text-muted-foreground uppercase">Call US</div>
              <div className="font-bold">+91 91003 63064</div>
            </div>
          </PixelCard>
          <PixelCard variant="accent" hoverEffect={false} className="flex items-center gap-4 py-6">
            <MapPin className="w-6 h-6 text-accent shrink-0" />
            <div>
              <div className="text-[10px] font-pixel text-muted-foreground uppercase">Visit US</div>
              <div className="font-bold text-xs uppercase">Usharama College, AP</div>
            </div>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
