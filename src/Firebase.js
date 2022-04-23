import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAlXj0MxHrhy29PPWWa5_GE4reazvpdQ8c",
  authDomain: "react-spas-e15f6.firebaseapp.com",
  databaseURL: "https://react-spas-e15f6-default-rtdb.firebaseio.com",
  projectId: "react-spas-e15f6",
  storageBucket: "react-spas-e15f6.appspot.com",
  messagingSenderId: "209903068677",
  appId: "1:209903068677:web:c75882678eee2479141e6c",
  measurementId: "G-R35HJT50V2",
};

// Initialize Firebase
firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
