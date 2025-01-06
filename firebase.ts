// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyClYpDCQcDoZGFcp54p_RkUnANH1VJCmvc",
  authDomain: "arab-master.firebaseapp.com",
  projectId: "arab-master",
  storageBucket: "arab-master.appspot.com",
  messagingSenderId: "189734035985",
  appId: "1:189734035985:web:83151ee7a06799d74687b0",
  measurementId: "G-HX7EDQDP0C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
