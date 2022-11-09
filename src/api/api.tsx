import axios from  'axios';

const axiosInstance = axios.create(
    {
        baseURL:'https://social-network.samuraijs.com/api/1.1/',
        withCredentials:true,
        headers:{
            "API-KEY":"4b505e77-20a4-4b88-91c9-9a97e6bfb421"
        }
    }
);



export const todolistAPI = {
    getTodolists () {
        return axiosInstance.get('todo-lists')
            .then(res => res.data);
    },
    createTodolist(title:string){
        return axiosInstance.post('todo-lists', {title:title})
            .then(res=>res.data)
    },
    deleteTodolist(todolistId:string){
        return axiosInstance.delete(`todo-lists/${todolistId}`)
            .then(res => res.data);
    },
    updateTodolist(todolistId:string, title:string) {
        return axiosInstance.put(`todo-lists/${todolistId}`, {title:title})
            .then(res => res.data);
    },
    getTasks(todolistId:string){
        return axiosInstance.get(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data);
    },
    createTask (todolistId:string, title:string) {
        return axiosInstance.post(`todo-lists/${todolistId}/tasks`, {title:title})
            .then(res => res.data);
    },
    deleteTask(todolistId:string, taskId:string){
        return axiosInstance.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data);
    },
    updateTask(todolistId:string, taskId:string){
        return axiosInstance.post(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data);
    }
}

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
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}