// const clients = [
//     {
//         id: crypto.randomUUID(),
//         firstName: 'Katie',
//         lastName: 'Toney',
//         email: 'kathryn.toney@gmail.com',
//         phone: '770-546-6265',
//         language: 'English',
//         pronouns: 'She/her/hers',
//         referName: '',
//         referEmail: '',
//         referPhone: '',
//         informed: ''
//     }
// ]

// export default clients

//* firebase setup

// import { db } from '../firebase'
// import { useState, useEffect } from 'react'
// import { getDocs, collection } from 'firebase/firestore'

// const [clientList, setClientList] = useState([])
// const colRef = collection(db, 'clients')

// useEffect(async () => {
//     const getClientList = () => {
//         try {
//             const data = await getDocs(colRef)
//             console.log(data)
//             const clientData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//             console.log(clientData)
//         }
//         catch (err) {
//             console.log('error in getClientList: ', err)
//         }
//     }
// }, [])


