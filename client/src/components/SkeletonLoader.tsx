import { motion } from "framer-motion";

export function EventCardSkeleton() {
  return (
    <div className="bg-card border-2 border-border p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
      <div className="flex justify-between items-start">
        <motion.div
          className="w-16 h-6 bg-muted rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="w-12 h-5 bg-muted rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <motion.div
        className="h-6 bg-muted w-3/4 rounded-none"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <div className="space-y-2">
        <motion.div
          className="h-4 bg-muted w-full rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 bg-muted w-5/6 rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            className="h-5 bg-muted w-4/5 rounded-none"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className="h-5 bg-muted w-4/5 rounded-none"
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
      </div>
    </div>
  );
}

export function StallCardSkeleton() {
  return (
    <div className="bg-card border-2 border-border p-6 space-y-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]">
      <motion.div
        className="w-full h-40 bg-muted rounded-none mb-4"
        animate={{ opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />

      <div className="flex justify-between items-start">
        <motion.div
          className="h-6 bg-muted w-1/2 rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-5 bg-muted w-10 rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div className="space-y-2">
        <motion.div
          className="h-4 bg-muted w-full rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 bg-muted w-4/5 rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>

      <div className="border-t border-border pt-4 space-y-2">
        <motion.div
          className="h-4 bg-muted w-full rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div
          className="h-4 bg-muted w-full rounded-none"
          animate={{ opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
    </div>
  );
}
