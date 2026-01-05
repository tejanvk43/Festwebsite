import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Event } from "@shared/schema";

export function useEvents() {
  return useQuery<Event[]>({
    queryKey: ["events"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "events"));
      return snapshot.docs.map(doc => ({ ...doc.data() } as Event));
    }
  });
}

export function useEvent(id: string) {
  return useQuery<Event>({
    queryKey: ["events", id],
    queryFn: async () => {
      const docRef = doc(db, "events", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Event not found");
      return { ...docSnap.data() } as Event;
    },
    enabled: !!id,
  });
}
