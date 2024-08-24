import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getAuth} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDpQQHm1YiivJc4aGmDlXXsWvSkT5_bUro",
    authDomain: "archvizapp.firebaseapp.com",
    projectId: "archvizapp",
    storageBucket: "archvizapp.appspot.com",
    messagingSenderId: "140203052639",
    appId: "1:140203052639:web:0b71b97fdfdea3ee3d15ea",
    measurementId: "G-NS6P8EDMZB"
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
