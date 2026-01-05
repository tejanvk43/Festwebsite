import admin from "firebase-admin";

const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT;

if (serviceAccountVar) {
    try {
        const serviceAccount = JSON.parse(serviceAccountVar);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
        console.log("✅ Firebase Admin initialized via environment variable.");
    } catch (err) {
        console.error("❌ Failed to parse FIREBASE_SERVICE_ACCOUNT env var:", err);
    }
} else {
    console.log("⚠️ FIREBASE_SERVICE_ACCOUNT not found. Firebase will not be initialized.");
    console.log("👉 Please set FIREBASE_SERVICE_ACCOUNT in your .env with the JSON content of your service account key.");
}

export const db = admin.apps.length ? admin.firestore() : null;
export default admin;
