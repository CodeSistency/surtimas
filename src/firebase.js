// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhIfR4dhC_a87GmjBiYf62HcaE1WEgmEk",
  authDomain: "surtimas-18cd7.firebaseapp.com",
  projectId: "surtimas-18cd7",
  storageBucket: "surtimas-18cd7.appspot.com",
  messagingSenderId: "839405364149",
  appId: "1:839405364149:web:c2b32d32a1823e541beffc",
  measurementId: "G-JWH5ZPSENC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app