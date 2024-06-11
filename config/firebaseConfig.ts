// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAESKjLwW1ZCjaANDtBp-J6MKV1ruytX8w",
  authDomain: "fir-ebuddy.firebaseapp.com",
  projectId: "fir-ebuddy",
  storageBucket: "fir-ebuddy.appspot.com",
  messagingSenderId: "558582811447",
  appId: "1:558582811447:web:d11a87427d2eb58cfb28b2",
  measurementId: "G-TNNNR8WWTN"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(firebaseApp);

export default firebaseApp;