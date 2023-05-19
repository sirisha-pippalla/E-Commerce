// import * as firebase from "firebase";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbJaGXie19gnvKKzAUuVZSS1ec02OOAUw",
  authDomain: "e-commerce-fad83.firebaseapp.com",
  databaseURL: "http://e-commerce-fad83.firebaseapp.com",
  projectId: "e-commerce-fad83",
  storageBucket: "e-commerce-fad83.appspot.com",
  messagingSenderId: "86921170385",
  appId: "1:86921170385:web:a883f3db6d8b6f4af564f0",
  measurementId: "G-QWJZT3M8V1",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth(); //for authenticate user like login and register

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider(); //it helps to user login through google



 // apiKey: "AIzaSyAtGWymJ-hrLNDrdNHWEi72ZZY2BTJgKwI",
  // authDomain: "ecommerce-139ad.firebaseapp.com",
  // databaseURL:"http://ecommerce-139ad.firebaseapp.com",
  // projectId: "ecommerce-139ad",
  // storageBucket: "ecommerce-139ad.appspot.com",
  // messagingSenderId: "378766816642",
  // appId: "1:378766816642:web:0ff4c1cba84ab628930b9b"