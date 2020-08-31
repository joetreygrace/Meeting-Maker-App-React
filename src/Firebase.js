import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAednmu8as0i86RfMLzKdy0zQMhwzol9mA",
  authDomain: "react-calendar-defe7.firebaseapp.com",
  databaseURL: "https://react-calendar-defe7.firebaseio.com",
  projectId: "react-calendar-defe7",
  storageBucket: "react-calendar-defe7.appspot.com",
  messagingSenderId: "389222148792",
  appId: "1:389222148792:web:5a9e86ab3fba710339624d",
  measurementId: "G-HV2QML8VH9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
