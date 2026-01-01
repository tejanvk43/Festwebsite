import { events as staticEvents } from "@/data/events";

export function useEvents() {
  return {
    data: staticEvents,
    isLoading: false,
    error: null
  };
}

export function useEvent(id: string) {
  const event = staticEvents.find(e => e.id === id);
  return {
    data: event || null,
    isLoading: false,
    error: null
  };
}
