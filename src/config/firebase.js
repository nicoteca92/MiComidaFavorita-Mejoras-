import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
 // Pegar configuración de Firebase Console
 apiKey: "AIzaSyDFXQ3FY1cfNF8JJVwV74ungbJXUjnTiNk",
 authDomain: "micomidafavorita-be7ac.firebaseapp.com",
 projectId: "micomidafavorita-be7ac",
 storageBucket: "micomidafavorita-be7ac.firebasestorage.app",
 messagingSenderId: "913074878404",
 appId: "1:913074878404:web:5c62ea437df308c3ce5691",
 measurementId: "G-8XWWBXRXBV"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);