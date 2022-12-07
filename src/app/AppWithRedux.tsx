import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from 'react-redux';
import {TaskType, TodolistType} from '../api/api';
import {ButtonAppBar} from '../components/ButtonAppBar/ButtonAppBar';
import {Container} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {CircularProgress, LinearProgress} from '@material-ui/core';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {AppRootStateType} from './store';
import {initializeAppTC, RequestedStatusType} from './appReducer';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Login} from '../features/login/Login';

export type FilterValuesType = 'all' | 'active' | 'completed';

export enum ROUTES {
    DEFAULT = '/',
    LOGIN = '/login',
    NOT_FOUND = '/404',
    ALL = '*'
}

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestedStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestedStatusType>(state => state.app.status);
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [])

    if (!isInitialized) {
        return <div
            style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <div className="App">
                <ErrorSnackBar/>
                <ButtonAppBar/>
                {status === 'loading' && <LinearProgress/>}
                <Container fixed>
                    <Routes>
                        <Route path={ROUTES.DEFAULT} element={<TodolistsList/>}/>
                        <Route path={ROUTES.LOGIN} element={<Login/>}/>
                        <Route path={ROUTES.NOT_FOUND} element={<h1>PAGE NOT FOUND</h1>}/>
                        <Route path={ROUTES.ALL} element={<Navigate to={ROUTES.NOT_FOUND}/>}/>
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );


}


export default AppWithRedux;


