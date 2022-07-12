import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from './reducers/UserSlice'
import authReducer from './reducers/AuthSlice'
import todoReducer from './reducers/TodoSlice'
import ModalReducer from './reducers/ModalSlice'

const rootReducers = combineReducers({
    userReducer,
    authReducer,
    todoReducer,
    ModalReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducers
    })
}

export type RootState = ReturnType<typeof rootReducers>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']