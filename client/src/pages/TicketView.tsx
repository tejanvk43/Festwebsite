import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Calendar, MapPin, Clock, User, Mail, Phone, School, CheckCircle, AlertCircle, Ticket } from "lucide-react";

interface TicketData {
  registration: {
    ticketId: string;
    participantName: string;
    email: string;
    phone: string;
    college: string;
    rollNumber: string;
    participantBranch: string;
    participantYear: string;
    eventIds: string[];
    totalEvents: number;
    freeEvents: number;
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
    qrCode: string;
    createdAt: string;
  };
  events: Array<{
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    venueArea: string;
    registrationFee: number;
  }>;
}

export default function TicketView() {
  const [, params] = useRoute("/ticket/:ticketId");
  const ticketId = params?.ticketId;

  const { data, isLoading, error } = useQuery<TicketData>({
    queryKey: ['ticket', ticketId],
    queryFn: async () => {
      const res = await fetch(`/api/ticket/${ticketId}`);
      if (!res.ok) throw new Error('Ticket not found');
      return res.json();
    },
    enabled: !!ticketId
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="font-pixel text-accent">LOADING TICKET...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 border-2 border-destructive bg-destructive/10 rounded-lg max-w-md"
        >
          <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
          <h2 className="font-pixel text-xl text-destructive mb-2">TICKET NOT FOUND</h2>
          <p className="text-muted-foreground">
            The ticket ID "{ticketId}" does not exist or has been invalidated.
          </p>
        </motion.div>
      </div>
    );
  }

  const { registration, events } = data;

  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500 rounded-full mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-pixel text-sm text-green-500">VALID TICKET</span>
          </div>
          <h1 className="font-pixel text-3xl text-accent mb-2">yoUR Fest 2026</h1>
          <p className="text-muted-foreground">Registration Confirmation</p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border-2 border-accent rounded-xl overflow-hidden shadow-[0_0_30px_rgba(0,229,255,0.2)]"
        >
          {/* Ticket Header */}
          <div className="bg-gradient-to-r from-accent/20 via-accent/10 to-accent/20 p-6 border-b border-accent/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Ticket ID</p>
                <p className="font-pixel text-2xl text-accent tracking-widest">{registration.ticketId}</p>
              </div>
              <Ticket className="w-10 h-10 text-accent opacity-50" />
            </div>
          </div>

          {/* QR Code & Info */}
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {/* QR Code */}
            <div className="flex flex-col items-center justify-center bg-background/50 rounded-lg p-4 border border-border">
              <img 
                src={registration.qrCode} 
                alt="Ticket QR Code" 
                className="w-40 h-40 rounded-lg border-2 border-accent"
              />
              <p className="text-xs text-muted-foreground mt-2">Scan to verify</p>
            </div>

            {/* Participant Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">{registration.participantName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{registration.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{registration.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <School className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">College</p>
                  <p className="font-medium text-sm">{registration.college}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="p-6 border-t border-border">
            <h3 className="font-pixel text-sm text-accent mb-4">REGISTERED EVENTS</h3>
            <div className="space-y-3">
              {events.map((event, index) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 flex items-center justify-center bg-accent/20 text-accent text-xs font-bold rounded">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        <span>{event.date}</span>
                        <Clock className="w-3 h-3 ml-2" />
                        <span>{event.startTime}</span>
                        <MapPin className="w-3 h-3 ml-2" />
                        <span>{event.venueArea}</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-green-500 font-medium">₹{event.registrationFee}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="p-6 bg-accent/5 border-t border-accent/30">
            <h3 className="font-pixel text-sm text-accent mb-4">PAYMENT SUMMARY</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Events</span>
                <span>{registration.totalEvents}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Free Events (Buy 2 Get 1 Free)</span>
                <span>{registration.freeEvents}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Original Amount</span>
                <span>₹{registration.originalAmount}</span>
              </div>
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>-₹{registration.discountAmount}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border text-lg font-bold">
                <span className="text-accent">Amount Payable</span>
                <span className="text-accent">₹{registration.finalAmount}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 bg-muted/50 text-center">
            <p className="text-xs text-muted-foreground">
              Registered on {new Date(registration.createdAt).toLocaleString()}
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 p-6 border border-accent/50 bg-accent/10 rounded-lg"
        >
          <p className="text-sm text-accent font-pixel mb-3 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> TEMPORARY TICKET NOTICE
          </p>
          <div className="space-y-3">
            <p className="text-sm text-foreground font-medium">
              This is a <span className="text-accent underline">TEMPORARY TICKET</span>.
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Please present this ticket at the <strong className="text-foreground">Registration Desk (U-Block, Ground Floor)</strong> to collect your official permanent ticket. 
              Registration fees will be collected at the registration desk during validation.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
