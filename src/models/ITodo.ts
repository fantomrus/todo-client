export interface ITodo {
    _id: string,
    title: string,
    description: string
    dateCompletion: string
    priority: string
    status: string
    userCreator: string
    userResponsible: string
    createdAt: string
    updatedAt: string
}
export interface ITodoFields {
    id?: string,
    status?: string,
    title: string,
    description: string
    dateCompletion: string
    priority: string
    userResponsible: string
}