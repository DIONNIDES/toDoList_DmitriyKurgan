import {AddTodolistType, RemoveTodolistType, SetTodolistsType} from './todolists-reducer';
import {v1} from 'uuid';
import {TasksStateType} from '../AppWithRedux';


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type CzarType =
    RemoveTaskACType
    | AddTaskACType
    | ChangeTaskTitleACType
    | ChangeTaskStatusACType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsType

let initialState: TasksStateType = {}


export const tasksReducer = (state: TasksStateType = initialState, action: CzarType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID)
            }
        }
        case 'ADD-TASK': {
            let newTask = {id: v1(), title: action.payload.newTaskTitle, isDone: false}
            return {...state, [action.payload.todolistId]: [...state[action.payload.todolistId], newTask]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    title: action.payload.newTaskTitle
                } : t)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
                    ...t,
                    isDone: action.payload.newTaskStatus
                } : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            const {[action.payload.todolistId]: [], ...restTasks} = {...state} //через деструктуризацию
            return restTasks
        }
        case 'SET-TODOLISTS': {
            let stateCopy = {...state};
                action.payload.todolists.forEach( tl =>{
                    stateCopy[tl.id] = []
                })
            return stateCopy;
        }
        // case 'SET-TASKS':{
        //
        // }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskID: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId,
            taskID
        }
    } as const
}


export const addTaskAC = (todolistId: string, newTaskTitle: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId,
            newTaskTitle
        }
    } as const
}


export const changeTaskTitleAC = (todolistId: string, taskID: string, newTaskTitle: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId,
            taskID,
            newTaskTitle
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskID: string, newTaskStatus: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId,
            taskID,
            newTaskStatus
        }
    } as const
}

