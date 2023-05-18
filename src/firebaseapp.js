import * as firebase from "firebase";

// Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyAtGWymJ-hrLNDrdNHWEi72ZZY2BTJgKwI",
    authDomain: "ecommerce-139ad.firebaseapp.com",
    databaseURL:"http://ecommerce-139ad.firebaseapp.com",
    projectId: "ecommerce-139ad",
    storageBucket: "ecommerce-139ad.appspot.com",
    messagingSenderId: "378766816642",
    appId: "1:378766816642:web:0ff4c1cba84ab628930b9b"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 

  export const auth = firebase.auth(); //for authenticate user like login and register

  export const googleAuthProvider = new firebase.auth.GoogleAuthProvider() //it helps to user login through google