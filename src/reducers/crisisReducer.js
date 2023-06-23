
const crisisReducer = (state, action) => {
    console.log('inside crisis reducer')
    if (state === undefined) {
        state = {
            crisisType: ''
        }
        console.log(state)
    }
    console.log('crisis reducer action: ', action.type)
    switch (action.type) {
        case "SET_CRISIS_TYPE":
            console.log('inside select crisis', action)
            return {
                ...state,
                clientID: action.data.clientID,
                crisis: action.data.crisis
            }
        case "SET_HOUSING_CRISIS_DETAILS":
            console.log('inside update crisis details', action)
            return {
                ...state,
                clientID: action.data.clientID,
                address: action.data.address
            }
        case "SET_ILLNESS_CRISIS_DETAILS":
            console.log('inside update crisis details', action)
            return {
                ...state,
                clientID: action.data.clientID,
                address: action.data.address
            }
        case "SET_FUNERAL_CRISIS_DETAILS":
            console.log('inside update crisis details', action)
            return {
                ...state,
                clientID: action.data.clientID,
                address: action.data.address
            }
        case "SET_SUBSTANCE_CRISIS_DETAILS":
            console.log('inside update crisis details', action)
            return {
                ...state,
                clientID: action.data.clientID,
                address: action.data.address
            }
        default:
            return state;
    }
}

export default crisisReducer