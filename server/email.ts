import nodemailer from 'nodemailer';
import type { Registration } from '@shared/schema';

// Create reusable transporter for Gmail
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    }
  });
};

interface EventInfo {
  id: string;
  title: string;
  date: string;
  registrationFee: number;
}

export async function sendRegistrationEmail(
  registration: Registration,
  events: EventInfo[]
): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;

  console.log('--- Email Setup Status ---');
  console.log('GMAIL_USER:', gmailUser ? 'CONFIGURED' : 'MISSING');
  console.log('GMAIL_APP_PASSWORD:', gmailPassword ? 'CONFIGURED' : 'MISSING');
  console.log('-------------------------');

  if (!gmailUser || !gmailPassword) {
    console.log('⚠️ Gmail not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD in .env');
    return false;
  }

  try {
    console.log(`📨 Attempting to send email to: ${registration.email}`);
    const transporter = createTransporter();

    // Test transporter
    await transporter.verify();
    console.log('✅ SMTP Transporter verified successfully.');

    // Generate QR code URL for ticket verification
    const appUrl = process.env.APP_URL || 'http://localhost:5000';
    const ticketUrl = `${appUrl}/ticket/${registration.ticketId}`;

    // Extract base64 part of QR code for CID attachment
    // reg.qrCode typical format: "data:image/png;base64,iVB0..."
    const qrBase64 = registration.qrCode?.split(',')[1] || '';

    // Create events table HTML
    const eventsTableRows = events.map((event, index) => `
      <tr style="border-bottom: 1px solid #333;">
        <td style="padding: 12px; color: #00e5ff; font-family: 'Courier New', monospace;">${index + 1}</td>
        <td style="padding: 12px; color: #fff;">${event.title}</td>
        <td style="padding: 12px; color: #aaa;">${event.date}</td>
        <td style="padding: 12px; color: #00ff88;">₹${event.registrationFee}</td>
      </tr>
    `).join('');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    @font-face {
      font-family: 'Courier Prime';
      src: url('https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap');
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Courier New', Courier, monospace;">
  <div style="max-width: 600px; margin: 20px auto; padding: 0; background-color: #0d0d0d; border: 4px solid #333; box-shadow: 0 0 50px rgba(0, 229, 255, 0.1);">
    
    <!-- Header Area -->
    <div style="background-color: #111; padding: 40px 20px; text-align: center; border-bottom: 4px solid #00e5ff; position: relative; overflow: hidden;">
      <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.1; background-image: radial-gradient(#00e5ff 1px, transparent 1px); background-size: 20px 20px;"></div>
      <h1 style="margin: 0; font-size: 42px; color: #00e5ff; text-transform: uppercase; letter-spacing: 4px; text-shadow: 0 0 15px rgba(0, 229, 255, 0.5);">
        yoUR FEST 2026
      </h1>
      <p style="margin: 10px 0 0; color: #ff00ff; font-size: 12px; letter-spacing: 2px; font-weight: bold;">[ SYSTEM: REGISTRATION CONFIRMED ]</p>
    </div>
    
    <!-- Main Content -->
    <div style="padding: 40px 30px; background: linear-gradient(to bottom, #0d0d0d, #111);">
      <p style="color: #fff; font-size: 16px; line-height: 1.6; margin-bottom: 25px;">
        GREETINGS <span style="color: #00e5ff; font-weight: bold;">${registration.participantName}</span>,
      </p>
      
      <p style="color: #888; font-size: 14px; line-height: 1.6;">
        Your digital entry permit for <span style="color: #fff;">yoUR Fest 2026</span> has been generated. 
        Please keep this confirmation for your records.
      </p>
      
      <!-- Virtual Ticket Card -->
      <div style="margin: 40px 0; border: 2px solid #00e5ff; background-color: #000; padding: 30px; border-radius: 4px; border-style: double;">
        <div style="text-align: center; margin-bottom: 25px; border-bottom: 1px dashed #333; padding-bottom: 20px;">
          <p style="color: #666; font-size: 10px; margin: 0 0 5px; letter-spacing: 2px;">PERMIT IDENTIFIER</p>
          <h2 style="color: #00ff88; font-size: 36px; margin: 0; letter-spacing: 5px;">${registration.ticketId}</h2>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <img src="cid:ticket-qr" alt="QR Code" style="width: 180px; height: 180px; border: 2px solid #00e5ff; padding: 10px; background-color: #fff;"/>
          <p style="color: #00e5ff; font-size: 10px; margin-top: 15px; letter-spacing: 1px;">SCAN AT ENTRANCE TERMINAL</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #444; font-size: 11px; padding: 10px 0; border-top: 1px solid #222;">ENTITY</td>
            <td style="color: #fff; font-size: 12px; padding: 10px 0; text-align: right; border-top: 1px solid #222;">${registration.participantName}</td>
          </tr>
          <tr>
            <td style="color: #444; font-size: 11px; padding: 10px 0; border-top: 1px solid #222;">INSTITUTION</td>
            <td style="color: #fff; font-size: 12px; padding: 10px 0; text-align: right; border-top: 1px solid #222;">${registration.college || 'N/A'}</td>
          </tr>
        </table>
      </div>
      
      <!-- Alert Box -->
      <div style="border: 1px solid #ff4de6; background-color: rgba(255, 77, 230, 0.05); padding: 25px; border-left: 10px solid #ff4de6;">
        <h4 style="color: #ff4de6; margin: 0 0 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">⚠️ TEMPORARY PERMIT NOTICE</h4>
        <p style="color: #ccc; margin: 0; font-size: 13px; line-height: 1.6;">
          This digital permit is <span style="color: #fff; font-weight: bold;">TEMPORARY</span>. 
          Present this at the <span style="color: #00e5ff;">Registration Desk (U-Block, Ground Floor)</span> to validate your entry and collect your Pass.
        </p>
      </div>
      
      <div style="margin-top: 40px; text-align: center;">
        <a href="${ticketUrl}" style="display: inline-block; background-color: #00e5ff; color: #000; padding: 15px 30px; text-decoration: none; font-weight: bold; font-size: 12px; letter-spacing: 1px; border-radius: 2px;">
          ACCESS ONLINE TERMINAL
        </a>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="background-color: #111; padding: 30px; text-align: center; border-top: 1px solid #222;">
      <p style="color: #555; font-size: 10px; margin: 0; line-height: 1.8;">
        USHA RAMA COLLEGE OF ENGINEERING AND TECHNOLOGY<br/>
        TELAPROLU, ANDHRA PRADESH • JAN 23-24, 2026
      </p>
    </div>
  </div>
</body>
</html>
    `;

    const mailOptions = {
      from: `"yoUR Fest 2026" <${gmailUser}>`,
      to: registration.email,
      subject: `🎟️ Ticket Issued - yoUR Fest 2026 | ID: ${registration.ticketId}`,
      html: htmlContent,
      attachments: [
        {
          filename: 'qr-code.png',
          content: Buffer.from(qrBase64, 'base64'),
          cid: 'ticket-qr' // cid to be used in img tag
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Registration confirmation email sent to ${registration.email}`);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send registration email:', error);
    if (error.code === 'EAUTH') {
      console.error('👉 AUTHENTICATION ERROR: Please check your GMAIL_APP_PASSWORD and GMAIL_USER.');
    } else if (error.code === 'ESOCKET') {
      console.error('👉 NETWORK ERROR: Could not connect to Gmail SMTP servers.');
    }
    return false;
  }
}
