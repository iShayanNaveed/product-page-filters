import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyANPP_kb9Yfha7NzFoUAn0WlXzSroEkv5s",
  authDomain: "product-page-d6c74.firebaseapp.com",
  projectId: "product-page-d6c74",
  storageBucket: "product-page-d6c74.firebasestorage.app",
  messagingSenderId: "702692634067",
  appId: "1:702692634067:web:7d8787a7fb7d2968785326",
  measurementId: "G-L0W454Z0XM",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
