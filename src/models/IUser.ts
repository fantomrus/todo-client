export interface IUser {
    _id: string;
    firstName: string;
    lastName: string;
    patronymic?: string;
    login: string;
    role: string;
}