

export const setCrisisType = async (clientID, crisisType) => {
    return {
        type: "SET_CRISIS_TYPE",
        data: {
            clientID,
            crisisType
        }
    }
}

export const setCrisisDetails = (clientID, statement, timeframe, crisisDate, cause, currentHousing, address) => {
    console.log(clientID)
    return {
        type: 'SET_CRISIS_DETAILS',
        data: {
            clientID,
            statement,
            timeframe,
            crisisDate,
            cause,
            currentHousing,
            address
        }
    }
}
