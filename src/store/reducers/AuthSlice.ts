import {IUser} from "../../models/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authLogin, checkAuth, logout} from "./ActionCreator";
import {AuthResponse} from "../../models/response/authResponse";

interface UserState {
    user: IUser
    isLoading: boolean
    error: string
    isAuth: boolean
}

const initialState: UserState = {
    user: {} as IUser,
    isLoading: false,
    error: '',
    isAuth: false
}

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {

    },
    extraReducers: {
        [authLogin.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
            state.user = action.payload.user
        },
        [authLogin.pending.type]: (state) => {
            state.isLoading = true
        },
        [authLogin.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [checkAuth.fulfilled.type]: (state, action: PayloadAction<AuthResponse>) => {
            state.isLoading = false
            state.error = ''
            state.isAuth = true
            state.user = action.payload.user
        },
        [checkAuth.pending.type]: (state) => {
            state.isLoading = true
        },
        [checkAuth.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [logout.fulfilled.type]: (state) => {
            state.isLoading = false
            state.error = ''
            state.isAuth = false
            state.user = {} as IUser
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true
        },
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default authSlice.reducer