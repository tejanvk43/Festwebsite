import { stalls as staticStalls } from "@/data/stalls";

export function useStalls() {
  return {
    data: staticStalls,
    isLoading: false,
    error: null
  };
}

export function useStall(id: string) {
  const stall = staticStalls.find(s => s.id === id);
  return {
    data: stall || null,
    isLoading: false,
    error: null
  };
}
