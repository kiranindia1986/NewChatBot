import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, getDocs } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrRqf4itRflVwInZnvfeQbvxMT2tNDor0",
    authDomain: "vida-uat.firebaseapp.com",
    projectId: "vida-uat",
    storageBucket: "vida-uat.appspot.com",
    messagingSenderId: "894323374349",
    appId: "1:894323374349:web:9fd587959e24360adb5844",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
