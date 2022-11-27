import {FilterValuesType, TasksStateType, TodolistDomainType} from '../../../app/AppWithRedux';
import {ResponseType, todolistAPI, TodolistType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {AppInitialStateType, RequestedStatusType, setAppErrorAC, setAppStatusAC} from '../../../app/appReducer';
import {CombinedState, AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {handlerServerNetworkError, handleServerAppError} from '../../../utills/error-utills';
import {AxiosError} from 'axios';

let initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: CzarType) => {
    switch (action.type) {
        case 'TODOLIST/REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId);
        case 'TODOLIST/ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter: 'all'}]
        case 'TODOLIST/CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTodolistTitle
            } : tl);
        case 'TODOLIST/CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.newFilter
            } : tl);
        case 'TODOLIST/SET-TODOLISTS':
            return action.payload.todolists.map(tl => ({...tl, filter: 'All'}));
        case 'TODOLIST/SET-TODOLIST-ENTITY-STATUS':
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                entityStatus: action.payload.newStatus
            } : tl);
        default: {
            return state
        }
    }
}

//ACTION CREATORS
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'TODOLIST/REMOVE-TODOLIST', payload: {todolistId}} as const);

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'TODOLIST/ADD-TODOLIST', payload: {todolist}} as const)

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-TITLE', payload: {todolistId, newTodolistTitle}} as const)

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) =>
    ({type: 'TODOLIST/CHANGE-TODOLIST-FILTER', payload: {todolistId, newFilter}} as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'TODOLIST/SET-TODOLISTS', payload: {todolists}} as const)

export const setTodolistEntityStatusAC = (todolistId: string, newStatus: RequestedStatusType) =>
    ({type: 'TODOLIST/SET-TODOLIST-ENTITY-STATUS', payload: {todolistId, newStatus}} as const)


//THUNK CREATORS
export const requestTodolistsTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error:AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}

export const deleteTodolistTC = (todolistID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    dispatch(setTodolistEntityStatusAC(todolistID, 'loading'));
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID));
            dispatch(setAppStatusAC('succeeded'));
            dispatch(setTodolistEntityStatusAC(todolistID, 'succeeded'));
        })
}

export const updateTodolistTC = (todolistID: string, title: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'));
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC(todolistID, title));
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error:AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}


//TYPES
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type SetTodolistEntityStatusACType = ReturnType<typeof setTodolistEntityStatusAC>
export type CzarType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistsACType
    | SetTodolistEntityStatusACType

