// Import the functions you need from the SDKs you need
import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "personal-project-ecc9c.firebaseapp.com",
  databaseURL: "https://personal-project-ecc9c.firebaseio.com",
  projectId: "personal-project-ecc9c",


  appId: process.env.REACT_APP_APP_ID,
  // measurementId: "G-Y0CVZQE1JT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)




