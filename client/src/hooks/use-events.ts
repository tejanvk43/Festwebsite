import { useQuery } from "@tanstack/react-query";
import { type Event } from "@shared/schema";
import { api } from "@shared/routes";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: [api.events.list.path],
  });
}

export function useEvent(id: string) {
  return useQuery<Event>({
    queryKey: [api.events.get.path.replace(":id", id)],
    enabled: !!id,
  });
}
