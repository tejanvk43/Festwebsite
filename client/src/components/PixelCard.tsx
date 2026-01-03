import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

interface PixelCardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "primary" | "secondary" | "accent";
  hoverEffect?: boolean;
}

export function PixelCard({ 
  children, 
  className, 
  variant = "default", 
  hoverEffect = true,
  ...props 
}: PixelCardProps) {
  const borderColor = {
    default: "border-border",
    primary: "border-primary",
    secondary: "border-secondary",
    accent: "border-accent",
  }[variant];

  const shadowColor = {
    default: "rgba(255,241,0,0.4)",
    primary: "rgba(255,241,0,0.5)",
    secondary: "rgba(190,127,255,0.4)",
    accent: "rgba(0,229,255,0.4)",
  }[variant];

  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, x: -4, boxShadow: `8px 8px 0px 0px ${shadowColor}, 0 0 25px ${shadowColor}` } : {}}
      className={cn(
        "bg-card border-2 p-6 transition-all duration-200",
        borderColor,
        "shadow-[4px_4px_0px_0px_rgba(255,241,0,0.2),0_0_15px_rgba(255,241,0,0.2)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
