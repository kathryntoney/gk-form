import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import rootReducer from './reducers/rootReducer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import CrisisSelection from './components/CrisisSelection'

const persistConfig = {
  key: 'root',
  storage: storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

let persistor = persistStore(store)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <Router>
          <Routes>
            <Route path='/' element={<App />} />
            <Route path='/crisis' element={<CrisisSelection />} />
          </Routes>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
