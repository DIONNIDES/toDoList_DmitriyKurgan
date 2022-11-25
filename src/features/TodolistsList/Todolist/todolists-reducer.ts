import {FilterValuesType, TodolistDomainType} from '../../../app/AppWithRedux';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../../../api/api';
import {AppThunk} from '../../../app/store';

let initialState: Array<TodolistDomainType> = [];

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: CzarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.payload.todolistId);
        case 'ADD-TODOLIST':
            return [...state, {...action.payload.todolist, filter:'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTodolistTitle
            } : tl);
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
        case 'SET-TODOLISTS':
            return action.payload.todolists.map(tl => ({...tl, filter: 'All'}));
        default: {
            return state
        }
    }
}

//ACTION CREATORS
export const removeTodolistAC = (todolistId: string) =>
    ({type: 'REMOVE-TODOLIST', payload: {todolistId}} as const);

export const addTodolistAC = (todolist: TodolistType) =>
    ({type: 'ADD-TODOLIST', payload: {todolist}} as const)

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', payload: {todolistId, newTodolistTitle}} as const)

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) =>
    ({type: 'CHANGE-TODOLIST-FILTER', payload: {todolistId, newFilter}} as const)

export const setTodolistsAC = (todolists: TodolistType[]) =>
    ({type: 'SET-TODOLISTS', payload: {todolists}} as const)


//THUNK CREATORS
export const requestTodolistsTC = (): AppThunk => (dispatch, getState) => {
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch, getState) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
}

export const deleteTodolistTC = (todolistID: string): AppThunk => (dispatch, getState) => {
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC(todolistID));
        })
}

export const updateTodolistTC = (todolistID: string, title: string): AppThunk => (dispatch, getState) => {
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => dispatch(changeTodolistTitleAC(todolistID, title)))
}


//TYPES
export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type CzarType =
    RemoveTodolistType
    | AddTodolistType
    | ChangeTodolistTitleType
    | ChangeTodolistFilterType
    | SetTodolistsACType