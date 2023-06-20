import { doc, collection, updateDoc } from 'firebase/firestore'

export const setCrisisType = async (clientID, crisisType) => {
    // const clientsRef = db.collection('clients').doc(clientID)
    return {
        type: "SET_CRISIS_TYPE",
        data: {
            clientID,
            crisisType
        }
    }
}

export const setCrisisDetails = (clientID, statement, timeframe, crisisDate, cause, currentHousing) => {
    console.log(clientID)
    return {
        type: 'SET_CRISIS_DETAILS',
        data: {
            statement,
            timeframe,
            crisisDate,
            cause,
            currentHousing
        }
    }
}
