import {TasksStateType} from '../../../app/AppWithRedux';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {removeTodolistAC} from './todolists-reducer';
import {todolistAPI} from "../../../api/todolistAPI";
import {taskAPI, TaskType} from "../../../api/taskAPI";

let initialState: TasksStateType = {}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        getTasks(state, action: PayloadAction<{ todolistID: string, tasks: TaskType[] }>) {
            state[action.payload.todolistID]= action.payload.tasks
        },
    },
    extraReducers: (builder) => {
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID];
        });
        builder.addMatcher(todolistAPI.endpoints.getTodolists.matchFulfilled,
            (state, {payload}) => {
                payload.forEach((tl: any) => {
                    state[tl.id] = [];
                })
            }
        );
        builder.addMatcher(taskAPI.endpoints.getTasks.matchFulfilled,
            (state, {payload,meta: {arg}}) => {
            const {todolistId} = arg.originalArgs
                state[todolistId]= payload.items
            }
        );
        builder.addMatcher(todolistAPI.endpoints.createTodolist.matchFulfilled,
            (state, {payload}) => {
            const todolistID= payload.data.item.id
                state[todolistID] = [];
            }
        );
        builder.addMatcher(taskAPI.endpoints.createTask.matchFulfilled,
            (state, {payload}) => {
                state[payload.data.item.todoListId].push(payload.data.item)
            }
        );
        builder.addMatcher(taskAPI.endpoints.deleteTask.matchFulfilled,
            (state, {meta: {arg}}) => {
                const tasks = state[arg.originalArgs.todolistId];
                tasks.splice(tasks.findIndex(task => task.id === arg.originalArgs.taskID), 1);
            }
        );
        builder.addMatcher(taskAPI.endpoints.updateTask.matchFulfilled,
            (state, {meta: {arg}}) => {
                const tasks = state[arg.originalArgs.todolistID];
                const index = tasks.findIndex(t => t.status === arg.originalArgs.domainModel.status);
                if (index !== -1) {
                    tasks.splice(index,0)
                }
            }
        );
    }
});

export const tasksReducer = tasksSlice.reducer;
