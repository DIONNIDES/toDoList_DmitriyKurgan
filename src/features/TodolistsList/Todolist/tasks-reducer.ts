import {
    addTodolistAC,
    AddTodolistType,
    changeTodolistTitleAC,
    RemoveTodolistType,
    SetTodolistsACType
} from './todolists-reducer';
import {TasksStateType} from '../../../app/AppWithRedux';
import {ResponseType, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdatedTaskType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {AppInitialStateType, setAppErrorAC, setAppStatusAC} from '../../../app/appReducer';
import {CombinedState, AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {handlerServerNetworkError, handleServerAppError} from '../../../utills/error-utills';
import {AxiosError} from 'axios';

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: CzarType) => {
    switch (action.type) {
        case 'TASKS/REMOVE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskID)
            }
        case 'TASKS/ADD-TASK':
            return {...state, [action.payload.todolistId]: [action.payload.task, ...state[action.payload.todolistId]]}
        case 'TASKS/UPDATE-TASK':
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskID ? {
                    ...t, ...action.payload.model
                } : t)
            }
        case 'TODOLIST/ADD-TODOLIST':
            return {...state, [action.payload.todolist.id]: []}
        case 'TODOLIST/REMOVE-TODOLIST':
            const {[action.payload.todolistId]: [], ...restTasks} = {...state} //через деструктуризацию
            return restTasks
        case 'TODOLIST/SET-TODOLISTS':
            let stateCopy = {...state};
            action.payload.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy;
        case 'TASKS/SET-TASKS':
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}

//ACTION CREATORS
export const removeTaskAC = (todolistId: string, taskID: string) =>
    ({type: 'TASKS/REMOVE-TASK', payload: {todolistId, taskID}} as const)

export const addTaskAC = (todolistId: string, task: TaskType) =>
    ({type: 'TASKS/ADD-TASK', payload: {todolistId, task}} as const)

export const updateTaskAC = (todolistId: string, taskID: string, model: UpdateTaskModelDomainType) =>
    ({type: 'TASKS/UPDATE-TASK', payload: {todolistId, taskID, model}} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
    ({type: 'TASKS/SET-TASKS', payload: {todolistId, tasks}} as const)


//THUNK CREATORS
export const requestedTasksTC = (todlistID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTasks(todlistID)
        .then(res => {
            dispatch(setTasksAC(todlistID, res.data.items));
            dispatch(setAppStatusAC('succeeded'));
        })
}

export const addTaskTC = (todolistID: string, taskTitle: string): AppThunk => (dispatch, getState, extraArgument) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.createTask(todolistID, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(todolistID, res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error:AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}

export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => (dispatch, getState, extraArgument) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(removeTaskAC(todolistID, taskID));
            dispatch(setAppStatusAC('succeeded'));
        })
}
//обновляем поля Таски, передавая обьект домейн модел со всеми необязательными свойствами, здесь будут поля статус и тайтл
export const updateTaskTC = (todolistID: string, taskID: string, domainModel: UpdateTaskModelDomainType): AppThunk =>
    (dispatch, getState, extraArgument) => {
        let task = getState().tasks[todolistID].find(t => t.id === taskID);
        if (!task) {
            throw new Error('Task is not found in state');
            return;
        }
        //создаем объект, в который полностью копируем поля таски из текущего стейта и перезаписываем нашим доменым объектом нужное свойство
        const apiModel: UpdatedTaskType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        dispatch(setAppStatusAC('loading'));
        todolistAPI.updateTask(todolistID, taskID, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistID, taskID, domainModel));
                    dispatch(setAppStatusAC('succeeded'));
                }else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error:AxiosError) => {
                handlerServerNetworkError(dispatch, error);
            })
    }

//TYPES
type UpdateTaskModelDomainType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type CzarType =
    RemoveTaskACType
    | AddTaskACType
    | UpdateTaskACType
    | AddTodolistType
    | RemoveTodolistType
    | SetTodolistsACType
    | SetTasksACType

