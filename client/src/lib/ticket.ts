import QRCode from 'qrcode';

/**
 * Generate a unique ticket ID in format: YF26-XXXXX
 */
export function generateTicketId(registrationId: number): string {
    const paddedId = String(registrationId).padStart(5, '0');
    return `YF26-${paddedId}`;
}

/**
 * Generate QR code as Data URL (base64)
 */
export async function generateQRCode(ticketId: string): Promise<string> {
    // In serverless mode, we use the current window location
    const appUrl = window.location.origin;
    const ticketUrl = `${appUrl}/ticket/${ticketId}`;

    try {
        const qrDataUrl = await QRCode.toDataURL(ticketUrl, {
            width: 300,
            margin: 2,
            color: {
                dark: '#00e5ff',   // Cyan QR code
                light: '#0a0a0a'   // Dark background
            },
            errorCorrectionLevel: 'M'
        });
        return qrDataUrl;
    } catch (error) {
        console.error('Failed to generate QR code:', error);
        throw error;
    }
}

/**
 * Calculate pricing based on "Buy 2 Get 1 Free" offer
 */
export function calculatePricing(eventCount: number, feePerEvent: number = 100): {
    totalEvents: number;
    freeEvents: number;
    originalAmount: number;
    discountAmount: number;
    finalAmount: number;
} {
    const totalEvents = eventCount;
    const freeEvents = Math.floor(totalEvents / 3);
    const paidEvents = totalEvents - freeEvents;

    const originalAmount = totalEvents * feePerEvent;
    const finalAmount = paidEvents * feePerEvent;
    const discountAmount = originalAmount - finalAmount;

    return {
        totalEvents,
        freeEvents,
        originalAmount,
        discountAmount,
        finalAmount
    };
}
