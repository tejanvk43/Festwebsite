import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { api } from "@shared/routes";
import { type InsertRegistration } from "@shared/schema";
import { useToast } from "./use-toast";

export function useCreateRegistration() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await apiRequest("POST", api.registrations.create.path, data);
      return await res.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Registration Successful!",
        description: `Your ticket ID is ${data.ticketId}. See you at yoURFest 2026!`,
      });
      queryClient.invalidateQueries({ queryKey: [api.events.list.path] });
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
