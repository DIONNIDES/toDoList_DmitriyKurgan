import {tasksReducer} from '../features/TodolistsList/Todolist/tasks-reducer'
import {todolistsReducer} from '../features/TodolistsList/Todolist/todolists-reducer'
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from 'redux'
import thunkMiddleWare, {ThunkAction} from 'redux-thunk'
import {appReducer} from './appReducer';
import {authReducer} from '../features/login/auth-reducer';
import {configureStore} from '@reduxjs/toolkit';

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// непосредственно создаём store
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleWare)
// )

export const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleWare)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppThunk<T = void> = ThunkAction<T,
    AppRootStateType,
    unknown,
    AnyAction>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store



