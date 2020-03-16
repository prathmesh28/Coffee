import firebase from "firebase";
const Config = {
  apiKey: "AIzaSyDnD6NNBFvNF6fo_yQRF7QZO_yQK6zrWA8",
  authDomain: "socialapp-218ab.firebaseapp.com",
  databaseURL: "https://socialapp-218ab.firebaseio.com",
  projectId: "socialapp-218ab",
  storageBucket: "socialapp-218ab.appspot.com",
  messagingSenderId: "404024590842",
  appId: "1:404024590842:web:632d2751296ca21c4fa443"
};
  // Initialize Firebase
const Firebase = firebase.initializeApp(Config);
export default Firebase;