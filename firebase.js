// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAwflKDcjeUpMXlCvTfGMX7Vy8s7doUeZ8",
    authDomain: "accelerometer-speed-pwa.firebaseapp.com",
    projectId: "accelerometer-speed-pwa",
    storageBucket: "accelerometer-speed-pwa.appspot.com",
    messagingSenderId: "1007759172303",
    appId: "1:1007759172303:web:191775421beaea89ad8dba",
    measurementId: "G-63M81Y5FH0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
