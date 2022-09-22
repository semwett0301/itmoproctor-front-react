import {applyMiddleware, createStore} from "redux";
import {combineReducer} from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    combineReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store