const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

const gmailUser = functions.config().gmail.user;
const gmailPass = functions.config().gmail.pass;
const appUrl = functions.config().app.url || "https://technozolo-983e1.web.app";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: gmailUser,
        pass: gmailPass,
    },
});

exports.sendRegistrationEmail = functions.firestore
    .document("registrations/{ticketId}")
    .onCreate(async (snap, context) => {
        const registration = snap.data();
        const ticketId = context.params.ticketId;

        console.log(`📨 Processing email for Ticket: ${ticketId}`);

        // Fetch event details (optional but recommended for complete email)
        const eventIds = registration.eventIds || [];
        const events = [];
        for (const id of eventIds) {
            const eventDoc = await admin.firestore().collection("events").doc(id).get();
            if (eventDoc.exists) {
                events.push(eventDoc.data());
            }
        }

        const ticketUrl = `${appUrl}/ticket/${ticketId}`;
        const qrBase64 = registration.qrCode?.split(",")[1] || "";

        const htmlContent = `
      <!-- (Ported HTML content from server/email.ts) -->
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #0d0d0d; color: #fff;">
        <h1 style="color: #00e5ff;">yoUR FEST 2026</h1>
        <p>Registration Confirmed for <b>${registration.participantName}</b></p>
        <p>Your Ticket ID: <b>${ticketId}</b></p>
        <div style="margin: 20px 0;">
          <img src="cid:ticket-qr" width="200" style="border: 2px solid #00e5ff;"/>
        </div>
        <p>View your terminal: <a href="${ticketUrl}" style="color: #00e5ff;">${ticketUrl}</a></p>
      </div>
    `;

        const mailOptions = {
            from: `"yoUR Fest 2026" <${gmailUser}>`,
            to: registration.email,
            subject: `🎟️ Ticket Issued - yoUR Fest 2026 | ID: ${ticketId}`,
            html: htmlContent,
            attachments: [
                {
                    filename: "qr-code.png",
                    content: Buffer.from(qrBase64, "base64"),
                    cid: "ticket-qr",
                },
            ],
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log(`✅ Email sent to ${registration.email}`);
        } catch (error) {
            console.error("❌ Email failed:", error);
        }
    });
