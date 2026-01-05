import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Force direct scroll to top on ANY route change
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto' // Immediate jump
    });
  }, [location]);

  return null;
}
