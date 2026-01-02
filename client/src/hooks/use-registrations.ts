import { useState } from "react";
import { useToast } from "./use-toast";
import { type InsertRegistration } from "@shared/routes";

export function useCreateRegistration() {
  const { toast } = useToast();
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: InsertRegistration, { onSuccess, onError }: any = {}) => {
    try {
      setIsPending(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // LOG TO CONSOLE AS SIMULATED STORAGE
      console.log("SIMULATED REGISTRATION SUCCESS:", data);

      const mockId = Math.floor(Math.random() * 900000) + 100000;
      if (onSuccess) onSuccess({ id: mockId });

      toast({
        title: "Registration Successful!",
        description: `See you at yoURFest 2026, ${data.participantName}!`,
        variant: "default",
      });
    } catch (error: any) {
      if (onError) onError(error);
      toast({
        title: "Registration Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsPending(false);
    }
  };

  return {
    mutate,
    isPending
  };
}
