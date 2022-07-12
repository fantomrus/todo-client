import UserService from "../../service/userService";
import {createAsyncThunk} from "@reduxjs/toolkit";
import AuthService from "../../service/authService";
import TodoService from "../../service/todoService";
import axios from "axios";
import {API_URL} from "../../API";
import {AuthResponse} from "../../models/response/authResponse";
import {ITodoFields} from "../../models/ITodo";

export const fetchUsers = createAsyncThunk(
    'user/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            const response = await UserService.fetchUsers()
            return response.data
        } catch (e) {
            return rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)
export const fetchUsersTodo = createAsyncThunk(
    'user/fetchUsersTodo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await UserService.fetchUsersTodo()
            return response.data
        } catch (e) {
            return rejectWithValue("Не удалось загрузить пользователей")
        }
    }
)
export const authLogin = createAsyncThunk(
    'user/login',
    async (params: Record<string, string>, {rejectWithValue}) => {
        try {
            const {login, password} = params
            const response = await AuthService.login(login, password)
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)
export const logout = createAsyncThunk(
    'user/logout',
    async (_, {rejectWithValue}) => {
        try {
            await AuthService.logout()
            localStorage.removeItem('token')
            return true
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)
export const checkAuth = createAsyncThunk(
    'user/checkAuth',
    async (_, {rejectWithValue}) => {
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
            localStorage.setItem("token", response.data.accessToken)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)
export const fetchTodo = createAsyncThunk(
    'todo/fetchAllTodo',
    async (_, {rejectWithValue}) => {
        try {
            const response = await TodoService.fetchTodo()
            return response.data.sort((item, acc) => {
                // @ts-ignore
                return new Date(acc.updatedAt) - new Date(item.updatedAt)
            })
        } catch (e) {
            return rejectWithValue("Не удалось загрузить Todo")
        }
    }
)
export const filterTodo = createAsyncThunk(
    'todo/filterTodo',
    async (params: Record<string, string>, {rejectWithValue}) => {
        try {
            const {user, date} = params
            const response = await TodoService.filterTodo(user, date)
            return response.data.sort((item, acc) => {
                // @ts-ignore
                return new Date(acc.updatedAt) - new Date(item.updatedAt)
            })
        } catch (e) {
            return rejectWithValue("Не удалось загрузить Todo")
        }
    }
)
export const fetchTodoPriority = createAsyncThunk(
    'todo/fetchAllPriority',
    async (_, {rejectWithValue}) => {
        try {
            const response = await TodoService.fetchPriority()
            return response.data
        } catch (e) {
            return rejectWithValue("Не удалось загрузить приоритеты задач")
        }
    }
)
export const fetchTodoStatus = createAsyncThunk(
    'todo/fetchAllStatus',
    async (_, {rejectWithValue}) => {
        try {
            const response = await TodoService.fetchStatus()
            return response.data
        } catch (e) {
            return rejectWithValue("Не удалось загрузить статусы задач")
        }
    }
)
export const newTodo = createAsyncThunk(
    'todo/newTodo',
    async (params: ITodoFields, {rejectWithValue}) => {
        try {
            const response = await TodoService.newTodo(params)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)
export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (params: ITodoFields, {rejectWithValue}) => {
        try {
            const response = await TodoService.updateTodo(params)
            return response.data
        } catch (e: any) {
            return rejectWithValue(e.response?.data?.message)
        }
    }
)