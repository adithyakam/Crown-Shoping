import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCVcd_JuxPK0lL6R4PbQHYsR3BzBarucpQ",
  authDomain: "crown-db-3fe4b.firebaseapp.com",
  databaseURL: "https://crown-db-3fe4b.firebaseio.com",
  projectId: "crown-db-3fe4b",
  storageBucket: "crown-db-3fe4b.appspot.com",
  messagingSenderId: "548550657878",
  appId: "1:548550657878:web:b881e86330af06691778f7",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
