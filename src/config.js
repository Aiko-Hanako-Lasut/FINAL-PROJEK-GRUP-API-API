import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNziywKXZ6Y2OI7SD8Kbb3aYHdkagg0U4",
  authDomain: "platform-sharing-resep-makanan.firebaseapp.com",
  projectId: "platform-sharing-resep-makanan",
  storageBucket: "platform-sharing-resep-makanan.firebasestorage.app",
  messagingSenderId: "384828255568",
  appId: "1:384828255568:web:73b545ce66ecfe1c565055",
  measurementId: "G-C6300RBNRR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getFirestore(app);

export { database };