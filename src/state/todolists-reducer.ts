import {FilterValuesType, TodolistDomainType} from '../AppWithRedux';
import {v1} from 'uuid';
import {todolistAPI, TodolistType} from '../api/api';
import {AppThunk} from './store';

let initialState:Array<TodolistDomainType> = [];

export type RemoveTodolistType = ReturnType<typeof removeTodolistAC>
export type AddTodolistType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsACType = ReturnType<typeof setTodolistsAC>
export type CzarType = RemoveTodolistType | AddTodolistType | ChangeTodolistTitleType | ChangeTodolistFilterType | SetTodolistsACType


export const todolistsReducer = (state: TodolistDomainType[]=initialState, action: CzarType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId);
        }
        case 'ADD-TODOLIST': {
            let newTodolist: TodolistDomainType = {id: action.payload.todolistId, title: action.payload.newTodolistTitle, filter: 'all', addedDate:'', order:2 }
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.newTodolistTitle
            } : tl);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.newFilter} : tl)
        }
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter:'All'}));
        }
        default:{
            return state
        }
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle,
            todolistId:v1()
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            newTodolistTitle
        }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    } as const
}

export const setTodolistsAC = (todolists:TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload:{
            todolists
        }
    } as const
}


export const requestTodolistsTC = ():AppThunk => (dispatch, getState) =>{
    todolistAPI.getTodolists()
        .then((res) =>{
            dispatch(setTodolistsAC(res.data))
        })
}

export const addTodolistTC = (title:string):AppThunk =>(dispatch, getState) =>{
    todolistAPI.createTodolist(title)
        .then(res =>{
            dispatch(addTodolistAC(title))
        })
}

export const deleteTodolistTC = (todolistID:string):AppThunk =>(dispatch,getState) =>{
    todolistAPI.deleteTodolist(todolistID)
        .then(res=>{
            dispatch(removeTodolistAC(todolistID));
        })
}

export const updateTodolistTC = (todolistID:string, title:string):AppThunk =>(dispatch,getState)=>{
    todolistAPI.updateTodolist(todolistID,title)
        .then(res=>dispatch(changeTodolistTitleAC(todolistID,title)))
}