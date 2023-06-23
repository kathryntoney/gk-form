

export const setCrisisType = async (clientID, crisisType) => {
    return {
        type: "SET_CRISIS_TYPE",
        data: {
            clientID,
            crisisType
        }
    }
}

export const setHousingCrisisDetails = (clientID, crisisType, statement, timeframe, crisisDate, cause, currentHousing, address) => {
    console.log(clientID)
    return {
        type: 'SET_HOUSING_CRISIS_DETAILS',
        data: {
            clientID,
            crisisType,
            statement,
            timeframe,
            crisisDate,
            cause,
            currentHousing,
            address
        }
    }
}

export const setIllnessCrisisDetails = (clientID, crisisType, statement, diagnosis, crisisDate, address) => {
    console.log(clientID)
    return {
        type: 'SET_ILLNESS_CRISIS_DETAILS',
        data: {
            clientID,
            crisisType,
            statement,
            diagnosis,
            crisisDate,
            address
        }
    }
}

export const setFuneralCrisisDetails = (clientID, crisisType, statement, diagnosis, crisisDate, address) => {
    console.log(clientID)
    return {
        type: 'SET_FUNERAL_CRISIS_DETAILS',
        data: {
            clientID,
            crisisType,
            statement,
            timeframe,
            crisisDate,
            address
        }
    }
}

export const setSubstanceCrisisDetails = (clientID, crisisType, statement, treatment, crisisDate, address) => {
    console.log(clientID)
    return {
        type: 'SET_SUBSTANCE_CRISIS_DETAILS',
        data: {
            clientID,
            crisisType,
            statement,
            treatment,
            crisisDate,
            address
        }
    }
}