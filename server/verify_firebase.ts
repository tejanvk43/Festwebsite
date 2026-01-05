import { storage } from "./storage";
import { sendRegistrationEmail } from "./email";

async function verify() {
    console.log("🔍 Fetching registrations from Firebase...");
    try {
        const registrations = await storage.getRegistrations();
        console.log(`📊 Found ${registrations.length} registrations.`);

        if (registrations.length > 0) {
            const lastReg = registrations[registrations.length - 1];
            console.log("📝 Last Registration Details:");
            console.log(`- Name: ${lastReg.participantName}`);
            console.log(`- Email: ${lastReg.email}`);
            console.log(`- Ticket: ${lastReg.ticketId}`);

            console.log("\n📧 Testing email delivery for this registration...");
            const success = await sendRegistrationEmail(lastReg, []);
            console.log(success ? "✅ Test email sent successfully!" : "❌ Test email failed.");
        } else {
            console.log("⚠️ No registrations found to test email with.");
        }
    } catch (err) {
        console.error("❌ Verification failed:", err);
    }
}

verify();
