
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAQ1aHjg9HmIs7EsCvyKAldFeqAxtWKLcw",
  authDomain: "miniblog-ed1e1.firebaseapp.com",
  projectId: "miniblog-ed1e1",
  storageBucket: "miniblog-ed1e1.appspot.com",
  messagingSenderId: "267396774128",
  appId: "1:267396774128:web:b4fd280630ebda27b42a35"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {db};