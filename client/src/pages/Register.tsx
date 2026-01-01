import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/routes";
import { useCreateRegistration } from "@/hooks/use-registrations";
import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { Loader2, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const branches = [
  "CSE/AIML",
  "IT",
  "ECE/EEE",
  "MECH",
  "General"
];

const STEPS = ["Personal", "Category", "Branch", "Selection", "Review"];

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { mutate, isPending } = useCreateRegistration();
  const [step, setStep] = useState(1);

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      eventIds: [],
      teamName: "",
      college: "Usharama College",
      participantName: "",
      email: "",
      phone: "",
      rollNumber: "",
      branch: [],
      regType: "tech"
    }
  });

  const regType = form.watch("regType");
  const selectedBranches = form.watch("branch") as string[];
  const selectedEventIds = (form.watch("eventIds") || []) as string[];
  const [searchQuery, setSearchQuery] = useState("");

  const selectedEvents = events?.filter(e => selectedEventIds.includes(e.id)) || [];

  const onSubmit = (data: InsertRegistration) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Success",
          description: "Registration completed successfully!",
        });
        setStep(1); // Reset to first step
      }
    });
  };

  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ["participantName", "rollNumber", "email", "phone", "college"];
    } else if (step === 2) {
      fieldsToValidate = ["regType"];
    } else if (step === 3) {
      if (regType === "cultural") {
        setStep(4);
        return;
      }
      if (selectedBranches.length === 0) {
        toast({
          title: "Branch Required",
          description: "Please select at least one branch.",
          variant: "destructive"
        });
        return;
      }
      setStep(prev => prev + 1);
      return;
    } else if (step === 4) {
      if (selectedEventIds.length === 0) {
        toast({
          title: "Selection Required",
          description: "Please select at least one event.",
          variant: "destructive"
        });
        return;
      }
      setStep(prev => prev + 1);
      return;
    }

    const isValid = await form.trigger(fieldsToValidate as any);
    if (isValid) {
      if (step === 2 && regType === "cultural") {
        setStep(4); // Skip branch for cultural
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    if (step === 4 && regType === "cultural") {
      setStep(2);
    } else {
      setStep(prev => prev - 1);
    }
  };

  const toggleBranch = (b: string) => {
    const current = [...selectedBranches];
    const index = current.indexOf(b);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(b);
    }
    form.setValue("branch", current);
  };

  if (isLoadingEvents) return <div className="min-h-screen pt-20 text-center font-pixel animate-pulse text-primary">LOADING FORM...</div>;

  const toggleEvent = (id: string) => {
    const current = [...selectedEventIds];
    const index = current.indexOf(id);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(id);
    }
    form.setValue("eventIds", current);
  };

  if (isLoadingEvents) return <div className="min-h-screen pt-20 text-center font-pixel animate-pulse text-primary">LOADING FORM...</div>;

  const filteredEvents = events?.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (regType === "both") {
      const matchBranch = selectedBranches.some(b => e.department.toLowerCase() === b.toLowerCase());
      return matchBranch || e.type === "cultural";
    }
    if (regType === "tech") {
      return e.type === "tech" && selectedBranches.some(b => e.department.toLowerCase() === b.toLowerCase());
    }
    return e.type === "cultural";
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl mb-4 text-primary normal-case">JOIN yoURFest</h1>
          
          {/* Progress Bar */}
          <div className="flex justify-between max-w-sm mx-auto mt-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-border -translate-y-1/2 -z-10" />
            <motion.div 
              className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 -z-10"
              initial={{ width: "0%" }}
              animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            />
            {STEPS.map((s, i) => (
              <div 
                key={s} 
                className={`w-4 h-4 rounded-none border-2 transition-all duration-300 ${step > i ? "bg-primary border-primary" : "bg-card border-border"}`}
                style={{ boxShadow: step > i ? '0 0 10px var(--primary)' : 'none' }}
              />
            ))}
          </div>
          <div className="mt-2 text-[10px] font-pixel text-muted-foreground uppercase tracking-widest">
            Step {step}: {STEPS[step - 1]}
          </div>
        </div>

        <PixelCard className="border-primary/50 overflow-hidden">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Participant Name *</label>
                      <input 
                        {...form.register("participantName")}
                        className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors focus:glow-yellow"
                        placeholder="Enter Your Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Roll Number *</label>
                      <input 
                        {...form.register("rollNumber")}
                        className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors focus:glow-yellow"
                        placeholder="Enter Your Roll Number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Email *</label>
                      <input 
                        type="email"  
                        {...form.register("email")}
                        className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors focus:glow-yellow"
                        placeholder="Enter Your Email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Phone *</label>
                      <input 
                        {...form.register("phone")}
                        className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors focus:glow-yellow"
                        placeholder="Enter Phone Number"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-pixel uppercase text-muted-foreground">College / Institution</label>
                    <input 
                      {...form.register("college")}
                      className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors focus:glow-yellow"
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <label className="block text-center text-sm font-pixel text-primary mb-6">WHAT'S YOUR PATH?</label>
                  <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: "tech", label: "TECHNICAL QUESTS" },
                      { id: "cultural", label: "CULTURAL VIBES" },
                      { id: "both", label: "ASCEND TO BOTH" }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => form.setValue("regType", type.id as any)}
                        className={`p-6 border-2 font-pixel text-xs transition-all ${regType === type.id ? "border-primary bg-primary/10 glow-yellow translate-x-1" : "border-border hover:border-primary/50"}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <label className="block text-center text-sm font-pixel text-primary mb-6">SELECT YOUR BRANCHES (MULTI-SELECT)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {branches.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBranch(b)}
                        className={`p-4 border-2 font-pixel text-[10px] transition-all flex items-center justify-between ${selectedBranches.includes(b) ? "border-secondary bg-secondary/10 glow-purple" : "border-border hover:border-secondary/50"}`}
                      >
                        {b}
                        {selectedBranches.includes(b) && <Check className="w-4 h-4 text-secondary" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <label className="block text-center text-sm font-pixel text-primary mb-6 uppercase">
                    CHOOSE YOUR {regType === 'both' ? 'MAIN' : regType} EVENTS
                  </label>
                  
                  <div className="mb-4 relative">
                    <input 
                      type="text"
                      placeholder="SEARCH EVENTS..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-background border-2 border-border p-3 font-pixel text-[10px] focus:outline-none focus:border-accent transition-all pl-10"
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredEvents?.length === 0 ? (
                      <div className="text-center py-10 font-pixel text-[10px] text-muted-foreground border-2 border-dashed border-border">
                        NO QUESTS FOUND MATCHING YOUR SEARCH
                      </div>
                    ) : (
                      filteredEvents?.map(event => (
                        <button
                          key={event.id}
                          type="button"
                          onClick={() => toggleEvent(event.id)}
                          className={`p-4 border-2 flex flex-col items-start gap-2 text-left transition-all ${selectedEventIds.includes(event.id) ? "border-accent bg-accent/10 glow-cyan translate-x-1" : "border-border hover:border-accent/50"}`}
                        >
                          <div className="flex justify-between w-full">
                            <div className="flex items-center gap-2">
                              <span className="font-pixel text-[10px] text-accent uppercase">{event.department}</span>
                              {selectedEventIds.includes(event.id) && <Check className="w-4 h-4 text-accent" />}
                            </div>
                            <span className="text-[10px] text-muted-foreground">{event.startTime}</span>
                          </div>
                          <span className="font-bold text-lg">{event.title}</span>
                          <span className="text-xs text-muted-foreground line-clamp-1">{event.shortDescription}</span>
                        </button>
                      ))
                    )}
                  </div>
                </motion.div>
              )}

              {step === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <label className="block text-center text-sm font-pixel text-primary mb-6">FINAL CHECK</label>
                  <div className="bg-muted/30 p-6 space-y-4 border-l-4 border-primary">
                    <div className="flex justify-between text-xs font-pixel text-muted-foreground">
                      <span>NAME:</span>
                      <span className="text-foreground">{form.getValues("participantName")}</span>
                    </div>
                    <div className="flex justify-between text-xs font-pixel text-muted-foreground">
                      <span>ROLL:</span>
                      <span className="text-foreground">{form.getValues("rollNumber")}</span>
                    </div>
                    <div className="flex justify-between text-xs font-pixel text-muted-foreground">
                      <span>PATH:</span>
                      <span className="text-primary uppercase">{regType}</span>
                    </div>
                    {regType !== "cultural" && (
                      <div className="flex justify-between text-xs font-pixel text-muted-foreground">
                        <span>BRANCHES:</span>
                        <span className="text-secondary uppercase">{selectedBranches.join(", ")}</span>
                      </div>
                    )}
                    <div className="border-t border-border/50 pt-4 space-y-4">
                      <div className="text-[10px] font-pixel text-muted-foreground uppercase">SELECTED QUESTS:</div>
                      {selectedEvents.map(event => (
                        <div key={event.id} className="p-3 bg-accent/5 border-l-2 border-accent">
                          <div className="text-sm font-bold text-accent uppercase">{event.title}</div>
                          <div className="text-[10px] text-muted-foreground flex justify-between">
                            <span>{event.department}</span>
                            <span>{event.startTime}</span>
                          </div>
                        </div>
                      ))}
                      {selectedEvents.length === 0 && (
                        <div className="text-xs text-red-500 font-pixel">NO EVENTS SELECTED</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-4 bg-accent/5 border border-accent/20 rounded-none flex gap-3 items-start">
                    <Check className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">
                      By confirming, you agree to follow the rules of the selected event. 
                      Standard registration applies.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 pt-4">
              {step > 1 && (
                <button
                  type="button"
                  onClick={prevStep}
                  className="px-6 py-4 bg-background border-2 border-border text-muted-foreground font-pixel text-[10px] hover:text-primary hover:border-primary transition-all flex items-center gap-2"
                >
                  <ArrowLeft className="w-3 h-3" /> BACK
                </button>
              )}
              
              {step < 5 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-grow py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2"
                >
                  NEXT <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  type="submit"
                  disabled={isPending}
                  className="flex-grow py-4 bg-accent text-accent-foreground font-pixel text-xs border-2 border-accent shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> SUBMITTING...
                    </>
                  ) : "CONFIRM REGISTRATION"}
                </button>
              )}
            </div>
          </form>
        </PixelCard>
      </div>
    </div>
  );
}
