import {apiSlice} from "./apiSlice";

export const todolistAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getTodolists: build.query<TodolistType[], any>({
            query: () => ({
                url: `todo-lists`,
                method: 'GET',
            }),
            providesTags: () => [{type: 'Todolists'}]
        }),
        createTodolist: build.mutation<ResponseType<{ item: TodolistType }>, { title: string }>({
            query: (body) => ({
                url: `todo-lists`,
                method: 'POST',
                body
            }),
            invalidatesTags: () => [{type: 'Todolists'}]
        }),
        deleteTodolist: build.mutation<ResponseType, string>({
            query: (todolistId) => ({
                url: `todo-lists/${todolistId}`,
                method: 'DELETE',
                todolistId
            }),
            invalidatesTags: () => [{type: 'Todolists'}]
        }),
        updateTodolist: build.mutation<ResponseType, { todolistID: string, title: string }>({
            query: (body) => ({
                url: `todo-lists/${body.todolistID}`,
                method: 'PUT',
                body: {title: body.title}
            }),
            invalidatesTags: () => [{type: 'Todolists'}]
        }),
    }),
})

export const {
    useLazyGetTodolistsQuery,
    useCreateTodolistMutation,
    useDeleteTodolistMutation,
    useUpdateTodolistMutation,
} = todolistAPI;


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


export type ResponseType<T = {}> = {
    fieldErrors: string[]
    resultCode: number
    messages: string[]
    data: T
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

