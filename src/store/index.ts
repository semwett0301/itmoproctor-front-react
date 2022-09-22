import {applyMiddleware, createStore} from "redux";
import {combineReducer} from "./reducers";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    combineReducer,
    applyMiddleware(sagaMiddleware)
)

export default store