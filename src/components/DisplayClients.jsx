import { db } from '../firebase'
import { useState, useEffect } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import ClientItem from './ClientItem'

export default function DisplayClients() {
    const [clientList, setClientList] = useState([])
    const colRef = collection(db, 'clients')

    useEffect(() => {
        const getClientList = async () => {
            try {
                const data = await getDocs(colRef)
                console.log(data)
                const clientData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                setClientList(clientData)
            }
            catch (err) {
                console.log('error in getClientList: ', err)
            }
        }
        getClientList()
    }, [])

    return (
        <>
            < div >
                <ul>
                    <li>
                        {clientList.map(clientObj => {
                            return <ClientItem key={clientObj.id} clientObj={clientObj} />
                        })}
                    </li>
                </ul>
            </div >
        </>
    )
}
