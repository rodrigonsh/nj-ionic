// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getMessaging } from "firebase/messaging";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApvjOMV2JQTkt9TTICW37BdhftEbCSFwE",
  authDomain: "nova-jerusalem-alpha.firebaseapp.com",
  projectId: "nova-jerusalem-alpha",
  storageBucket: "nova-jerusalem-alpha.appspot.com",
  messagingSenderId: "928157165795",
  appId: "1:928157165795:web:6d8da6e0789607448c7dd6",
  measurementId: "G-1KTD49DQ9R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
auth.languageCode = 'pt'

// get fcm messaging
const messaging = getMessaging(app);


export { auth, messaging, analytics }