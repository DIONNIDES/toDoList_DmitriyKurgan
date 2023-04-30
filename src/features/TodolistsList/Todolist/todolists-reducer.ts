import {FilterValuesType, TodolistDomainType} from '../../../app/AppWithRedux';
import {todolistAPI, TodolistType} from '../../../api/todolistAPI';
import {RequestedStatusType} from '../../../app/appReducer';
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
        changeTodolistTitleAC(state,action:PayloadAction<{todolistId:string, newTodolistTitle:string}>){
            const index = state.findIndex(tl=>tl.id ===action.payload.todolistId);
            state[index].title = action.payload.newTodolistTitle;
        },
        changeTodolistFilterAC(state,action:PayloadAction<{todolistId: string, newFilter: FilterValuesType}>){
            const index = state.findIndex(tl=>tl.id ===action.payload.todolistId);
            state[index].filter = action.payload.newFilter;
        },
        setTodolistEntityStatusAC(state,action:PayloadAction<{todolistId: string, newStatus: RequestedStatusType}>){
        const index = state.findIndex(tl => tl.id === action.payload.todolistId);
        state[index].entityStatus = action.payload.newStatus
        },
    },
    extraReducers: builder => {
        builder.addMatcher(todolistAPI.endpoints.getTodolists.matchFulfilled,
            (state, { payload }) => {
                 return  payload.map(tl=>({...tl, filter:'all',  entityStatus: 'idle'}));
            }
        );
        builder.addMatcher(todolistAPI.endpoints.createTodolist.matchFulfilled,
            (state, { payload }) => {
            const todolist = payload.data.item
                state.unshift({...todolist, filter:'all',  entityStatus: 'idle'})
            }
        );
    }
})
export const todolistsReducer = todolistsSlice.reducer;
export const {removeTodolistAC,changeTodolistTitleAC,changeTodolistFilterAC, setTodolistEntityStatusAC} = todolistsSlice.actions;

