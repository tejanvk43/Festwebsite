import { useMutation } from "@tanstack/react-query";
import { collection, setDoc, doc, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { queryClient } from "@/lib/queryClient";
import { type InsertRegistration } from "@shared/schema";
import { useToast } from "./use-toast";
import { generateTicketId, generateQRCode, calculatePricing } from "@/lib/ticket";

async function getNextRegistrationId() {
  const q = query(collection(db, "registrations"), orderBy("id", "desc"), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return 1;
  const lastDoc = snapshot.docs[0].data();
  return (lastDoc.id || 0) + 1;
}

export function useCreateRegistration() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (input: InsertRegistration) => {
      const nextId = await getNextRegistrationId();
      const ticketId = generateTicketId(nextId);
      const pricing = calculatePricing(input.eventIds.length);
      const qrCode = await generateQRCode(ticketId);

      const registrationData = {
        ...input,
        id: nextId,
        ticketId,
        totalEvents: pricing.totalEvents,
        freeEvents: pricing.freeEvents,
        originalAmount: pricing.originalAmount,
        discountAmount: pricing.discountAmount,
        finalAmount: pricing.finalAmount,
        qrCode,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "registrations", ticketId), registrationData);
      return registrationData;
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful!",
        description: `Your ticket ID is ${data.ticketId}. See you at yoURFest 2026!`,
      });
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (error: Error) => {
      toast({
        title: "Registration Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
