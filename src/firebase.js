import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    // collection,
    // getDocs,
    // addDoc,
    // deleteDoc,
    // doc
} from 'firebase/firestore'

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

// const colRef = collection(db, 'clients') // collection reference

// // display clients
// getDocs(colRef).then((snapshot) => {
//     // console.log(snapshot.docs)
//     let clients = []
//     snapshot.docs.forEach((doc) => {
//         clients.push({ ...doc.data(), id: doc.id })
//     }
//     )
//     console.log(clients)
// }
// )

// // adding docs
// const addNewClient = (e) => {
//     e.preventDefault()
//     addDoc(colRef, {
//         firstName: e.target.value,
//         lastName: e.target.value,
//         email: e.target.value
//     })
//         .then(() => {

//         }
//         )
// }

// const deleteClient = (e) => {
  
// }

