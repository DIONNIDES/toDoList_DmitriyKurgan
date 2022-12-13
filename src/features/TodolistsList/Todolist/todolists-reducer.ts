import {FilterValuesType, TodolistDomainType} from '../../../app/AppWithRedux';
import {todolistAPI, TodolistType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {RequestedStatusType, setAppStatusAC} from '../../../app/appReducer';
import {handlerServerNetworkError, handleServerAppError} from '../../../utills/error-utills';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

let initialState: Array<TodolistDomainType> = [];



export const todolistsSlice = createSlice({
    name:'todolists',
    initialState:initialState,
    reducers:{
        removeTodolistAC(state,action:PayloadAction<{todolistID:string}>){
            const index = state.findIndex(tl => tl.id !==action.payload.todolistID);
            if(index > -1){
               state.slice(index,1)
            }
        },
        addTodolistAC(state,action:PayloadAction<{todolist:TodolistType}>){
            state.unshift({...action.payload.todolist, filter:'all',  entityStatus: 'idle'})
        },
        changeTodolistTitleAC(state,action:PayloadAction<{todolistId:string, newTodolistTitle:string}>){
            const index = state.findIndex(tl=>tl.id ===action.payload.todolistId);
            state[index].title = action.payload.newTodolistTitle;
        },
        changeTodolistFilterAC(state,action:PayloadAction<{todolistId: string, newFilter: FilterValuesType}>){
            const index = state.findIndex(tl=>tl.id ===action.payload.todolistId);
            state[index].title = action.payload.newFilter;
        },
        setTodolistsAC(state,action:PayloadAction<{todolists: TodolistType[]}>){
            return action.payload.todolists.map(tl=>({...tl,filter:'all',  entityStatus: 'idle'}))
        },
        setTodolistEntityStatusAC(state,action:PayloadAction<{todolistId: string, newStatus: RequestedStatusType}>){
        const index = state.findIndex(tl => tl.id === action.payload.todolistId);
        state[index].entityStatus = action.payload.newStatus
        },
    }
})
export const todolistsReducer = todolistsSlice.reducer;
export const {removeTodolistAC,addTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC, setTodolistsAC, setTodolistEntityStatusAC} = todolistsSlice.actions;


//THUNK CREATORS
export const requestTodolistsTC = (): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    todolistAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC({todolists:res.data}));
            dispatch(setAppStatusAC({status:'succeeded'}));
        })
}

export const addTodolistTC = (title: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC({todolist:res.data.data.item}));
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error:AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}

export const deleteTodolistTC = (todolistID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    dispatch(setTodolistEntityStatusAC({todolistId:todolistID, newStatus:'loading'}));
    todolistAPI.deleteTodolist(todolistID)
        .then(res => {
            dispatch(removeTodolistAC({todolistID:todolistID}));
            dispatch(setAppStatusAC({status:'succeeded'}));
            dispatch(setTodolistEntityStatusAC({todolistId:todolistID, newStatus:'succeeded'}));
        })
}

export const updateTodolistTC = (todolistID: string, title: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status:'loading'}));
    todolistAPI.updateTodolist(todolistID, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodolistTitleAC({todolistId:todolistID, newTodolistTitle:title}));
                dispatch(setAppStatusAC({status:'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error:AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}


