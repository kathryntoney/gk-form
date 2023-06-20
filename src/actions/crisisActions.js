export const setCrisisType = (clientID) => {
    console.log(clientID)
    return {
        type: "SET_CRISIS_TYPE",
        data: {
            crisisType: client.clientID.crisisType
        }
    }
}
