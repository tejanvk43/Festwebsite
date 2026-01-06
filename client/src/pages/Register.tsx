import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/routes";
import { useCreateRegistration } from "@/hooks/use-registrations";
import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { PromoBanner } from "@/components/PromoBanner";
import { Loader2, Check, ArrowRight, ArrowLeft, Printer, Ticket, Package, AlertCircle, Gift, Sparkles } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const branches = [
  "CSE/AI",
  "IT",
  "ECE/EEE",
  "MECH",
  "DIPLOMA"
];

const STEPS = ["Personal", "Category", "Branch", "Selection", "Review"];

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { mutate, isPending } = useCreateRegistration();
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [regId, setRegId] = useState<number | null>(null);
  const [ticketData, setTicketData] = useState<{
    ticketId: string;
    qrCode: string;
    pricing: {
      totalEvents: number;
      freeEvents: number;
      originalAmount: number;
      discountAmount: number;
      finalAmount: number;
    };
  } | null>(null);

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      eventIds: [],
      teamName: "",
      college: "",
      participantName: "",
      email: "",
      phone: "",
      rollNumber: "",
      participantBranch: "",
      participantYear: "",
      branch: [],
      regType: "tech",
      educationLevel: ""
    }
  });

  const regType = form.watch("regType");
  const educationLevel = form.watch("educationLevel");
  const selectedBranches = form.watch("branch") as string[];
  const selectedEventIds = (form.watch("eventIds") || []) as string[];
  const [searchQuery, setSearchQuery] = useState("");
  const selectedEvents = events?.filter(e => selectedEventIds.includes(e.id)) || [];
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const branchOptions = ["CSE", "IT", "ECE", "EEE", "MECH", "CIVIL", "AI&ML", "Data Science", "Cyber Security", "MBA", "MCA"];

  const onSubmit = (data: InsertRegistration) => {
    console.log("Form data submitted:", data);
    mutate(data, {
      onSuccess: (response: any) => {
        setRegId(response.id);
        setTicketData({
          ticketId: response.ticketId,
          qrCode: response.qrCode,
          pricing: response.pricing
        });
        setIsSubmitted(true);
        toast({
          title: "Success",
          description: "Registration completed successfully! Check your email for the ticket.",
        });
      },
      onError: (error: any) => {
        console.error("Mutation error:", error);
      }
    });
  };

  const onInvalid = (errors: any) => {
    console.error("Form validation errors:", errors);
    toast({
      title: "Validation Error",
      description: "Please check the form for missing or incorrect information.",
      variant: "destructive",
    });
  };


  const nextStep = async () => {
    let fieldsToValidate: any[] = [];
    if (step === 1) {
      fieldsToValidate = ["participantName", "rollNumber", "participantBranch", "participantYear", "email", "phone", "college", "educationLevel"];
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
      // Diploma students skip directly to event selection (step 4)
      if (step === 1 && educationLevel === "DIPLOMA") {
        setStep(4);
      } else if (step === 2 && regType === "cultural") {
        setStep(4); // Skip branch for cultural
      } else {
        setStep(prev => prev + 1);
      }
    }
  };

  const prevStep = () => {
    // Diploma students go back to step 1 from step 4
    if (step === 4 && educationLevel === "DIPLOMA") {
      setStep(1);
    } else if (step === 4 && regType === "cultural") {
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

  const filteredEventsForSearch = events?.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         e.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  // Group events by branch for display
  const groupedEvents: Record<string, any[]> = {};
  
  if (educationLevel === "DIPLOMA") {
    groupedEvents["DIPLOMA EVENTS"] = events?.filter(e => e.tags?.includes("DIPLOMA")) || [];
  } else {
    selectedBranches.forEach(branch => {
      const branchEvents = events?.filter(e => {
        const matchesBranch = e.department.toLowerCase() === branch.toLowerCase();
        const isGeneral = e.tags?.includes("DIPLOMA");
        return (matchesBranch || isGeneral) && e.type === "tech";
      }) || [];
      if (branchEvents.length > 0) {
        groupedEvents[branch] = branchEvents;
      }
    });

    if (regType === "cultural" || regType === "both") {
      const culturalEvents = events?.filter(e => e.type === "cultural") || [];
      if (culturalEvents.length > 0) {
        groupedEvents["CULTURAL"] = culturalEvents;
      }
    }
  }

  // Apply search filtering to groups
  Object.keys(groupedEvents).forEach(key => {
    groupedEvents[key] = groupedEvents[key].filter(e => 
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (groupedEvents[key].length === 0) {
      delete groupedEvents[key];
    }
  });

  const hasEvents = Object.keys(groupedEvents).length > 0;

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl print:max-w-none print:m-0"
        >
          {/* Header for print hidden in digital view */}
          <div className="hidden print:block text-center mb-8 pb-4 border-b-2 border-primary">
            <h1 className="text-3xl font-brand font-black text-primary mb-2 tracking-tight">yoURFest 2026</h1>
            <p className="text-sm font-pixel text-muted-foreground uppercase">Official Registration Ticket</p>
          </div>

          <PixelCard className="border-primary bg-card/50 backdrop-blur-sm relative overflow-hidden print:border-2 print:shadow-none print:bg-white print:text-black">
            {/* Decoration for digital view */}
            <div className="absolute top-0 right-0 p-4 opacity-10 print:hidden">
              <Ticket className="w-48 h-48 -mr-12 -mt-12" />
            </div>

            <div className="space-y-8 relative z-10">
              <div className="flex justify-between items-start border-b border-border/50 pb-6 print:border-black/20">
                <div>
                  <h2 className="text-2xl text-primary font-brand font-black mb-1 print:text-black uppercase tracking-tight">REGISTRATION CONFIRMED</h2>
                  <p className="text-muted-foreground text-xs font-pixel uppercase">Ticket ID: <span className="text-accent font-mono text-lg print:text-black">{ticketData?.ticketId || `#${String(regId).padStart(6, '0')}`}</span></p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">Status</div>
                  <div className="flex items-center gap-1 text-accent font-pixel text-xs print:text-black">
                    <Check className="w-3 h-3" /> VERIFIED
                  </div>
                </div>
              </div>

              {/* Payment Notice */}
              <div className="p-4 bg-primary/10 border-2 border-primary/50 text-primary font-pixel text-[10px] leading-relaxed print:bg-white print:border-black print:text-black">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p>
                    <strong className="block mb-1 text-accent">⚠️ TEMPORARY TICKET</strong>
                    This is a <span className="text-accent underline font-bold">TEMPORARY TICKET</span>. 
                    Please present this at the <span className="text-secondary font-bold">Registration Desk (U-Block, Ground Floor)</span> to collect your official permanent ticket. 
                    Registration fees will be collected at the desk during validation.
                  </p>
                </div>
              </div>

              {/* QR Code and Pricing Section */}
              {ticketData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-accent/5 border border-accent/30 rounded-lg">
                  <div className="flex flex-col items-center justify-center">
                    <img 
                      src={ticketData.qrCode} 
                      alt="Ticket QR Code" 
                      className="w-32 h-32 border-2 border-accent rounded-lg"
                    />
                    <p className="text-[10px] text-muted-foreground font-pixel mt-2">SCAN TO VISIT WEBSITE</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-pixel text-xs text-accent mb-3">PAYMENT SUMMARY</h3>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Total Events</span>
                      <span>{ticketData.pricing.totalEvents}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Free Events</span>
                      <span>{ticketData.pricing.freeEvents}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Original Amount</span>
                      <span>₹{ticketData.pricing.originalAmount}</span>
                    </div>
                    <div className="flex justify-between text-sm text-green-500">
                      <span>Discount</span>
                      <span>-₹{ticketData.pricing.discountAmount}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-border pt-2 mt-2">
                      <span className="text-accent">Amount Payable</span>
                      <span className="text-accent">₹{ticketData.pricing.finalAmount}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">PARTICIPANT</div>
                    <div className="text-lg font-bold print:text-black">{form.getValues("participantName")}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">ROLL NUMBER</div>
                    <div className="font-mono text-sm print:text-black">{form.getValues("rollNumber")}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">BRANCH & YEAR</div>
                  <div className="text-sm print:text-black">
                    {form.getValues("participantBranch")} — {form.getValues("participantYear")}
                    {(() => {
                      const year = form.getValues("participantYear");
                      if (year === "1") return "st";
                      if (year === "2") return "nd";
                      if (year === "3") return "rd";
                      return "th";
                    })()} Year
                  </div>
                </div>
                <div>
                  <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">COLLEGE</div>
                  <div className="text-sm print:text-black">{form.getValues("college")}</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">REGISTRATION TYPE</div>
                  <div className="text-sm font-pixel text-primary uppercase print:text-black">{regType}</div>
                </div>
                {regType !== "cultural" && (
                  <div>
                    <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">BRANCHES</div>
                    <div className="text-xs print:text-black">{selectedBranches.join(", ")}</div>
                  </div>
                )}
                <div>
                  <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-1">DATE ISSUED</div>
                  <div className="text-xs print:text-black">{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-dashed border-border/50 pt-6 print:border-black/20">
              <div className="text-[10px] font-pixel text-muted-foreground uppercase mb-4">SELECTED QUESTS & EVENTS</div>
              <div className="grid grid-cols-1 gap-3">
                {selectedEvents.map(event => (
                  <div key={event.id} className="p-4 bg-muted/30 border-l-4 border-primary flex justify-between items-center print:bg-white print:border-black">
                    <div>
                      <div className="text-sm font-bold uppercase print:text-black">{event.title}</div>
                      <div className="text-[10px] text-muted-foreground print:text-black">{event.department}</div>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground print:text-black">{event.startTime}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center pt-4 print:hidden">
              <div className="text-[10px] text-muted-foreground font-pixel flex items-center justify-center gap-2">
                <Package className="w-3 h-3" /> PLEASE REGISTER AT THE REGISTRATION DESK
              </div>
            </div>
          </div>
        </PixelCard>

        <div className="flex flex-col sm:flex-row gap-4 mt-8 print:hidden">
          <button
            onClick={() => window.print()}
            className="flex-grow py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,241,0,0.3)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2"
          >
            <Printer className="w-4 h-4" /> PRINT TICKET
          </button>
          
          <button
            onClick={() => setLocation("/")}
            className="flex-grow py-4 bg-accent text-accent-foreground font-pixel text-xs border-2 border-accent shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2"
          >
            GO TO HOME
          </button>

          <button
            onClick={() => {
              setIsSubmitted(false);
              setRegId(null);
              setTicketData(null);
              setStep(1);
              form.reset();
            }}
            className="px-8 py-4 bg-background border-2 border-border text-muted-foreground font-pixel text-[10px] hover:text-primary hover:border-primary transition-all uppercase"
          >
            NEW REGISTRATION
          </button>
        </div>
          
          <p className="mt-8 text-center text-xs text-muted-foreground font-pixel uppercase print:hidden">
            A confirmation email has been sent to your registered address.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <PromoBanner />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl mb-4 text-primary font-brand font-black tracking-tight">JOIN yoUR Fest</h1>
          
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
          <form onSubmit={form.handleSubmit(onSubmit, onInvalid)} className="space-y-6">
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
                        className={`w-full bg-background border-2 p-3 focus:outline-none transition-colors focus:glow-yellow ${form.formState.errors.participantName ? "border-red-500" : "border-border focus:border-primary"}`}
                        placeholder="Enter Your Name"
                      />
                      {form.formState.errors.participantName && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.participantName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Roll Number *</label>
                      <input 
                        {...form.register("rollNumber")}
                        className={`w-full bg-background border-2 p-3 focus:outline-none transition-colors focus:glow-yellow ${form.formState.errors.rollNumber ? "border-red-500" : "border-border focus:border-primary"}`}
                        placeholder="Enter Your Roll Number"
                      />
                      {form.formState.errors.rollNumber && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.rollNumber.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Education LEVEL *</label>
                      <div className="stylish-select-container">
                        <select 
                          {...form.register("educationLevel")}
                          className="stylish-select"
                        >
                          <option value="" className="stylish-option">Select Level</option>
                          <option value="DIPLOMA" className="stylish-option">DIPLOMA</option>
                          <option value="UG" className="stylish-option">UG (B.Tech/B.Sc/etc)</option>
                          <option value="PG" className="stylish-option">PG (M.Tech/MBA/etc)</option>
                        </select>
                      </div>
                      {form.formState.errors.educationLevel && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.educationLevel.message}</p>
                      )}
                    </div>
                    <div className="space-y-2 relative">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Branch / Dept *</label>
                      <input 
                        {...form.register("participantBranch")}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                        className={`stylish-input ${form.formState.errors.participantBranch ? "border-red-500" : ""}`}
                        placeholder="Select or Type Branch"
                        autoComplete="off"
                      />
                      {form.formState.errors.participantBranch && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.participantBranch.message}</p>
                      )}
                      <AnimatePresence>
                        {showSuggestions && (
                          <motion.div 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="suggestions-list scrollbar-hide"
                          >
                            {branchOptions.filter(b => 
                              b.toLowerCase().includes(form.watch("participantBranch")?.toLowerCase() || "")
                            ).map(option => (
                              <div 
                                key={option}
                                className="suggestion-item"
                                onClick={() => {
                                  form.setValue("participantBranch", option);
                                  setShowSuggestions(false);
                                }}
                              >
                                {option}
                              </div>
                            ))}
                            {branchOptions.filter(b => 
                              b.toLowerCase().includes(form.watch("participantBranch")?.toLowerCase() || "")
                            ).length === 0 && (
                              <div className="p-3 text-[8px] font-pixel text-muted-foreground uppercase">
                                Press Enter to use custom branch
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Year of Study *</label>
                      <div className="stylish-select-container">
                        <select 
                          {...form.register("participantYear")}
                          className="stylish-select disabled:opacity-50"
                          disabled={!educationLevel}
                        >
                          <option value="" className="stylish-option">Select Year</option>
                          {educationLevel === "DIPLOMA" && (
                            <>
                              <option value="1" className="stylish-option">1st Year</option>
                              <option value="2" className="stylish-option">2nd Year</option>
                              <option value="3" className="stylish-option">3rd Year</option>
                            </>
                          )}
                          {educationLevel === "UG" && (
                            <>
                              <option value="1" className="stylish-option">1st Year</option>
                              <option value="2" className="stylish-option">2nd Year</option>
                              <option value="3" className="stylish-option">3rd Year</option>
                              <option value="4" className="stylish-option">4th Year</option>
                            </>
                          )}
                          {educationLevel === "PG" && (
                            <>
                              <option value="1" className="stylish-option">1st Year</option>
                              <option value="2" className="stylish-option">2nd Year</option>
                            </>
                          )}
                        </select>
                      </div>
                      {form.formState.errors.participantYear && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.participantYear.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Email *</label>
                      <input 
                        type="email"  
                        {...form.register("email")}
                        className={`w-full bg-background border-2 p-3 focus:outline-none transition-colors focus:glow-yellow ${form.formState.errors.email ? "border-red-500" : "border-border focus:border-primary"}`}
                        placeholder="Enter Your Email"
                      />
                      {form.formState.errors.email && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.email.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-pixel uppercase text-muted-foreground">Phone *</label>
                      <input 
                        {...form.register("phone")}
                        className={`w-full bg-background border-2 p-3 focus:outline-none transition-colors focus:glow-yellow ${form.formState.errors.phone ? "border-red-500" : "border-border focus:border-primary"}`}
                        placeholder="Enter Phone Number"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-pixel uppercase text-muted-foreground">College / Institution *</label>
                    <input 
                      {...form.register("college")}
                      placeholder="Enter College / Institution"
                      className={`w-full bg-background border-2 p-3 focus:outline-none transition-colors focus:glow-yellow ${form.formState.errors.college ? "border-red-500" : "border-border focus:border-primary"}`}
                    />
                    {form.formState.errors.college && (
                      <p className="text-[10px] text-red-500 font-pixel uppercase mt-1">{form.formState.errors.college.message}</p>
                    )}
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
                      { id: "tech", label: "TECHNICAL Events" },
                      { id: "cultural", label: "CULTURAL Events" },
                      { id: "both", label: "Both TECHNICAL & CULTURAL Events" }
                    ].map(type => (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => {
                          form.setValue("regType", type.id as any);
                          // Skip branch selection for cultural events
                          if (type.id === "cultural") {
                            setTimeout(() => setStep(4), 100);
                          } else {
                            setTimeout(nextStep, 100);
                          }
                        }}
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

                  <div className="space-y-8 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                    {!hasEvents ? (
                      <div className="text-center py-10 font-pixel text-[10px] text-muted-foreground border-2 border-dashed border-border">
                        NO QUESTS FOUND MATCHING YOUR SEARCH
                      </div>
                    ) : (
                      Object.entries(groupedEvents).map(([branchName, events]) => (
                        <div key={branchName} className="space-y-3">
                          <div className="flex items-center gap-2 border-b-2 border-primary/30 pb-2">
                            <Package className="w-4 h-4 text-primary" />
                            <h3 className="font-pixel text-[12px] text-primary uppercase">{branchName}</h3>
                          </div>
                          <div className="grid grid-cols-1 gap-4">
                            {events.map(event => (
                              <button
                                key={`${branchName}-${event.id}`}
                                type="button"
                                onClick={() => toggleEvent(event.id)}
                                className={`p-4 border-2 flex flex-col items-start gap-2 text-left transition-all ${selectedEventIds.includes(event.id) ? "border-accent bg-accent/10 glow-cyan translate-x-1" : "border-border hover:border-accent/50"}`}
                              >
                                <div className="w-full flex items-center gap-2 mb-1">
                                  <span className={`px-2 py-1 text-[8px] font-pixel uppercase rounded ${event.tags?.includes("DIPLOMA") ? "bg-secondary/20 text-secondary border border-secondary/50" : "bg-primary/20 text-primary border border-primary/50"}`}>
                                    {event.tags?.includes("DIPLOMA") ? "ALL BRANCHES" : event.department}
                                  </span>
                                  <span className="text-[8px] text-muted-foreground font-pixel">{event.type.toUpperCase()}</span>
                                </div>
                                <div className="flex justify-between w-full">
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-base">{event.title}</span>
                                    {selectedEventIds.includes(event.id) && <Check className="w-4 h-4 text-accent" />}
                                  </div>
                                  <span className="text-[10px] text-muted-foreground">{event.startTime}</span>
                                </div>
                                <span className="text-xs text-muted-foreground line-clamp-1">{event.shortDescription}</span>
                              </button>
                            ))}
                          </div>
                        </div>
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
                      <span>BRANCH:</span>
                      <span className="text-foreground">{form.getValues("participantBranch")}</span>
                    </div>
                    <div className="flex justify-between text-xs font-pixel text-muted-foreground">
                      <span>YEAR:</span>
                      <span className="text-foreground">{form.getValues("participantYear")} ({form.getValues("educationLevel")})</span>
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
                  
                  {/* Pricing Breakdown */}
                  {selectedEvents.length > 0 && (() => {
                    const totalEvents = selectedEvents.length;
                    const freeEvents = Math.floor(totalEvents / 3);
                    const paidEvents = totalEvents - freeEvents;
                    const totalOriginalCost = selectedEvents.reduce((sum, e) => sum + e.registrationFee, 0);
                    const averageFee = totalOriginalCost / totalEvents;
                    const discount = freeEvents * averageFee;
                    const finalCost = totalOriginalCost - discount;
                    
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/10 border-2 border-primary p-6 space-y-3"
                      >
                        <div className="text-sm font-pixel text-primary uppercase mb-4 flex items-center gap-2">
                          <Gift className="w-4 h-4" />
                          PRICING BREAKDOWN
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Total Events Selected:</span>
                            <span className="font-bold">{totalEvents}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Original Cost:</span>
                            <span className="font-mono">₹{totalOriginalCost}</span>
                          </div>
                          {freeEvents > 0 && (
                            <>
                              <div className="flex justify-between text-xs text-accent">
                                <span className="flex items-center gap-1">
                                  <Sparkles className="w-3 h-3" />
                                  Free Events (Buy 2 Get 1):
                                </span>
                                <span className="font-bold">{freeEvents} Event{freeEvents > 1 ? 's' : ''}</span>
                              </div>
                              <div className="flex justify-between text-xs text-accent">
                                <span>Discount:</span>
                                <span className="font-bold">- ₹{Math.round(discount)}</span>
                              </div>
                            </>
                          )}
                          <div className="border-t-2 border-primary/30 pt-2 mt-2">
                            <div className="flex justify-between text-base font-pixel">
                              <span className="text-primary">FINAL AMOUNT:</span>
                              <span className="text-primary text-xl">₹{Math.round(finalCost)}</span>
                            </div>
                            <p className="text-[8px] text-muted-foreground mt-2">
                              You pay for {paidEvents} event{paidEvents > 1 ? 's' : ''} • Save ₹{Math.round(discount)}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()}
                  
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
                // Hide NEXT button on Step 2 since clicking an option auto-proceeds
                step !== 2 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex-grow py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2"
                  >
                    NEXT <ArrowRight className="w-4 h-4" />
                  </button>
                )
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
