import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_AUTH_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_AUTH_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_AUTH_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_AUTH_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_AUTH_APP_ID
};

firebase.initializeApp(firebaseConfig);

export default firebase
