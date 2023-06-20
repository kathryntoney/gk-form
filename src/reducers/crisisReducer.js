
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
        default:
            return state;
    }
}

export default crisisReducer