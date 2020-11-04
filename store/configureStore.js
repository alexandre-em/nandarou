import AsyncStorage from '@react-native-community/async-storage';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import selectionnedReducer from './reducers/selectionnedReducer'

let reducers = combineReducers({
    selectionned: selectionnedReducer
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['selectionnedReducer']
}

const persistedReducer = persistReducer(persistConfig, selectionnedReducer)

const store = createStore(persistedReducer)

const persistor = persistStore(store)

export { store, persistor }