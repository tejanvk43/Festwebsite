import { Link } from "wouter";
import { AlertTriangle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-6 p-8 border-2 border-border bg-card shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] max-w-md mx-4">
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto animate-pulse" />
        
        <div>
          <h1 className="text-6xl font-pixel text-primary mb-2">404</h1>
          <h2 className="text-xl font-bold text-muted-foreground">LEVEL NOT FOUND</h2>
        </div>
        
        <p className="text-sm text-muted-foreground font-mono">
          The page you are looking for has been glitched out of existence or moved to another server.
        </p>

        <Link href="/">
          <button className="w-full py-3 mt-4 bg-transparent border-2 border-primary text-primary font-pixel text-xs hover:bg-primary hover:text-primary-foreground transition-all">
            RETURN TO BASE
          </button>
        </Link>
      </div>
    </div>
  );
}
