// Imports
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { getAnalytics } from "firebase/analytics"
// Documentation for Firebase: https://firebase.google.com/docs/web/setup , https://firebase.google.com/docs/web/setup#available-libraries

// Credentials for Firebase from .env file
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig) // Initialize Firebase
export const db = getFirestore(app) // Initialize Firestore database
export const auth = getAuth(app) // Initialize Firebase Auth
export const provider = new GoogleAuthProvider() // Initialize Google Auth Provider
// const analytics = getAnalytics(app) // Initialize Firebase Analytics
