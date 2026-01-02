import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CountdownTimer() {
  const targetDate = new Date("2026-01-23T09:00:00").getTime();
  
  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((difference % (1000 * 60)) / 1000),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const prevTimeRef = useRef(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      prevTimeRef.current = timeLeft;
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const TimeUnit = ({ value, prevValue, label }: { value: number; prevValue: number; label: string }) => {
    const hasChanged = value !== prevValue;
    const digits = value.toString().padStart(2, "0").split("");
    
    return (
      <div className="flex flex-col items-center">
        <div className="bg-primary/10 border-2 border-primary px-2 py-3 md:px-4 md:py-4 min-w-[70px] md:min-w-[90px] flex gap-1 justify-center">
          {hasChanged ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={value}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 40, opacity: 0 }}
                transition={{ 
                  duration: 0.5,
                  ease: [0.34, 1.56, 0.64, 1]
                }}
                className="flex gap-1"
              >
                {digits.map((digit, index) => (
                  <div key={index} className="font-pixel text-2xl md:text-4xl text-primary w-4 md:w-7 text-center">
                    {digit}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          ) : (
            <div className="flex gap-1">
              {digits.map((digit, index) => (
                <div key={index} className="font-pixel text-2xl md:text-4xl text-primary w-4 md:w-7 text-center">
                  {digit}
                </div>
              ))}
            </div>
          )}
        </div>
        <span className="text-[10px] md:text-xs font-pixel text-muted-foreground mt-2 uppercase tracking-widest">
          {label}
        </span>
      </div>
    );
  };

  return (
    <div className="flex gap-3 md:gap-4 justify-center items-center">
      <TimeUnit value={timeLeft.days} prevValue={prevTimeRef.current.days} label="DAYS" />
      <div className="text-primary font-pixel text-2xl md:text-4xl -mt-6">:</div>
      <TimeUnit value={timeLeft.hours} prevValue={prevTimeRef.current.hours} label="HOURS" />
      <div className="text-primary font-pixel text-2xl md:text-4xl -mt-6">:</div>
      <TimeUnit value={timeLeft.minutes} prevValue={prevTimeRef.current.minutes} label="MINS" />
      <div className="text-primary font-pixel text-2xl md:text-4xl -mt-6">:</div>
      <TimeUnit value={timeLeft.seconds} prevValue={prevTimeRef.current.seconds} label="SECS" />
    </div>
  );
}
