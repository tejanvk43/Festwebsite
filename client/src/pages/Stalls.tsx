import { useStalls } from "@/hooks/use-stalls";
import { PixelCard } from "@/components/PixelCard";
import { StallCardSkeleton } from "@/components/SkeletonLoader";
import { ShoppingBag, Clock, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Stalls() {
  const { data: stalls, isLoading, error } = useStalls();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl mb-4 text-secondary neon-text">MARKETPLACE</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Food, Merch, and Gaming Zones. Recharge and Gear up.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <StallCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500 font-pixel">FAILED TO LOAD STALLS</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl mb-4 text-secondary neon-text">MARKETPLACE</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Food, Merch, and Gaming Zones. Recharge and Gear up.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stalls?.map((stall, idx) => (
          <motion.div
            key={stall.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <PixelCard variant="secondary" className="flex flex-col h-full">
            <div className="aspect-video bg-muted mb-6 border-2 border-border overflow-hidden relative">
              {/* Using generic food/merch placeholder */}
              <img 
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80" 
                alt={stall.name}
                className="w-full h-full object-cover md:grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-background border border-border text-[10px] font-pixel text-secondary uppercase">
                {stall.type}
              </div>
            </div>

            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold">{stall.name}</h3>
              <span className="text-xs bg-muted px-2 py-1 rounded-none font-mono">{stall.booth}</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 flex-grow">
              {stall.description}
            </p>

            <div className="space-y-2 text-sm border-t border-border pt-4 mt-auto">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-secondary" />
                <span className="text-foreground">{stall.items.slice(0, 3).join(", ")}...</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{stall.location}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{stall.openingHours[0]?.open} - {stall.openingHours[0]?.close}</span>
              </div>
            </div>
            </PixelCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
