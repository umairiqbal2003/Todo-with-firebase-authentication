// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import  {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIlIRmIq3Up_74sDjzV0gu-GppiMEBO-U",
  authDomain: "todo-with-firebase-d80c6.firebaseapp.com",
  projectId: "todo-with-firebase-d80c6",
  storageBucket: "todo-with-firebase-d80c6.appspot.com",
  messagingSenderId: "318423373966",
  appId: "1:318423373966:web:2f9431b7a149ac7d0391df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const auth = getAuth(app);

export {db , auth};