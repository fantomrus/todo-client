import $api from "../API";
import {AxiosResponse} from "axios";
import {IUser} from "../models/IUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
    static fetchUsersTodo(): Promise<AxiosResponse<string[]>> {
        return $api.get('/users_todo')
    }
}