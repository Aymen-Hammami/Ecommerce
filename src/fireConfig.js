// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCSS0DFFeRiiagcRKY4mvxPAeQ3bbrbG8",
  authDomain: "ecommerce2-729f3.firebaseapp.com",
  projectId: "ecommerce2-729f3",
  storageBucket: "ecommerce2-729f3.appspot.com",
  messagingSenderId: "280758438025",
  appId: "1:280758438025:web:c44c2c1edaf22094e0de58",
  measurementId: "G-C4ERWRBFCV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireDB = getFirestore(app)


export default fireDB