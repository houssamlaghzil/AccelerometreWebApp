import firebase from "firebase/compat";

function writeUserData() {
// iniotialiser real-time database de firebase
    const firebaseConfig = {
        apiKey: "AIzaSyAwflKDcjeUpMXlCvTfGMX7Vy8s7doUeZ8",
        authDomain: "accelerometer-speed-pwa.firebaseapp.com",
        databaseURL: "https://accelerometer-speed-pwa-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "accelerometer-speed-pwa",
        storageBucket: "accelerometer-speed-pwa.appspot.com",
        messagingSenderId: "1007759172303",
        appId: "1:1007759172303:web:191775421beaea89ad8dba",
        measurementId: "G-63M81Y5FH0"
    };
// Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
// lire la real-time database de firebase et afficher toute les données
    database.ref('users')
    console.log("////////////////////////////////////////");
    console.log(JSON.stringify(database.ref('users'), null, 3));
}

export default writeUserData;
