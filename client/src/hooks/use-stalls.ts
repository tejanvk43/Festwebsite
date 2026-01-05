import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type Stall } from "@shared/schema";

export function useStalls() {
  return useQuery<Stall[]>({
    queryKey: ["stalls"],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, "stalls"));
      return snapshot.docs.map(doc => ({ ...doc.data() } as Stall));
    }
  });
}

export function useStall(id: string) {
  return useQuery<Stall>({
    queryKey: ["stalls", id],
    queryFn: async () => {
      const docRef = doc(db, "stalls", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error("Stall not found");
      return { ...docSnap.data() } as Stall;
    },
    enabled: !!id,
  });
}
