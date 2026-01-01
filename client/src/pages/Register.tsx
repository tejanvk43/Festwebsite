import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertRegistrationSchema, type InsertRegistration } from "@shared/routes";
import { useCreateRegistration } from "@/hooks/use-registrations";
import { useEvents } from "@/hooks/use-events";
import { PixelCard } from "@/components/PixelCard";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: events, isLoading: isLoadingEvents } = useEvents();
  const { mutate, isPending } = useCreateRegistration();

  const form = useForm<InsertRegistration>({
    resolver: zodResolver(insertRegistrationSchema),
    defaultValues: {
      eventId: "",
      teamName: "",
      college: "Usharama College",
      participantName: "",
      email: "",
      phone: "",
      rollNumber: "",
    }
  });

  const onSubmit = (data: InsertRegistration) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast({
          title: "Success",
          description: "Registration completed successfully!",
        });
      }
    });
  };

  if (isLoadingEvents) return <div className="min-h-screen pt-20 text-center font-pixel animate-pulse text-primary">LOADING FORM...</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl mb-4 text-primary normal-case">JOIN yoURFest</h1>
          <p className="text-muted-foreground">Fill in your details to register for an event.</p>
        </div>

        <PixelCard className="border-primary/50">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-pixel uppercase text-muted-foreground">Select Event *</label>
              <select 
                {...form.register("eventId")}
                className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">Choose an event</option>
                {events?.map(event => (
                  <option key={event.id} value={event.id}>{event.title}</option>
                ))}
              </select>
              {form.formState.errors.eventId && (
                <span className="text-xs text-red-500 font-mono">{form.formState.errors.eventId.message}</span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">Participant Name *</label>
                <input 
                  {...form.register("participantName")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter Your Name"
                />
                {form.formState.errors.participantName && (
                  <span className="text-xs text-red-500 font-mono">{form.formState.errors.participantName.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">Roll Number *</label>
                <input 
                  {...form.register("rollNumber")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter Your Roll Number"
                />
                {form.formState.errors.rollNumber && (
                  <span className="text-xs text-red-500 font-mono">{form.formState.errors.rollNumber.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">Email *</label>
                <input 
                  type="email"  
                  {...form.register("email")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter Your Email"
                />
                {form.formState.errors.email && (
                  <span className="text-xs text-red-500 font-mono">{form.formState.errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">Phone *</label>
                <input 
                  {...form.register("phone")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter Your Phone Number"
                />
                {form.formState.errors.phone && (
                  <span className="text-xs text-red-500 font-mono">{form.formState.errors.phone.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">College / Institution</label>
                <input 
                  {...form.register("college")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Usharama College"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-pixel uppercase text-muted-foreground">Team Name (Optional)</label>
                <input 
                  {...form.register("teamName")}
                  className="w-full bg-background border-2 border-border p-3 focus:outline-none focus:border-primary transition-colors"
                  placeholder="Enter Team Name"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isPending}
              className="w-full py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> SUBMITTING...
                </>
              ) : "CONFIRM REGISTRATION"}
            </button>

          </form>
        </PixelCard>
      </div>
    </div>
  );
}
