
const newClientReducer = (state, action) => {
    console.log('inside new client reducer')
    if (state === undefined) {
        state = {
            clients: [],
            clientID: ''
        }
        console.log(state)
    }
    console.log(action.type)
    switch (action.type) {
        case "ADD_NEW_CLIENT":
            console.log('inside add_new_client reducer', action)
            return {
                ...state,
                clientID: action.data.clientID
            }
        default:
            return state;
    }
}

export default newClientReducer