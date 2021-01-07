import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyClIiKC1QpyZKhix4w5wpM4jyWKKKzzY2M",
    authDomain: "sicramproyect.firebaseapp.com",
    projectId: "sicramproyect",
    storageBucket: "sicramproyect.appspot.com",
    messagingSenderId: "763653846820",
    appId: "1:763653846820:web:87984abfc1def13e55e5b1",
    measurementId: "G-V8C771C3FF"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const db = firebase.firestore()

export {
    db
}