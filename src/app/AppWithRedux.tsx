import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';
import {addTodolistTC, requestTodolistsTC} from '../features/TodolistsList/Todolist/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {TaskType, TodolistType} from '../api/api';
import {ButtonAppBar} from '../components/ButtonAppBar/ButtonAppBar';
import {Container} from '@mui/material';
import {TodolistsList} from '../features/TodolistsList/TodolistsList';
import {LinearProgress} from '@material-ui/core';
import {ErrorSnackBar} from '../components/ErrorSnackBar/ErrorSnackBar';
import {AppRootStateType} from './store';
import {RequestedStatusType} from './appReducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestedStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const status = useSelector<AppRootStateType, RequestedStatusType>(state => state.app.status);
    const dispatch = useDispatch();

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    useEffect(() => {
        dispatch(requestTodolistsTC())
    }, [])

    return (
        <div className="App">
            <ErrorSnackBar/>
            <ButtonAppBar/>
            {status === 'loading' && <LinearProgress/>}
            <Container fixed style={{marginTop: '2rem', marginBottom: '2rem'}}>
                <AddItemForm addItem={addTodolist}/>
            </Container>
            <Container fixed>
                <TodolistsList/>
            </Container>

        </div>
    );


}


export default AppWithRedux;


