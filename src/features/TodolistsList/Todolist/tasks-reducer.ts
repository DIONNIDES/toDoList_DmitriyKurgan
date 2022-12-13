import {TasksStateType} from '../../../app/AppWithRedux';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdatedTaskType} from '../../../api/api';
import {AppThunk} from '../../../app/store';
import {setAppStatusAC} from '../../../app/appReducer';
import {handlerServerNetworkError, handleServerAppError} from '../../../utills/error-utills';
import {AxiosError} from 'axios';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from './todolists-reducer';

let initialState: TasksStateType = {}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todolistID: string, taskID: string }>) {
            const index = state[action.payload.todolistID].findIndex(t => t.id === action.payload.taskID);
            if (index > -1) {
                state[action.payload.todolistID].slice(index, 1);
            }
        },
        addTaskAC(state, action: PayloadAction<{ todolistID: string, task: TaskType }>) {
            state[action.payload.todolistID].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ todolistId: string, taskID: string, model: UpdateTaskModelDomainType }>) {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model};
            }
        },
        setTasksAC(state, action: PayloadAction<{ todolistId: string, tasks: TaskType[] }>) {
            state[action.payload.todolistId] = action.payload.tasks;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodolistAC, (state, action) => {
            state[action.payload.todolist.id] = [];
        });
        builder.addCase(removeTodolistAC, (state, action) => {
            delete state[action.payload.todolistID];
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any) => {
                state[tl.id] = [];
            })
        });
    }
});

export const tasksReducer = tasksSlice.reducer;
export const {removeTaskAC, addTaskAC, updateTaskAC, setTasksAC} = tasksSlice.actions;

//THUNK CREATORS
export const requestedTasksTC = (todlistID: string): AppThunk => (dispatch, getState) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.getTasks(todlistID)
        .then(res => {
            dispatch(setTasksAC({todolistId: todlistID, tasks: res.data.items}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
}

export const addTaskTC = (todolistID: string, taskTitle: string): AppThunk => (dispatch, getState, extraArgument) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.createTask(todolistID, taskTitle)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({todolistID: todolistID, task: res.data.data.item}));
                dispatch(setAppStatusAC({status: 'succeeded'}));
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((error: AxiosError) => {
            handlerServerNetworkError(dispatch, error);
        })
}

export const deleteTaskTC = (todolistID: string, taskID: string): AppThunk => (dispatch, getState, extraArgument) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todolistAPI.deleteTask(todolistID, taskID)
        .then(res => {
            dispatch(removeTaskAC({todolistID: todolistID, taskID: taskID}));
            dispatch(setAppStatusAC({status: 'succeeded'}));
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
        dispatch(setAppStatusAC({status: 'loading'}));
        todolistAPI.updateTask(todolistID, taskID, apiModel)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC({todolistId: todolistID, taskID: taskID, model: domainModel}));
                    dispatch(setAppStatusAC({status: 'succeeded'}));
                } else {
                    handleServerAppError(dispatch, res.data)
                }
            })
            .catch((error: AxiosError) => {
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

