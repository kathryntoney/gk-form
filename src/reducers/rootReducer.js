import { combineReducers } from 'redux'
import newClientReducer from '../reducers/newClientReducer'
import crisisReducer from '../reducers/crisisReducer'

const rootReducer = combineReducers({
    clients: newClientReducer,
    crisis: crisisReducer
})

export default rootReducer