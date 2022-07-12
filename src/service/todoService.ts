import {AxiosResponse} from "axios";
import $api from "../API";
import {ITodo, ITodoFields} from "../models/ITodo";
import {IPriority} from "../models/IPriority";
import {IStatus} from "../models/response/IStatus";

export default class TodoService {
    static fetchTodo(): Promise<AxiosResponse<ITodo[]>> {
        return $api.get<ITodo[]>('/todo')
    }
    static filterTodo(user: string, date: string): Promise<AxiosResponse<ITodo[]>> {
        return $api.get<ITodo[]>(`/todo?user=${user}&date=${date}`)
    }
    static fetchPriority(): Promise<AxiosResponse<IPriority[]>> {
        return $api.get<IPriority[]>('/priority')
    }
    static fetchStatus(): Promise<AxiosResponse<IStatus[]>> {
        return $api.get<IStatus[]>('/status')
    }
    static newTodo(payload: ITodoFields): Promise<AxiosResponse<ITodo>> {
        return $api.put<ITodo>('/todo',{...payload})
    }
    static updateTodo(payload: ITodoFields): Promise<AxiosResponse> {
        return $api.post('/todo',{...payload})
    }
}