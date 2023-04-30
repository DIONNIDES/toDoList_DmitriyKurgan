import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer'
import {AnyAction, combineReducers} from 'redux'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {appReducer} from './appReducer';
import {authReducer} from '../features/login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {apiSlice} from "../api/apiSlice";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,

})
// непосредственно создаём store


export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .prepend(apiSlice.middleware)
        .concat(thunkMiddleWare)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<T = void> = ThunkAction<T,
    AppRootStateType,
    unknown,
    AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
// @ts-ignore
window.store = store



