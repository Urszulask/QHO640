// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDW9wwPhWVMfPwG9aKx_ltWrKpvKpbWLW0",
    authDomain: "estore-2673f.firebaseapp.com",
    projectId: "estore-2673f",
    storageBucket: "estore-2673f.appspot.com",
    messagingSenderId: "884720580966",
    appId: "1:884720580966:web:7e34d30b23ce16348c70a7"
    
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
