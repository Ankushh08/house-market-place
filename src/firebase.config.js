// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHECJm9lLVpyvgevoiJ8GjM_HbXDl3kHY",
  authDomain: "house-marketplace-app-16ab6.firebaseapp.com",
  projectId: "house-marketplace-app-16ab6",
  storageBucket: "house-marketplace-app-16ab6.appspot.com",
  messagingSenderId: "406133222148",
  appId: "1:406133222148:web:b7a5455ffb1b5d21a67e51"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore(); 