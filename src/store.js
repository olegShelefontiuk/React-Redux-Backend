import { createStore, combineReducers, applyMiddleware } from "redux";
import { todos} from "./todos/reducers";
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension";
import { persistReducer } from "redux-persist"
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";

const reducer = { todos }

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const rootReducer = combineReducers(reducer)

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const configureStore = () => createStore(
    persistedReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)