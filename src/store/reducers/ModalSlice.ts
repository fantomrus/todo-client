import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface ModalState {
    isOpen: boolean,
    todoId: string
}

const initialState: ModalState = {
    isOpen: false,
    todoId: ''
}

export const modalSlice = createSlice({
    name: 'Modal',
    initialState,
    reducers: {
        setIsOpenModal(state, action: PayloadAction<boolean>) {
            state.isOpen = action.payload;
        },
        setTodoId(state, action: PayloadAction<string>) {
            state.todoId = action.payload;
        }
    }
})
export default modalSlice.reducer