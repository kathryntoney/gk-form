import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAOWYw941NdMUp1Nx66l181EsmFWZ6IBOI",
    authDomain: "gk-form.firebaseapp.com",
    projectId: "gk-form",
    storageBucket: "gk-form.appspot.com",
    messagingSenderId: "694128545280",
    appId: "1:694128545280:web:cf74ba980f8abf9c79d2e5"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)

