import { storage } from "./storage";

async function flush() {
    console.log("🌊 Starting database flush...");
    try {
        await storage.clearRegistrations();
        console.log("✅ Registrations cleared.");
        // We typically don't want to clear events/stalls if they are seed data, 
        // but the user asked to "flush the database", so I'll clear them too 
        // to be thorough, assuming they can be re-seeded or the user knows what they're doing.
        await storage.clearEvents();
        console.log("✅ Events cleared.");
        await storage.clearStalls();
        console.log("✅ Stalls cleared.");
        console.log("✨ Database flush complete.");
        process.exit(0);
    } catch (error) {
        console.error("❌ Flush failed:", error);
        process.exit(1);
    }
}

flush();
