import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useStalls() {
  return useQuery({
    queryKey: [api.stalls.list.path],
    queryFn: async () => {
      const res = await fetch(api.stalls.list.path);
      if (!res.ok) throw new Error("Failed to fetch stalls");
      return api.stalls.list.responses[200].parse(await res.json());
    },
  });
}

export function useStall(id: string) {
  return useQuery({
    queryKey: [api.stalls.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.stalls.get.path, { id });
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch stall");
      return api.stalls.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
