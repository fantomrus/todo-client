import {ITodo} from "../../models/ITodo";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {fetchTodo, fetchTodoPriority, fetchTodoStatus, filterTodo, newTodo, updateTodo} from "./ActionCreator";
import {IPriority} from "../../models/IPriority";
import {IStatus} from "../../models/response/IStatus";

interface TodoState {
    todo: ITodo[]
    isLoading: boolean
    error: string
    priority: IPriority[]
    status: IStatus[]
}

const initialState: TodoState = {
    todo: [],
    isLoading: false,
    error: '',
    priority: [],
    status: []
}

export const todoSlice = createSlice({
    name: 'Todo',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchTodo.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
            state.isLoading = false
            state.error = ''
            state.todo = action.payload
        },
        [fetchTodo.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchTodoPriority.fulfilled.type]: (state, action: PayloadAction<IPriority[]>) => {
            state.isLoading = false
            state.error = ''
            state.priority = action.payload
        },
        [fetchTodoPriority.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchTodoPriority.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [fetchTodoStatus.fulfilled.type]: (state, action: PayloadAction<IStatus[]>) => {
            state.isLoading = false
            state.error = ''
            state.status = action.payload
        },
        [fetchTodoStatus.pending.type]: (state) => {
            state.isLoading = true
        },
        [fetchTodoStatus.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [newTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
            state.isLoading = false
            state.error = ''
            state.todo = [action.payload, ...state.todo]
        },
        [newTodo.pending.type]: (state) => {
            state.isLoading = true
        },
        [newTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [updateTodo.fulfilled.type]: (state) => {
            state.isLoading = false
            state.error = ''
        },
        [updateTodo.pending.type]: (state) => {
            state.isLoading = true
        },
        [updateTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
        [filterTodo.fulfilled.type]: (state, action: PayloadAction<ITodo[]>) => {
            state.isLoading = false
            state.error = ''
            state.todo = action.payload
        },
        [filterTodo.pending.type]: (state) => {
            state.isLoading = true
        },
        [filterTodo.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    }
})
export default todoSlice.reducer