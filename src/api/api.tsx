import axios, {AxiosResponse} from 'axios';

const axiosInstance = axios.create(
    {
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            'API-KEY': '4b505e77-20a4-4b88-91c9-9a97e6bfb421'
        }
    }
);

//API
export const todolistAPI = {
    getTodolists() {
        return axiosInstance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title:string) {
        return axiosInstance.post<{title: string }, AxiosResponse<ResponseType<{ item: TodolistType }>>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return axiosInstance.put<{ title: string }, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return axiosInstance.get<RequestedTasksType>(`todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return axiosInstance.post<{title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return axiosInstance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model:UpdatedTaskType) {
        return axiosInstance.put<{title: string }, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}


//TYPES
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdatedTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type ResponseType<T={}>= {
    fieldErrors:string[]
    resultCode: number
    messages: string[]
    data: T
}

export type RequestedTasksType = {
    items: TaskType[]
    error: string
    totalCount:number
}

//ENUMS
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}
export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgently,
    Later
}