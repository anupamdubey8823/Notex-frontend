import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB_pE7YD5766ZtDmA-rzm77LKaqNTyKtO0",
    authDomain: "notex-f28b4.firebaseapp.com",
    projectId: "notex-f28b4",
    storageBucket: "notex-f28b4.appspot.com",
    messagingSenderId: "189881432216",
    appId: "1:189881432216:web:6de1f20df3f365ea31f8ed"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();

export { provider };
export default firebaseApp;

