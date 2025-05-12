import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// Using a temporary configuration to prevent auth/invalid-api-key error
const firebaseConfig = {
  apiKey: "AIzaSyDummyKeyForTemporaryUse123456789",
  authDomain: "dispatch-management-app.firebaseapp.com",
  projectId: "dispatch-management-app",
  storageBucket: "dispatch-management-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Handle Firebase errors
 */
export const handleFirebaseError = (error: any) => {
  console.error("Firebase error:", error);
  return {
    error: {
      message: error.message || "An unknown error occurred",
      code: error.code || "unknown",
    },
  };
};

export default app;
