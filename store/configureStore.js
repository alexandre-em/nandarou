import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import selectionnedReducer from './reducers/selectionnedReducer'

let reducers = combineReducers({
    selectionned: selectionnedReducer
})

const store = createStore(selectionnedReducer)
export default store