import clients from '../data/clients'

const reducer = (state, action) => {
    if (state === undefined) {
        state = {
            clients: clients,
            count: clients.length
        }
    }
    switch (action.type) {
        case "ADD_NEW_CLIENT":
            return {
                ...state,
                clients: state.clients.concat(action.data),
                count: state.count + action.data
            }
        default:
            return state;
    }
}

export default reducer