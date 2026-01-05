import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyA1E2OmByYUHxw6wQRVHAwGXUqo84L1atY",
    authDomain: "technozolo-983e1.firebaseapp.com",
    databaseURL: "https://technozolo-983e1-default-rtdb.firebaseio.com",
    projectId: "technozolo-983e1",
    storageBucket: "technozolo-983e1.firebasestorage.app",
    messagingSenderId: "378089035471",
    appId: "1:378089035471:web:8c0249eb4682ca46f309ba",
    measurementId: "G-B8XBPVY7RK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Analytics is optional and might throw if not in browser environment or blocked
let analytics = null;
if (typeof window !== 'undefined') {
    try {
        analytics = getAnalytics(app);
    } catch (err) {
        console.warn("Firebase Analytics failed to initialize:", err);
    }
}

export { analytics };
export default app;
