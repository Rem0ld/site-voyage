/* eslint-disable unicorn/filename-case */
import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCuk5lVPhsPEkk5K7RKCoBdY5-28-yQOuY",
  authDomain: "site-voyage-development.firebaseapp.com",
  projectId: "site-voyage-development",
  storageBucket: "site-voyage-development.appspot.com",
  messagingSenderId: "346510143595",
  appId: "1:346510143595:web:6612d24ee70a12d9c1412e",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

export default auth;
