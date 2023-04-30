import {apiSlice} from "./apiSlice";

export const taskAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<RequestedTasksType, { todolistId: string}>({
            query: (body) => ({
                url: `todo-lists/${body.todolistId}/tasks`,
                method: 'GET'
            }),
            providesTags: () => [{type: 'Tasks'}]
        }),
        createTask: build.mutation<ResponseType<{ item: TaskType }>, { todolistId: string, title: string }>({
            query: (body) => ({
                url: `todo-lists/${body.todolistId}/tasks`,
                method: 'POST',
                body
            }),
            invalidatesTags: () => [{type: 'Tasks'}]
        }),

        deleteTask: build.mutation<ResponseType, { todolistId: string, taskID: string }>({
            query: (body) => ({
                url: `todo-lists/${body.todolistId}/tasks/${body.taskID}`,
                method: 'DELETE',
            }),
            invalidatesTags: () => [{type: 'Tasks'}]
        }),
        updateTask: build.mutation<ResponseType, { todolistID: string, taskID: string, domainModel: UpdateTaskModelDomainType }>({
            query: (body) => ({
                url: `todo-lists/${body.todolistID}/tasks/${body.taskID}`,
                method: 'PUT',
                body: {
                    domainModel: body.domainModel
                }
            }),
            invalidatesTags: () => [{type: 'Tasks'}]
        }),
    }),
})

export const {
    useGetTasksQuery,
    useCreateTaskMutation,
    useDeleteTaskMutation,
    useUpdateTaskMutation
} = taskAPI;


//TYPES
export interface ILoginParams {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
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

export type ResponseType<T = {}> = {
    fieldErrors: string[]
    resultCode: number
    messages: string[]
    data: T
}

export type RequestedTasksType = {
    items: TaskType[]
    error: string
    totalCount: number
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

type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
