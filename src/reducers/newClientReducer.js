import { collection } from 'firebase/firestore'
import { db } from '../firebase'


const reducer = (state, action) => {
    if (state === undefined) {
        state = {
            clients: [],
            clientID: ''
        }
    }
    switch (action.type) {
        case "ADD_NEW_CLIENT":
            const {
                firstName,
                lastName,
                email,
                phone,
                language,
                pronouns,
                referName,
                referEmail,
                referPhone,
                informed
            } = action;
            const newClient = {
                firstName,
                lastName,
                email,
                phone,
                language,
                pronouns,
                referName,
                referEmail,
                referPhone,
                informed
            };
            addDoc(collection(db, 'clients'), newClient)
                .then((docRef) => {
                    console.log('document written with id: ', docRef.id)
                })
                .catch((error) => {
                    console.log('error adding document: ', error)
                })
            return state;
        default:
            return state;
    }
}

export default reducer