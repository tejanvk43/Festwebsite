import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { GameBoyMenu } from "@/components/GameBoyMenu";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetail from "@/pages/EventDetail";
import Stalls from "@/pages/Stalls";
import Schedule from "@/pages/Schedule";
import Venue from "@/pages/Venue";
import Contact from "@/pages/Contact";
import Register from "@/pages/Register";
import { FestBot } from "@/components/FestBot";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingScreen } from "@/components/LoadingScreen";

import { useLocation } from "wouter";

function Router() {
  const [location] = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location}
        initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full"
      >
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/events" component={Events} />
          <Route path="/events/:id" component={EventDetail} />
          <Route path="/stalls" component={Stalls} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/venue" component={Venue} />
          <Route path="/contact" component={Contact} />
          <Route path="/register" component={Register} />
          <Route component={NotFound} />
        </Switch>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLoadingFinished = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loader" onFinished={handleLoadingFinished} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen flex flex-col bg-background text-foreground font-body selection:bg-primary selection:text-primary-foreground"
          >
            <Navigation onOpenMenu={() => setIsMenuOpen(true)} />
            <main className="flex-grow">
              <Router />
            </main>
            <Footer />
            <AnimatePresence>
              {isMenuOpen && (
                <GameBoyMenu onClose={() => setIsMenuOpen(false)} />
              )}
            </AnimatePresence>
            <div className="crt-overlay" />
            <FestBot />
            <Toaster />
          </motion.div>
        )}
      </AnimatePresence>
    </QueryClientProvider>
  );
}

export default App;
