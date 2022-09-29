import {applyMiddleware, createStore} from "redux";
import {combineReducer} from "./reducers/combineReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./sagas/root";

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    combineReducer,
    applyMiddleware(sagaMiddleware)
)

sagaMiddleware.run(rootSaga)

export default store

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
