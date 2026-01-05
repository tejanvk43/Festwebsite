import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Download, 
  Search, 
  Lock, 
  ChevronRight, 
  LogOut, 
  Database,
  Calendar,
  Ticket as TicketIcon,
  RefreshCw,
  LayoutDashboard
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { PixelCard } from "@/components/HandheldConsole";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Registration } from "@shared/schema";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");


  const { data: registrations, isLoading, refetch } = useQuery<Registration[]>({
    queryKey: ['registrations'],
    queryFn: async () => {
      const q = query(collection(db, "registrations"), orderBy("id", "asc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => doc.data() as Registration);
    },
    enabled: isAuthenticated
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "admin@yourfest2026" && password === "yoURfest2026") {
      setIsAuthenticated(true);
      toast({
        title: "Access Granted",
        description: "Welcome back, Admin.",
      });
    } else {
      toast({
        title: "Access Denied",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setEmail("");
    setPassword("");
  };

  const exportToCSV = () => {
    if (!registrations || registrations.length === 0) return;

    const headers = [
      "ID", "Ticket ID", "Name", "Email", "Phone", "Roll Number", 
      "Branch", "Year", "College", "Education Level", "Reg Type", 
      "Total Amount", "Created At"
    ];

    const csvContent = [
      headers.join(","),
      ...registrations.map(r => [
        r.id,
        r.ticketId,
        `"${r.participantName}"`,
        r.email,
        r.phone,
        r.rollNumber,
        `"${r.participantBranch}"`,
        r.participantYear,
        `"${r.college}"`,
        r.educationLevel,
        r.regType,
        r.finalAmount,
        r.createdAt
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations?.filter(r => 
    r.participantName?.toLowerCase().includes(search.toLowerCase()) ||
    r.ticketId?.toLowerCase().includes(search.toLowerCase()) ||
    r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.rollNumber?.toLowerCase().includes(search.toLowerCase())
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <PixelCard className="border-primary p-8">
            <div className="text-center mb-8">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Lock className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-pixel text-primary mb-2 uppercase">CONTROL PANEL</h1>
              <p className="text-xs text-muted-foreground font-pixel tracking-widest">AUTHENTICATION REQUIRED</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-pixel uppercase text-muted-foreground">Admin ID</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-background border-2 border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="admin@yourfest2026"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-pixel uppercase text-muted-foreground">Access Code</label>
                <input 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border-2 border-border p-3 font-mono text-sm focus:outline-none focus:border-primary transition-colors"
                  placeholder="********"
                  required
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-primary-foreground font-pixel text-xs border-2 border-primary shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center gap-2"
              >
                ACCESS SYSTEM <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          </PixelCard>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-pixel">
      {/* Top Navbar */}
      <nav className="border-b-2 border-primary/20 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-6 h-6 text-primary" />
            <div>
              <h2 className="text-lg text-primary uppercase">Admin Terminal</h2>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] text-muted-foreground uppercase tracking-tighter">System Online</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button 
              onClick={() => refetch()}
              className="p-2 hover:text-primary transition-colors text-muted-foreground"
              title="Refresh Data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-[10px] text-muted-foreground hover:text-red-500 transition-colors uppercase"
            >
              <LogOut className="w-4 h-4" /> Disconnect
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-10">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <PixelCard className="border-accent/30 p-6 bg-accent/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <Users className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Registrations</p>
                <p className="text-2xl text-accent font-bold">{registrations?.length || 0}</p>
              </div>
            </div>
          </PixelCard>
          <PixelCard className="border-primary/30 p-6 bg-primary/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Database className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Total Revenue</p>
                <p className="text-2xl text-primary font-bold">₹{registrations?.reduce((sum, r) => sum + r.finalAmount, 0) || 0}</p>
              </div>
            </div>
          </PixelCard>
          <PixelCard className="border-secondary/30 p-6 bg-secondary/5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground uppercase">Last Activity</p>
                <p className="text-xs text-secondary">
                  {registrations?.length ? new Date(registrations[registrations.length-1].createdAt).toLocaleTimeString() : 'No activity'}
                </p>
              </div>
            </div>
          </PixelCard>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text"
              placeholder="SEARCH PARTICIPANTS / TICKET ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-background border-2 border-border p-3 pl-12 text-[10px] focus:outline-none focus:border-primary transition-all uppercase"
            />
          </div>
          <button 
            onClick={exportToCSV}
            className="px-6 py-3 bg-accent text-accent-foreground text-[10px] uppercase flex items-center gap-2 border-2 border-accent shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none transition-all"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>

        {/* Data Table */}
        <PixelCard className="border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-primary/5 border-b-2 border-border">
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Ticket</th>
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Participant</th>
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Details</th>
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Amount</th>
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Date</th>
                  <th className="p-4 text-[10px] text-muted-foreground uppercase tracking-widest font-pixel">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                <AnimatePresence>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-muted-foreground animate-pulse">Loading participant registry...</td>
                    </tr>
                  ) : filteredRegistrations?.map((reg) => (
                    <motion.tr 
                      key={reg.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-primary/5 transition-colors group"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <TicketIcon className="w-4 h-4 text-primary" />
                          <span className="font-mono text-xs font-bold text-primary">{reg.ticketId}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm font-bold uppercase">{reg.participantName}</p>
                        <p className="text-[8px] text-muted-foreground">{reg.email}</p>
                      </td>
                      <td className="p-4">
                        <p className="text-[10px] text-muted-foreground uppercase">
                          {reg.participantBranch} • {reg.participantYear}th Year
                        </p>
                        <p className="text-[8px] text-accent uppercase font-bold">{reg.rollNumber}</p>
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-mono font-bold text-green-500">₹{reg.finalAmount}</span>
                      </td>
                      <td className="p-4">
                        <p className="text-[8px] text-muted-foreground uppercase">
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4 text-right">
                        <a 
                          href={`/ticket/${reg.ticketId}`}
                          target="_blank"
                          className="p-2 hover:bg-primary/20 rounded inline-block transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-primary" />
                        </a>
                      </td>
                    </motion.tr>
                  ))}
                  {!isLoading && filteredRegistrations?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-muted-foreground uppercase">No participants found matching your scanner</td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </PixelCard>
      </main>
    </div>
  );
}
