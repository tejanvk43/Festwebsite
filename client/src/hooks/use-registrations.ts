import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type InsertRegistration } from "@shared/routes";
import { useToast } from "./use-toast";

export function useCreateRegistration() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertRegistration) => {
      const res = await fetch(api.registrations.create.path, {
        method: api.registrations.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.registrations.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to register");
      }
      return api.registrations.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Registration Successful!",
        description: "See you at yoURFest 2026.",
        variant: "default",
      });
      // Invalidate relevant queries if needed, though registrations are usually write-only for public
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
